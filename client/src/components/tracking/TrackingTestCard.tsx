import { useState, useMemo } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import TrackingTestCanvas from "./TrackingTestCanvas";
import { calculateMetrics } from "@/utils/metricsCalculation";
import type { PointerSample } from "@/hooks/usePointerCapture";

export type TrackingTestProps = {
  onCompletion: (data: PointerSample[]) => void;
};

function TrackingTestCard({ onCompletion }: TrackingTestProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pointerData, setPointerData] = useState<PointerSample[]>([]);
  const { avgVelocitiesX, avgVelocitiesY, avgAccelerationsX, avgAccelerationsY } = useMemo(() => {
    return calculateMetrics(pointerData);
  }, [pointerData]);

  const handleCardClick = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialogOpen((prev) => !prev);
  };

  const handleTestCompletion = (data: PointerSample[]) => {
    setPointerData(data);
    onCompletion(data);
  };

  return (
    <>
      <div className="flex flex-1 shrink-0 flex-col justify-center">
        <Card
          className="flex h-full min-h-2 w-full cursor-pointer flex-col border-2 border-gray-600 transition-transform duration-100 hover:scale-101"
          onClick={handleCardClick}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-track-teal">Tracking Test</CardTitle>
            <div className="w-25 rounded-sm border py-0.5 text-center">
              {!frames.length ? "INCOMPLETE" : "COMPLETE"}
            </div>
          </CardHeader>
          <CardDescription className="align-center flex flex-1 flex-col justify-center py-20">
            <Button className="mx-auto mb-2 w-fit border text-center font-semibold">START</Button>
            <CardContent className="text-center text-xs">(sustained, focused movement)</CardContent>
          </CardDescription>

          <CardFooter className="flex min-h-30 flex-row justify-around px-2">
            <div className="flex min-w-32 flex-col items-center justify-center gap-2">
              <div className="text-center text-xs font-light text-gray-400">
                AVERAGE VELOCITY
                <br />
                (px/ms)
              </div>

              <div className="text-track-teal tabular-nums">
                <div>X : {avgVelocitiesX ? avgVelocitiesX.toFixed(3) : "-"}</div>
                <div>Y : {avgVelocitiesY ? avgVelocitiesY.toFixed(3) : "-"}</div>
              </div>
            </div>

            <Separator orientation="vertical" />

            <div className="flex min-w-32 flex-col items-center gap-2">
              <div className="text-center text-xs font-light text-gray-400">
                AVERAGE ACCELERATION
                <br />
                (px/ms²)
              </div>

              <div className="text-track-teal tabular-nums">
                <div>X : {avgAccelerationsX ? avgAccelerationsX.toFixed(3) : "-"}</div>
                <div>Y : {avgAccelerationsY ? avgAccelerationsY.toFixed(3) : "-"}</div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="h-screen min-w-screen p-4" showCloseButton={false}>
          <div tabIndex={0}>
            <TrackingTestCanvas onCompletion={handleTestCompletion} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TrackingTestCard;
