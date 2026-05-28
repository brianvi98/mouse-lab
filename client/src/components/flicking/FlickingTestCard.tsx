import { useState, useMemo, useEffect } from "react";

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
import { calculateMetrics } from "@/utils/metricsCalculation";
import type { Metric } from "@/utils/metricsCalculation";
import type { PointerDataPoint } from "@/hooks/usePointerCapture";
import FlickingTestCanvas from "./FlickingTestCanvas";

export type FlickingTestProps = {
  onCompletion: (data: PointerDataPoint[]) => void;
};

function FlickingTestCard({ onCompletion }: FlickingTestProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pointerData, setPointerData] = useState<PointerDataPoint[]>([]);
  const { peakVelocity, peakAcceleration } = useMemo(() => {
    return calculateMetrics(pointerData);
  }, [pointerData]);

  const handleCardClick = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialogOpen((prev) => !prev);
  };

  const handleTestCompletion = (data: PointerDataPoint[]) => {
    setPointerData(data);
    onCompletion(data);
  };

  return (
    <>
      <div className="flex flex-col justify-center shrink-0 flex-1">
        <Card
          className="border-2 border-gray-600 hover:scale-101 w-full
                    transition-transform duration-100 cursor-pointer flex flex-col h-full"
          onClick={handleCardClick}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-flick-orange">Flicking Test</CardTitle>
            <div className="border rounded-sm py-0.5 text-center w-25">
              {!frames.length ? "INCOMPLETE" : "COMPLETE"}
            </div>
          </CardHeader>
          <CardDescription
            className="flex flex-col flex-1 justify-center 
                      align-center py-20"
          >
            <Button className="font-semibold text-center border w-fit mx-auto mb-2">
              START
            </Button>
            <CardContent className="text-center text-xs">
              (short, explosive swipes)
            </CardContent>
          </CardDescription>

          <CardFooter className="px-2 flex flex-row justify-around min-h-30">
            <div className="flex flex-col items-center justify-center gap-2 min-w-32">
              <div className="text-xs font-light text-gray-400 text-center">
                PEAK VELOCITY
                <br />
                (px/ms)
              </div>

              <div className="text-flick-orange tabular-nums">
                {peakVelocity ? peakVelocity.toFixed(3) : "-"}
              </div>
            </div>

            <Separator orientation="vertical" />

            <div className="flex flex-col items-center justify-center gap-2 min-w-32">
              <div className="text-xs font-light text-gray-400 text-center">
                PEAK ACCELERATION
                <br />
                (px/ms²)
              </div>

              <div className="text-flick-orange tabular-nums">
                {peakAcceleration ? peakAcceleration.toFixed(3) : "-"}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="min-w-screen h-screen p-4"
          showCloseButton={false}
        >
          <div tabIndex={0}>
            <FlickingTestCanvas
              onCompletion={handleTestCompletion}
            ></FlickingTestCanvas>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FlickingTestCard;
