import { useState, useMemo } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { calculateMetrics } from "@/utils/metricsCalculation";
import type { PointerSample } from "@/hooks/usePointerCapture";
import FlickingTestCanvas from "./FlickingTestCanvas";

export type FlickingTestProps = {
  onCompletion: (data: PointerSample[]) => void;
};

function FlickingTestCard({ onCompletion }: FlickingTestProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pointerData, setPointerData] = useState<PointerSample[]>([]);
  const { peakVelocity, peakAcceleration } = useMemo(() => {
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
          className="flex h-full w-full cursor-pointer flex-col border-2 border-gray-600 transition-transform duration-100 hover:scale-101"
          onClick={handleCardClick}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-flick-orange">Flicking Test</CardTitle>
            <div className="w-25 rounded-sm border py-0.5 text-center">
              {!pointerData.length ? "INCOMPLETE" : "COMPLETE"}
            </div>
          </CardHeader>
          <CardDescription className="align-center flex flex-1 flex-col justify-center py-20">
            <Button className="mx-auto mb-2 w-fit border text-center font-semibold">START</Button>
            <CardContent className="text-center text-xs">(short, explosive swipes)</CardContent>
          </CardDescription>

          <CardFooter className="flex min-h-30 flex-row justify-around px-2">
            <div className="flex min-w-32 flex-col items-center justify-center gap-2">
              <div className="text-center text-xs font-light text-gray-400">
                PEAK VELOCITY
                <br />
                (px/ms)
              </div>

              <div className="text-flick-orange tabular-nums">{peakVelocity ? peakVelocity.toFixed(3) : "-"}</div>
            </div>

            <Separator orientation="vertical" />

            <div className="flex min-w-32 flex-col items-center justify-center gap-2">
              <div className="text-center text-xs font-light text-gray-400">
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
        <DialogContent className="h-screen min-w-screen p-4" showCloseButton={false}>
          <div tabIndex={0}>
            <FlickingTestCanvas onCompletion={handleTestCompletion}></FlickingTestCanvas>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FlickingTestCard;
