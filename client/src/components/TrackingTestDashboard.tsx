import { useState, useEffect, useMemo } from "react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import type { Frame, Metric } from "@/utils/metricsCalculation";
import MetricPlot from "./plots/MetricPlot";

export type TrackingTestDashboardProps = {
  data: Frame[];
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

function TrackingTestDashboard({
  data,
  open,
  onOpenChange,
}: TrackingTestDashboardProps) {
  const [ready, setReady] = useState(false);
  const [metricSelection, setMetricSelection] = useState<Metric>("vx");

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => setReady(true), 100);
      return () => clearTimeout(id);
    } else {
      setReady(false);
    }
  }, [open]);

  const metricButtonsConfig: { metric: Metric; label: string }[] = [
    { metric: "vx", label: "X-axis Velocity" },
    { metric: "vy", label: "Y-axis Velocity" },
    { metric: "ax", label: "X-axis Acceleration" },
    { metric: "ay", label: "Y-axis Acceleration" },
  ];

  const velocityLabels = {
    xLabel: "Time (ms)",
    yLabel: "Pixels per millisecond (px/ms)",
  };

  const accelerationLabels = {
    xLabel: "Time (ms)",
    yLabel: "Pixels per millisecond squared (px/ms²)",
  };

  const plotColors = {
    realData: "#2ec4a0",
    smoothData: "#f0a030",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        className="outline-none w-full mt-1 cursor-pointer border-2
        rounded-md hover:scale-101 text-black bg-white text-md
        disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!data.length}
      >
        View Results
      </SheetTrigger>
      <SheetContent side={"bottom"} className="h-[98vh]!">
        <div className="flex-1 flex h-full min-h-0">
          <aside className="flex flex-col gap-2 w-48 p-2 border-r">
            {metricButtonsConfig.map((m, idx) => (
              <Button
                key={idx}
                className="mb-2"
                onClick={() => setMetricSelection(m.metric)}
                variant={metricSelection === m.metric ? "default" : "outline"}
              >
                {m.label}
              </Button>
            ))}
          </aside>
          <main className="flex-1 relative min-h-0">
            {ready && (
              <div className="absolute inset-0">
                <MetricPlot
                  data={data}
                  dataKey={metricSelection}
                  axisLabels={
                    metricSelection === "vx" || metricSelection == "vy"
                      ? velocityLabels
                      : accelerationLabels
                  }
                  colors={plotColors}
                />
              </div>
            )}
          </main>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default TrackingTestDashboard;
