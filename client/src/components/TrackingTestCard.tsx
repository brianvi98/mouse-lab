import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "./ui/separator";
import { useState } from "react"

function TrackingTestCard() {
  const [isIdle, setIsIdle] = useState(true);

  return <Card className="border-2 border-gray-600 w-1/5 hover:scale-105
                          transition-transform duration-500"
  >
    <CardHeader className="flex flex-row justify-between items-center">
      <CardTitle className="text-orange-300">Flick Test</CardTitle>
      <CardContent className="border rounded-sm py-0.5">
        {isIdle ? "IDLE" : "ACTIVE"}
      </CardContent>
    </CardHeader>

    <CardDescription 
      className="flex flex-col justify-center align-center py-20"
    >
      <CardContent className="font-semibold text-center">
        Click to Start <br />Flicking Test
      </CardContent>
      <CardContent className="text-center text-xs">
        (short, explosive movements)
      </CardContent>
    </CardDescription>
    
    <CardFooter>
      <div className="flex flex-col">
        <CardContent className="text-xs font-light text-gray-400 text-center">
          PEAK VELOCITY
        </CardContent>
        <CardContent className="text-center text-orange-300">70</CardContent>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col">
        <CardContent className="text-xs font-light text-gray-400 text-center">
          PEAK ACCELERATION
        </CardContent>
        <CardContent className="text-center text-orange-300">-</CardContent>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col">
        <CardContent className="text-xs font-light text-gray-400 text-center">
          AVG. JERK
        </CardContent>
        <CardContent className="text-center text-orange-300">45</CardContent>
      </div>
    </CardFooter>
  </Card>
}

export default TrackingTestCard
