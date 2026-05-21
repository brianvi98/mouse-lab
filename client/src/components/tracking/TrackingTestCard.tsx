import { useState, useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import TrackingTestCanvas from "./TrackingTestCanvas";
import TestResultsDashboard from "../TestResultsDashboard";
import type { MetricButton, PlotColors } from "../TestResultsDashboard";
import { calculateMetrics } from "@/utils/metricsCalculation";
import type { PointerDataPoint } from "@/hooks/usePointerCapture";

function TrackingTestCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pointerData, setPointerData] = useState<PointerDataPoint[]>([]);
  const {
    frames,
    avgVelocitiesX,
    avgVelocitiesY,
    avgAccelerationsX,
    avgAccelerationsY,
  } = useMemo(() => {
    return calculateMetrics(pointerData);
  }, [pointerData]);

  const handleCardClick = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialogOpen((prev) => !prev);
  };

  const handleTestCompletion = (data: PointerDataPoint[]) => {
    setPointerData(data);
  };

  const metricButtonsConfig: MetricButton[] = [
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
  ];

  const plotColors: PlotColors = {
    realData: "#2ec4a0",
    smoothData: "#f0a030",
  };

  return (
    <>
      <div className="w-[320px] flex flex-col justify-center shrink-0">
        <Card
          className="border-2 border-gray-600 hover:scale-101 w-full
                    transition-transform duration-100 cursor-pointer min-h-2 
                    flex flex-col h-full"
          onClick={handleCardClick}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-track-teal">Tracking Test</CardTitle>
            <div className="border rounded-sm py-0.5 text-center w-25">
              {!frames.length ? "INCOMPLETE" : "COMPLETE"}
            </div>
          </CardHeader>
          <CardDescription className="flex flex-col flex-1 justify-center align-center py-20">
            <Button className="font-semibold text-center border w-fit mx-auto mb-2">
              START
            </Button>
            <CardContent className="text-center text-xs">
              (sustained, focused movement)
            </CardContent>
          </CardDescription>

          <CardFooter className="px-2 flex flex-row justify-between min-h-30">
            <div className="flex flex-col items-center justify-center gap-2 min-w-32">
              <div className="text-xs font-light text-gray-400 text-center">
                AVERAGE VELOCITY
                <br />
                (px/ms)
              </div>

              <div className="text-track-teal tabular-nums">
                <div>
                  X : {avgVelocitiesX ? avgVelocitiesX.toFixed(3) : "-"}
                </div>
                <div>
                  Y : {avgVelocitiesY ? avgVelocitiesY.toFixed(3) : "-"}
                </div>
              </div>
            </div>

            <Separator orientation="vertical" />

            <div className="flex flex-col items-center justify-center gap-2 min-w-32">
              <div className="text-xs font-light text-gray-400 text-center">
                AVERAGE ACCELERATION
                <br />
                (px/ms²)
              </div>

              <div className="text-track-teal tabular-nums">
                <div>
                  X : {avgAccelerationsX ? avgAccelerationsX.toFixed(3) : "-"}
                </div>
                <div>
                  Y : {avgAccelerationsY ? avgAccelerationsY.toFixed(3) : "-"}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <TestResultsDashboard
          data={frames}
          title={"Tracking"}
          defaultMetric={"vx"}
          metricButtonsConfig={metricButtonsConfig}
          plotColors={plotColors}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="min-w-screen h-screen p-4"
          showCloseButton={false}
        >
          <div tabIndex={0}>
            <TrackingTestCanvas onCompletion={handleTestCompletion} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TrackingTestCard;
