import { useState, useEffect, useMemo } from "react";

import HardwareSettingsForm from "../hardware_settings/HardwareSettingsForm";
import TrackingTestCard from "../tracking/TrackingTestCard";
import FlickingTestCard from "../flicking/FlickingTestCard";
import MetricPlotPanel from "../plots/MetricPlotsPanel";
import PageContainer from "../PageContainer";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

import type { Metric } from "@/utils/metricsCalculation";
import { calculateMetrics } from "@/utils/metricsCalculation";
import type { PointerDataPoint } from "@/hooks/usePointerCapture";

export type AxisLabels = { xLabel: string; yLabel: string };

export type MetricButton = {
  metric: Metric;
  label: string;
  axisLabels: AxisLabels;
};

export type PlotColors = {
  realData: React.CSSProperties["color"];
  smoothData: React.CSSProperties["color"];
};

function TestingPage() {
  const [trackingData, setTrackingData] = useState<PointerDataPoint[]>([]);
  const [flickingData, setFlickingData] = useState<PointerDataPoint[]>([]);

  const onTrackingTestCompletion = (data: PointerDataPoint[]) => {
    setTrackingData(data);
  };

  const onFlickingTestCompletion = (data: PointerDataPoint[]) => {
    setFlickingData(data);
  };

  const { frames: trackingFrames } = useMemo(() => {
    return calculateMetrics(trackingData);
  }, [trackingData]);

  const { frames: flickingFrames } = useMemo(() => {
    return calculateMetrics(flickingData);
  }, [flickingData]);

  useEffect(() => {
    console.log(trackingData);
  }, [trackingData]);

  const trackingConfig: {
    metricsConfig: MetricButton[];
    plotColors: PlotColors;
  } = {
    metricsConfig: [
      {
        metric: "vx",
        label: "Velocity (x-axis)",
        axisLabels: { xLabel: "Time (ms)", yLabel: "Velocity (px/ms)" },
      },
      {
        metric: "vy",
        label: "Velocity (y-axis)",
        axisLabels: { xLabel: "Time (ms)", yLabel: "Velocity (px/ms)" },
      },
      {
        metric: "ax",
        label: "Acceleration (x-axis)",
        axisLabels: { xLabel: "Time (ms)", yLabel: "Acceleration (px/ms²)" },
      },
      {
        metric: "ay",
        label: "Acceleration (y-axis)",
        axisLabels: { xLabel: "Time (ms)", yLabel: "Acceleration (px/ms²)" },
      },
    ],
    plotColors: {
      realData: "#2ec4a0",
      smoothData: "#f0a030",
    },
  };

  const flickingConfig: {
    metricsConfig: MetricButton[];
    plotColors: PlotColors;
  } = {
    metricsConfig: [
      {
        metric: "v",
        label: "Velocity",
        axisLabels: { xLabel: "Time (ms)", yLabel: "Velocity (px/ms)" },
      },
      {
        metric: "a",
        label: "Acceleration",
        axisLabels: { xLabel: "Time (ms)", yLabel: "Acceleration (px/ms²)" },
      },
    ],
    plotColors: {
      realData: "#f0a030",
      smoothData: "#2ec4a0",
    },
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <HardwareSettingsForm />
        <div className="flex gap-2 justify-between mx-48">
          <TrackingTestCard onCompletion={onTrackingTestCompletion} />
          <FlickingTestCard onCompletion={onFlickingTestCompletion} />
        </div>
        <Tabs defaultValue="tracking">
          <TabsList>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="flicking">Flicking</TabsTrigger>
          </TabsList>
          <TabsContent value="tracking">
            <MetricPlotPanel
              data={trackingFrames}
              defaultMetric="vx"
              metricsConfig={trackingConfig.metricsConfig}
              plotColors={trackingConfig.plotColors}
              title="Tracking"
            />
          </TabsContent>
          <TabsContent value="flicking">
            <MetricPlotPanel
              data={flickingFrames}
              defaultMetric="v"
              metricsConfig={flickingConfig.metricsConfig}
              plotColors={flickingConfig.plotColors}
              title="Flicking"
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}

export default TestingPage;
