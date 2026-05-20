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
import type { PointerDataPoint } from "@/hooks/usePointerCapture";
import FlickingTestCanvas from "./FlickingTestCanvas";

function FlickingTestCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pointerData, setPointerData] = useState<PointerDataPoint[]>([]);
  const { frames } = useMemo(() => {
    return calculateMetrics(pointerData);
  }, [pointerData]);

  const handleCardClick = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialogOpen((prev) => !prev);
  };

  const handleTestCompletion = (data: PointerDataPoint[]) => {
    setPointerData(data);
  };

  return (
    <>
      <div className="w-1/5 flex flex-col justify-center">
        <Card
          className="border-2 border-gray-600 hover:scale-101
                    transition-transform duration-100 cursor-pointer"
          onClick={handleCardClick}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-flick-orange">Flicking Test</CardTitle>
            <div className="border rounded-sm py-0.5 text-center w-25">
              {!frames.length ? "INCOMPLETE" : "COMPLETE"}
            </div>
          </CardHeader>
          <CardDescription className="flex flex-col justify-center align-center py-20">
            <Button className="font-semibold text-center border w-fit mx-auto mb-2">
              START
            </Button>
            <CardContent className="text-center text-xs">
              (short, explosive swipes)
            </CardContent>
          </CardDescription>

          <CardFooter className="px-2 flex flex-row justify-between">
            <div className="flex flex-col justify-between">
              <CardContent className="text-xs font-light text-gray-400 text-center">
                PEAK VELOCITY
                <br />
                (px/ms)
              </CardContent>
              <CardContent className="text-center text-flick-orange tabular-nums">
                -
              </CardContent>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col justify-between">
              <CardContent className="text-xs font-light text-gray-400 text-center">
                PEAK ACCELERATION
                <br />
                (px/ms²)
              </CardContent>
              <CardContent className="text-center text-flick-orange tabular-nums">
                -
              </CardContent>
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
