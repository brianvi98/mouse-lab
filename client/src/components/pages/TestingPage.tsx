import { useState, useMemo } from "react";

import HardwareSettingsForm from "../hardware_settings/HardwareSettingsForm";
import TrackingTestCard from "../tracking/TrackingTestCard";
import FlickingTestCard from "../flicking/FlickingTestCard";
import PageContainer from "../PageContainer";

import MetricPlotsDashboard from "../plots/MetricPlotsDashboard";
import { calculateMetrics } from "@/utils/metricsCalculation";
import type { PointerSample } from "@/hooks/usePointerCapture";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  hardwareSettingsFormSchema,
  hardwareSettingsFormDefaultValues,
  type HardwareSettingsFormValues,
} from "../hardware_settings/hardwareSettingsFormSchema";

import { useCreateSessionMutation } from "@/api/sessionsApi";
import type { CreateSessionRequest, TrialType } from "@/types/sessions";
import type { PollingRate, RefreshRate, ScreenResolution } from "@/types/gearsettings";

import { toast } from "sonner";

function TestingPage() {
  const form = useForm<HardwareSettingsFormValues>({
    resolver: zodResolver(hardwareSettingsFormSchema),
    defaultValues: hardwareSettingsFormDefaultValues,
  });

  const [trackingData, setTrackingData] = useState<PointerSample[]>([]);
  const [flickingData, setFlickingData] = useState<PointerSample[]>([]);
  const [sessionSaved, setSessionSaved] = useState(false);

  const [createSession] = useCreateSessionMutation();

  const onTrackingTestCompletion = (data: PointerSample[]) => {
    setTrackingData(data);
    setSessionSaved(false);
  };

  const onFlickingTestCompletion = (data: PointerSample[]) => {
    setFlickingData(data);
    setSessionSaved(false);
  };

  const { frameSamples: trackingFrames } = useMemo(() => {
    return calculateMetrics(trackingData);
  }, [trackingData]);

  const { frameSamples: flickingFrames } = useMemo(() => {
    return calculateMetrics(flickingData);
  }, [flickingData]);

  const isSubmitEnabled = (trackingData.length > 0 || flickingData.length > 0) && !sessionSaved;

  const onSubmit = async (data: HardwareSettingsFormValues) => {
    const payload: CreateSessionRequest = {
      settings: {
        pollingRateHz: Number(data.pollingRate) as PollingRate,
        dpi: data.dpi,
        windowsSensitivity: data.windowsSensitivity,
        screenResolution: data.screenResolution as ScreenResolution,
        refreshRateHz: Number(data.refreshRate) as RefreshRate,
        mouseId: data.mouse,
        mousepadId: data.mousePad,
        skatesId: data.mouseSkates,
      },
      trials: [
        ...(trackingData.length > 0 ? [{ trialType: "tracking" as TrialType, pointerSamples: trackingData }] : []),
        ...(flickingData.length > 0 ? [{ trialType: "flicking" as TrialType, pointerSamples: flickingData }] : []),
      ],
    };

    try {
      await createSession(payload).unwrap();

      setSessionSaved(true);
      toast.success("Session saved");
    } catch (error) {
      toast.error("Failed to save session");
    }
  };

  return (
    <PageContainer>
      <title>MouseLab | Testing</title>
      <div className="flex flex-col gap-2">
        <HardwareSettingsForm
          control={form.control}
          errors={form.formState.errors}
          submitEnabled={isSubmitEnabled}
          onSubmit={form.handleSubmit(onSubmit)}
        />
        <div className="mx-6 flex flex-col justify-between gap-2 sm:mx-12 md:mx-24 md:flex-row md:flex-wrap lg:mx-48">
          <TrackingTestCard onCompletion={onTrackingTestCompletion} />
          <FlickingTestCard onCompletion={onFlickingTestCompletion} />
        </div>
        <MetricPlotsDashboard trackingFrames={trackingFrames} flickingFrames={flickingFrames} />
      </div>
    </PageContainer>
  );
}

export default TestingPage;
