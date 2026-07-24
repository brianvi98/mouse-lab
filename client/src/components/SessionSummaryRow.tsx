import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import MetricPlotsDashboard from "./plots/MetricPlotsDashboard";
import type { SessionSummaryResponse } from "@/types/sessions";
import { useGetSessionByIdQuery, useDeleteSessionByIdMutation } from "@/api/sessionsApi";
import type { TrialType } from "@/types/sessions";
import { X } from "lucide-react";

export type SessionSummaryRowProps = {
  summary?: SessionSummaryResponse;
  isLoading: boolean;
};

function SessionSummaryRow({ summary, isLoading }: SessionSummaryRowProps) {
  const [open, setOpen] = useState(false);
  const [trial, setTrial] = useState<TrialType | null>(null);
  const [deleteSessionById] = useDeleteSessionByIdMutation();

  if (!summary || isLoading) {
    return <Skeleton className="w-full" />;
  }

  const { id, createdAt, mouse, mousepad, skates, trialTypes } = summary;

  const { data: sessionDetails, isLoading: sessionDetailsLoading } = useGetSessionByIdQuery(id, { skip: !open });

  const trackingTrial = sessionDetails?.data?.trials.find((t) => t.trialType === "tracking");
  const flickingTrial = sessionDetails?.data?.trials.find((t) => t.trialType === "flicking");

  const onTrialChange = (t: TrialType) => {
    setTrial(t);
  };

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    deleteSessionById(id);
  };

  return (
    <div className="-p-4 w-full overflow-hidden rounded-lg border-2 border-olive-700">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 bg-[#1a1d26] px-4 py-3 text-left"
      >
        <div className="space-between flex w-full items-center text-slate-300">
          <X onClick={handleDelete} className="mr-4 rounded-sm text-red-400 hover:bg-red-400 hover:text-white" />
          <div className="min-w-0">
            <p className="text-md font-medium">{mouse}</p>
            <p className="truncate text-xs text-olive-300">
              {mousepad} · {skates}
            </p>
          </div>
          <div className="flex-1"></div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex gap-1">
              {trialTypes.map((type) => (
                <span
                  key={type}
                  className={`bg-surface-1 rounded-full border border-slate-900 px-2 py-0.5 text-sm ${type === "tracking" ? "text-track-teal" : "text-flick-orange"}`}
                >
                  {type}
                </span>
              ))}
            </div>
            <span className="text-md font-semibold whitespace-nowrap text-slate-500">
              {new Date(createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </button>

      {/* opened area*/}
      {open &&
        (sessionDetailsLoading ? (
          <div className="flex h-48 w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-olive-300" />
          </div>
        ) : (
          <>
            <div className="mt-4 flex h-24 justify-between gap-16 px-4">
              {trial === "tracking" && (
                <>
                  <div className="mt-1 mb-2 flex-1 rounded-lg bg-mist-900 px-2 pt-2 text-sm">
                    <span className="text-track-teal">Average Velocity (px/ms)</span>
                    <hr className="mb-2 w-full" />X <span className="text-gray-400">|</span>{" "}
                    {trackingTrial?.metrics.avgVelocitiesX.toFixed(3) ?? "-"}
                    <br />Y <span className="text-gray-400">|</span>{" "}
                    {trackingTrial?.metrics.avgVelocitiesY.toFixed(3) ?? "-"}
                  </div>

                  <div className="mt-1 mb-2 flex-1 rounded-lg bg-mist-900 px-2 pt-2 pb-4 text-sm">
                    <span className="text-track-teal">Average Acceleration (px²/ms)</span>
                    <hr className="mb-2 w-full" />X <span className="text-gray-400">|</span>{" "}
                    {trackingTrial?.metrics.avgAccelerationsX.toFixed(3) ?? "-"}
                    <br />Y <span className="text-gray-400">|</span>{" "}
                    {trackingTrial?.metrics.avgAccelerationsY.toFixed(3) ?? "-"}
                  </div>
                </>
              )}

              {trial === "flicking" && (
                <>
                  <div className="mt-1 mb-2 flex-1 rounded-lg bg-mist-900 px-2 pt-2 pb-4 text-sm">
                    <span className="text-flick-orange">Peak Velocity (px/ms)</span>
                    <hr className="mb-2 w-full" />
                    {flickingTrial?.metrics.peakVelocity.toFixed(3) ?? "-"}
                  </div>

                  <div className="mt-1 mb-2 flex-1 rounded-lg bg-mist-900 px-2 pt-2 pb-4 text-sm">
                    <span className="text-flick-orange">Peak Acceleration (px²/ms)</span>
                    <hr className="mb-2 w-full" />
                    {flickingTrial?.metrics.peakAcceleration.toFixed(3) ?? "-"}
                  </div>
                </>
              )}
            </div>

            <div className="animate-in fade-in p-2 pb-4 duration-200">
              <MetricPlotsDashboard
                trackingFrames={trackingTrial?.metrics.frameSamples}
                flickingFrames={flickingTrial?.metrics.frameSamples}
                onTrialChange={onTrialChange}
              />
            </div>
          </>
        ))}
    </div>
  );
}

export default SessionSummaryRow;
