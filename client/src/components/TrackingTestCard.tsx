import { useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import TrackingTestCanvas from "./TrackingTestCanvas"

function TrackingTestCard() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDialogOpen((prev) => !prev);
  }

  return <>
  <Card 
    className="border-2 border-gray-600 w-1/5 hover:scale-105
               transition-transform duration-250 cursor-pointer"
    onClick={handleCardClick}
  >
    <CardHeader className="flex flex-row justify-between items-center">
      <CardTitle className="text-green-300">Tracking Test</CardTitle>
      <div className="border rounded-sm py-0.5 text-center w-20">
        {dialogOpen ? "ACTIVE" : "IDLE"}
      </div>
    </CardHeader>

    <CardDescription 
      className="flex flex-col justify-center align-center py-20"
    >
      <Button className="font-semibold text-center border w-fit mx-auto mb-2"
      >
        START
      </Button>
      <CardContent className="text-center text-xs">
        (sustained, focused movement)
      </CardContent>
    </CardDescription>
    
    <CardFooter className="px-2">
      <div className="flex flex-col justify-between">
        <CardContent className="text-xs font-light text-gray-400 text-center">
          PEAK VELOCITY
        </CardContent>
        <CardContent className="text-center text-green-300">70</CardContent>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col justify-between">
        <CardContent className="text-xs font-light text-gray-400 text-center">
          PEAK ACCELERATION
        </CardContent>
        <CardContent className="text-center text-green-300">-</CardContent>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col justify-between">
        <CardContent className="text-xs font-light text-gray-400 text-center">
          AVG. JITTER
        </CardContent>
        <CardContent className="text-center text-green-300">45</CardContent>
      </div>
    </CardFooter>
  </Card>

  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogContent className="min-w-screen h-screen p-4" showCloseButton={false}>
      <div tabIndex={0}>
        <TrackingTestCanvas onCompletion={() => {}}/>
      </div>
    </DialogContent>
  </Dialog>
  </>
}

export default TrackingTestCard
