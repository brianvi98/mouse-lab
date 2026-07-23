import { useRef, useState, useEffect } from "react";

import { usePointerCapture } from "@/hooks/usePointerCapture";
import type { PointerSample } from "@/hooks/usePointerCapture";

type TestParameters = {
  axis: "x" | "y";
  trialNum: number;
};

type TrackingTestCanvasProps = {
  onCompletion: (data: PointerSample[]) => void;
};

function TrackingTestCanvas({ onCompletion = () => {} }: TrackingTestCanvasProps) {
  const PROGRESS_FINISH_THRESHOLD = 99.5;
  const PROGRESS_RESET_THRESHOLD = 10;

  // - Test management
  const trials: readonly TestParameters[] = [
    { axis: "x", trialNum: 1 },
    { axis: "x", trialNum: 2 },
    { axis: "y", trialNum: 1 },
    { axis: "y", trialNum: 2 },
  ];
  const [trialIndex, setTrialIndex] = useState(0);
  const [swipeActive, setSwipeActive] = useState(false);

  // - Manage value fill in the tracking bars for visual aid during the test
  const [horizontalProgress, setHorizontalProgress] = useState(0);
  const [verticalProgress, setVerticalProgress] = useState(0);

  // - Recording logic
  const [isRecording, setIsRecording] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const { data: pointerData } = usePointerCapture<HTMLDivElement>({
    targetRef: canvasRef,
    isRecording,
  });
  // * the pointer capture hook will only snapshot the most recent data when
  // isRecording is toggled. This is required to aggregate the data points from
  // each individual trial while ignoring idle time between trials.
  const aggregatePointerData = useRef<PointerSample[]>([]);
  // * likewise, the pointer hook runs multiple times in this test scenario.
  // the timestamps will reset each time, so we need this to put them all
  // on the same timescale when we aggregate the data
  const timeOffset = useRef(0);

  // - Test logic
  useEffect(() => {
    if (trialIndex < trials.length) {
      const progress = trials[trialIndex].axis === "x" ? horizontalProgress : verticalProgress;

      if (progress >= PROGRESS_FINISH_THRESHOLD && !swipeActive) {
        const adjusted = pointerData.current.map((p) => ({
          ...p,
          t: p.t + timeOffset.current,
        }));
        setSwipeActive(true);
        setTrialIndex((i) => i + 1);
        setHorizontalProgress(0);
        setVerticalProgress(0);
        aggregatePointerData.current = [...aggregatePointerData.current, ...adjusted];
        timeOffset.current = adjusted.at(-1)?.t ?? timeOffset.current;
        setIsRecording(false);
      } else if (progress < PROGRESS_RESET_THRESHOLD && swipeActive) {
        setSwipeActive(false);
      }
    }
  }, [horizontalProgress, verticalProgress, trialIndex]);

  useEffect(() => {
    if (trialIndex >= trials.length) {
      setIsTestComplete(true);
    }
  }, [trialIndex]);

  useEffect(() => {
    if (isTestComplete) onCompletion(aggregatePointerData.current);
  }, [isTestComplete]);

  // - Event handlers
  const handleMouseMoveHorizontal = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(horizontalProgress, Math.min(100, (x / rect.width) * 100));
    setHorizontalProgress(percent);
  };

  const handleMouseMoveVertical = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percent = Math.max(verticalProgress, Math.min(100, (y / rect.height) * 100));
    setVerticalProgress(percent);
  };

  const clickStartTest = (e: React.PointerEvent<HTMLDivElement>) => {
    console.log("starting test, recording pointer data...");
    e.stopPropagation();
    setIsRecording(true);
  };

  // - Test completion screen
  if (trialIndex >= trials.length) {
    return (
      <div className="text-center">
        <p className="mt-32 text-3xl">Test Complete!</p>
        <p className="text-m">Press Escape to exit this scenario and view your results.</p>
      </div>
    );
  }

  return (
    <div ref={canvasRef} className="bg-canvas flex h-full w-full items-center justify-center outline-2">
      {!isRecording && (
        <div
          className="bg-canvas absolute flex h-full w-full items-center justify-center opacity-75"
          onClick={clickStartTest}
        >
          <div className="flex flex-col items-center">
            <p className="text-3xl">CLICK TO START</p>
            <p className="text-m">
              (Align your cursor with the left edge of the bar and swipe smoothly to the right, maintaining a steady
              pace)
            </p>
          </div>
        </div>
      )}
      {trials[trialIndex].axis === "x" && (
        <div className="border-track-teal h-32 w-full border bg-gray-400" onMouseMove={handleMouseMoveHorizontal}>
          <div className="bg-track-teal h-full" style={{ width: `${horizontalProgress}%` }}></div>
        </div>
      )}
      {trials[trialIndex].axis === "y" && (
        <div className="border-track-teal h-full w-32 border bg-gray-400" onMouseMove={handleMouseMoveVertical}>
          <div className="bg-track-teal w-full" style={{ height: `${verticalProgress}%` }}></div>
        </div>
      )}
    </div>
  );
}

export default TrackingTestCanvas;
