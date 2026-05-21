import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import MetricPlot from "./plots/MetricPlot";
import type { Frame, Metric } from "@/utils/metricsCalculation";

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

export type TestResultsDashboardProps = {
  data: Frame[];
  title?: string;
  // first metric to be shown
  defaultMetric: Metric;
  metricButtonsConfig: MetricButton[];
  plotColors: PlotColors;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};
function TestResultsDashboard({
  data,
  title,
  defaultMetric,
  metricButtonsConfig,
  plotColors,
  open,
  onOpenChange,
}: TestResultsDashboardProps) {
  const [ready, setReady] = useState(false);
  const [metricSelection, setMetricSelection] = useState<Metric>(defaultMetric);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => setReady(true), 100);
      return () => clearTimeout(id);
    } else {
      setReady(false);
    }
  }, [open]);

  const selectedConfig = metricButtonsConfig.find(
    (m) => m.metric === metricSelection,
  );

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
          <aside className="flex flex-col items-center gap-2 w-48 p-2 border-r">
            <h1 className="text-2xl">{title}</h1>
            {metricButtonsConfig.map((m, idx) => (
              <Button
                key={idx}
                className="mb-2 cursor-pointer w-full"
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
                    selectedConfig?.axisLabels ?? {
                      xLabel: "Time",
                      yLabel: "Value",
                    }
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

export default TestResultsDashboard;
