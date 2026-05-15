import { useMemo } from "react";
import type { CSSProperties } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  LineChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";
import type { Frame, Metric } from "@/utils/metricsCalculation";

export type MetricPlotProps = {
  data: Frame[];
  dataKey: Metric;
  title?: string;
  axisLabels: { xLabel: string; yLabel: string };
  colors: {
    realData: CSSProperties["color"];
    smoothData: CSSProperties["color"];
  };
};

function MetricPlot({ data, dataKey, axisLabels, colors }: MetricPlotProps) {
  const WINDOW_RADIUS = 12;

  // calculate centered rolling average for a smoother looking line
  const smoothed = useMemo(() => {
    const result = [];

    for (let i = 0; i < data.length; i++) {
      let sum = 0;
      let count = 0;

      for (
        let j = Math.max(0, i - WINDOW_RADIUS);
        j <= Math.min(data.length - 1, i + WINDOW_RADIUS);
        j++
      ) {
        sum += data[j][dataKey];
        count++;
      }

      result.push({
        ...data[i],
        smooth: sum / count,
      });
    }

    return result;
  }, [data, dataKey]);

  // x-axis will be in milliseconds, so ticks by 100
  const ticks = useMemo(() => {
    if (data.length === 0) return [0];

    const maxT = data.reduce((m, d) => Math.max(m, d.t), 0);
    const maxTick = Math.ceil(maxT / 100) * 100;

    const result: number[] = [];
    for (let t = 0; t <= maxTick; t += 100) {
      result.push(t);
    }

    return result;
  }, [data]);

  return (
    <ResponsiveContainer width="96%" height="100%">
      <LineChart
        data={smoothed}
        margin={{ top: 20, right: 0, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="t"
          type="number"
          scale="linear"
          ticks={ticks}
          label={{
            value: axisLabels.xLabel,
            position: "insideBottom",
            offset: -2,
          }}
        />

        <YAxis
          width={60}
          label={{
            value: axisLabels.yLabel,
            position: "insideLeft",
            angle: -90,
          }}
        />

        <Tooltip />

        <Line
          type="linear"
          dataKey={dataKey}
          stroke={colors.realData}
          dot={false}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="smooth"
          stroke={colors.smoothData}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MetricPlot;
