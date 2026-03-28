import { useRef, useState } from "react";
import { usePointerCapture } from "@/hooks/usePointerCapture";
import type { PointerDataPoint } from "@/hooks/usePointerCapture";

function TrackingTestCanvas() {
  const [isRecording, setIsRecording] = useState(false);
  const ref = useRef(null);
  const { data: pointerData } = usePointerCapture<HTMLDivElement>({ 
    targetRef: ref, 
    isRecording 
  });

  return <div ref={ref} className="w-full h-full bg-red-50">
    
  </div>
}

export default TrackingTestCanvas