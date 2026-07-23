import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import MetricPlotPanel from "./MetricPlotsPanel";
import type { FrameSample } from "@/types/framesample";
import type { Metric } from "@/utils/metricsCalculation";
import type { TrialType } from "@/types/sessions";

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

const trackingConfig: { metricsConfig: MetricButton[]; plotColors: PlotColors } = {
  metricsConfig: [
    { metric: "vx", label: "Velocity (x-axis)", axisLabels: { xLabel: "Time (ms)", yLabel: "Velocity (px/ms)" } },
    { metric: "vy", label: "Velocity (y-axis)", axisLabels: { xLabel: "Time (ms)", yLabel: "Velocity (px/ms)" } },
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
  plotColors: { realData: "#2ec4a0", smoothData: "#f0a030" },
};

const flickingConfig: { metricsConfig: MetricButton[]; plotColors: PlotColors } = {
  metricsConfig: [
    { metric: "v", label: "Velocity", axisLabels: { xLabel: "Time (ms)", yLabel: "Velocity (px/ms)" } },
    { metric: "a", label: "Acceleration", axisLabels: { xLabel: "Time (ms)", yLabel: "Acceleration (px/ms²)" } },
  ],
  plotColors: { realData: "#f0a030", smoothData: "#2ec4a0" },
};

export type MetricPlotsDashboardProps = {
  trackingFrames?: FrameSample[];
  flickingFrames?: FrameSample[];
  onTrialChange?: (trial: TrialType) => void;
};

function MetricPlotsDashboard({ trackingFrames, flickingFrames, onTrialChange }: MetricPlotsDashboardProps) {
  const hasTracking = trackingFrames && trackingFrames.length > 0;
  const hasFlicking = flickingFrames && flickingFrames.length > 0;

  if (!hasTracking && !hasFlicking) {
    return <div className="w-full"></div>;
  }
  const defaultTab = hasTracking ? "tracking" : "flicking";

  const [selectedTrial, setSelectedTrial] = useState<TrialType>(defaultTab);

  useEffect(() => {
    if (!selectedTrial) {
      if (hasTracking) setSelectedTrial("tracking");
      else if (hasFlicking) setSelectedTrial("flicking");
    }
  }, [hasTracking, hasFlicking]);

  useEffect(() => {
    // console.log(selectedTrial);
    if (onTrialChange) onTrialChange(selectedTrial);
  }, [selectedTrial]);

  if (!selectedTrial) {
    return <div className="w-full"></div>;
  }

  return (
    <Tabs value={selectedTrial} onValueChange={setSelectedTrial}>
      <TabsList variant="line" className="mb-2">
        {hasTracking && (
          <TabsTrigger value="tracking">
            <span className={selectedTrial === "tracking" ? "text-track-teal" : ""}>Tracking</span>
          </TabsTrigger>
        )}
        {hasFlicking && (
          <TabsTrigger value="flicking">
            <span className={selectedTrial === "flicking" ? "text-flick-orange" : ""}>Flicking</span>
          </TabsTrigger>
        )}
      </TabsList>
      {hasTracking && (
        <TabsContent value="tracking">
          <MetricPlotPanel
            data={trackingFrames}
            defaultMetric="vx"
            metricsConfig={trackingConfig.metricsConfig}
            plotColors={trackingConfig.plotColors}
            title="Tracking"
          />
        </TabsContent>
      )}
      {hasFlicking && (
        <TabsContent value="flicking">
          <MetricPlotPanel
            data={flickingFrames}
            defaultMetric="v"
            metricsConfig={flickingConfig.metricsConfig}
            plotColors={flickingConfig.plotColors}
            title="Flicking"
          />
        </TabsContent>
      )}
    </Tabs>
  );
}

export default MetricPlotsDashboard;
