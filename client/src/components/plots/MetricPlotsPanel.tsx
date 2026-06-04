import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Expand } from "lucide-react";
import MetricPlot from "@/components/plots/MetricPlot";
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

export type MetricPlotPanelProps = {
  data: Frame[];
  defaultMetric: Metric;
  metricsConfig: MetricButton[];
  plotColors: PlotColors;
  title?: string;
};

function PlotArea({
  data,
  selectedMetric,
  metricsConfig,
  plotColors,
  onMetricChange,
}: {
  data: Frame[];
  selectedMetric: Metric;
  metricsConfig: MetricButton[];
  plotColors: PlotColors;
  onMetricChange: (m: Metric) => void;
}) {
  const selectedConfig = metricsConfig.find((m) => m.metric === selectedMetric);

  return (
    <div className="flex gap-4 h-full">
      <aside className="flex flex-col gap-2 w-48 shrink-0">
        {metricsConfig.map((m) => (
          <Button
            key={m.metric}
            onClick={() => onMetricChange(m.metric)}
            variant={selectedMetric === m.metric ? "default" : "outline"}
            className="w-full"
          >
            {m.label}
          </Button>
        ))}
      </aside>
      <main className="flex-1 min-h-0">
        <MetricPlot
          data={data}
          dataKey={selectedMetric}
          axisLabels={
            selectedConfig?.axisLabels ?? { xLabel: "Time", yLabel: "Value" }
          }
          colors={plotColors}
        />
      </main>
    </div>
  );
}

function MetricPlotPanel({
  data,
  defaultMetric,
  metricsConfig,
  plotColors,
  title,
}: MetricPlotPanelProps) {
  const [selectedMetric, setSelectedMetric] = useState<Metric>(defaultMetric);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 border-2 border-gray-600 rounded-xs">
      <div className="h-148">
        <PlotArea
          data={data}
          selectedMetric={selectedMetric}
          metricsConfig={metricsConfig}
          plotColors={plotColors}
          onMetricChange={setSelectedMetric}
        />
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <Button
          variant="default"
          className="w-full gap-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={!data.length}
          onClick={(e) => {
            if (!data.length) {
              e.preventDefault();
              return;
            }
            setSheetOpen(true);
          }}
        >
          <Expand className="size-4" />
          Expand
        </Button>
        <SheetContent side="bottom" className="h-[98vh]!">
          <div className="flex flex-col h-full gap-2 p-4">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            <div className="flex-1 min-h-0">
              <PlotArea
                data={data}
                selectedMetric={selectedMetric}
                metricsConfig={metricsConfig}
                plotColors={plotColors}
                onMetricChange={setSelectedMetric}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MetricPlotPanel;
