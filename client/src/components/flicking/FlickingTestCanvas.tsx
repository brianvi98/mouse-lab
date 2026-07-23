import { useState, useRef, useEffect } from "react";
import { usePointerCapture, type PointerSample } from "@/hooks/usePointerCapture";

type FlickingTestCanvasProps = {
  onCompletion: (data: PointerSample[]) => void;
};

function FlickingTestCanvas({ onCompletion = () => {} }: FlickingTestCanvasProps) {
  const TELEPORT_INTERVAL_MS = 3000;
  const TEST_DURATION_MS = 15000;

  const [isRecording, setIsRecording] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [timer, setTimer] = useState(TEST_DURATION_MS / 1000);

  const ballRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { data: pointerData } = usePointerCapture<HTMLDivElement>({
    targetRef: canvasRef,
    isRecording,
  });

  const moveBall = () => {
    if (!canvasRef.current || !ballRef.current || !isRecording) return;

    const canvasBounds = canvasRef.current.getBoundingClientRect();
    const ballBounds = ballRef.current.getBoundingClientRect();

    const left = Math.random() * (canvasBounds.width - ballBounds.width);
    const top = Math.random() * (canvasBounds.height - ballBounds.height);

    ballRef.current.style.left = `${left}px`;
    ballRef.current.style.top = `${top}px`;
  };

  // teleporting logic for target pill
  useEffect(() => {
    const intervalId = setInterval(() => {
      moveBall();
    }, TELEPORT_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [canvasRef, ballRef, isRecording]);

  // timer logic
  useEffect(() => {
    if (!isRecording || isTestComplete) return;

    const timeoutId = setTimeout(() => {
      console.log("test complete");

      setIsRecording(false);
      setIsTestComplete(true);

      onCompletion(pointerData.current);
    }, TEST_DURATION_MS);

    const timerDecrementId = setInterval(() => {
      setTimer((t) => Math.max(0, t - 1));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(timerDecrementId);
    };
  }, [isRecording, isTestComplete, onCompletion]);

  const clickStartTest = (e: React.PointerEvent<HTMLDivElement>) => {
    console.log("starting test, recording pointer data...");
    e.stopPropagation();
    setIsRecording(true);

    requestAnimationFrame(() => {
      moveBall();
    });
  };

  if (timer <= 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="mt-32 text-3xl">Test Complete!</p>
        <p className="text-m">Press Escape to exit this scenario and view your results.</p>
      </div>
    );
  }

  return (
    <div ref={canvasRef} className="bg-canvas relative flex h-full w-full items-center justify-center outline-2">
      {isRecording && <h1 className="absolute top-2 left-1/2 z-10 text-3xl">{timer}</h1>}
      <div ref={ballRef} className="bg-flick-orange absolute h-20 w-20 rounded-full"></div>

      {!isRecording && (
        <div
          className="bg-canvas absolute flex h-full w-full items-center justify-center opacity-75"
          onClick={clickStartTest}
        >
          <div className="flex flex-col items-center">
            <p className="text-3xl">CLICK TO START</p>
            <p className="text-m">
              1. The target will teleport around every {TELEPORT_INTERVAL_MS / 1000} seconds.
              <br /> 2. Try to make one clean flick between the targets.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlickingTestCanvas;
