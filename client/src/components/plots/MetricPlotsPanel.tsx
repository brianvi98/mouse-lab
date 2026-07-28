import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Expand } from "lucide-react";
import MetricPlot from "@/components/plots/MetricPlot";
import type { Metric } from "@/utils/metricsCalculation";
import type { FrameSample } from "@/types/framesample";

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
  data: FrameSample[];
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
  data: FrameSample[];
  selectedMetric: Metric;
  metricsConfig: MetricButton[];
  plotColors: PlotColors;
  onMetricChange: (m: Metric) => void;
}) {
  const selectedConfig = metricsConfig.find((m) => m.metric === selectedMetric);

  return (
    <div className="flex h-full gap-4">
      <aside className="flex w-48 shrink-0 flex-col gap-2">
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
      <main className="min-h-0 flex-1">
        <MetricPlot
          data={data}
          dataKey={selectedMetric}
          axisLabels={selectedConfig?.axisLabels ?? { xLabel: "Time", yLabel: "Value" }}
          colors={plotColors}
        />
      </main>
    </div>
  );
}

function MetricPlotPanel({ data, defaultMetric, metricsConfig, plotColors, title }: MetricPlotPanelProps) {
  const [selectedMetric, setSelectedMetric] = useState<Metric>(defaultMetric);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 rounded-xs border-2 border-gray-600">
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
          <div className="flex h-full flex-col gap-2 p-4">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            <div className="min-h-0 flex-1">
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
