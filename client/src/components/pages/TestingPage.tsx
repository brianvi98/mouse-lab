import { useState, useEffect, useMemo } from "react";

import HardwareSettingsForm from "../hardware_settings/HardwareSettingsForm";
import TrackingTestCard from "../tracking/TrackingTestCard";
import FlickingTestCard from "../flicking/FlickingTestCard";
import MetricPlotPanel from "../plots/MetricPlotsPanel";
import PageContainer from "../PageContainer";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
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

function TestingPage() {
  const form = useForm<HardwareSettingsFormValues>({
    resolver: zodResolver(hardwareSettingsFormSchema),
    defaultValues: hardwareSettingsFormDefaultValues,
  });

  const onSubmit = (data: HardwareSettingsFormValues) => {
    alert("Settings saved");
    console.log(trackingData);
    console.log("Hardware settings:", data);
  };

  const [trackingData, setTrackingData] = useState<PointerSample[]>([]);
  const [flickingData, setFlickingData] = useState<PointerSample[]>([]);

  const onTrackingTestCompletion = (data: PointerSample[]) => {
    setTrackingData(data);
  };

  const onFlickingTestCompletion = (data: PointerSample[]) => {
    setFlickingData(data);
  };

  const { frameSamples: trackingFrames } = useMemo(() => {
    return calculateMetrics(trackingData);
  }, [trackingData]);

  const { frameSamples: flickingFrames } = useMemo(() => {
    return calculateMetrics(flickingData);
  }, [flickingData]);

  useEffect(() => {
    console.log(trackingData);
  }, [trackingData]);

  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <HardwareSettingsForm
          control={form.control}
          errors={form.formState.errors}
          onSubmit={form.handleSubmit(onSubmit)}
        />
        <div className="mx-48 flex justify-between gap-2">
          <TrackingTestCard onCompletion={onTrackingTestCompletion} />
          <FlickingTestCard onCompletion={onFlickingTestCompletion} />
        </div>
        <MetricPlotsDashboard trackingFrames={trackingFrames} flickingFrames={flickingFrames} />
      </div>
    </PageContainer>
  );
}

export default TestingPage;
