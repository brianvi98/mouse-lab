import { useState } from "react";
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
    return <Skeleton className="h-16 w-full rounded-lg" />;
  }

  const { id, createdAt, mouse, mousepad, skates, trialTypes } = summary;

  const { data: sessionDetails, isLoading: sessionDetailsLoading } = useGetSessionByIdQuery(id, {
    skip: !open,
  });

  const trackingTrial = sessionDetails?.data?.trials.find((t) => t.trialType === "tracking");
  const flickingTrial = sessionDetails?.data?.trials.find((t) => t.trialType === "flicking");

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    deleteSessionById(id);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-olive-700">
      {/* Header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer flex-col gap-4 bg-[#1a1d26] px-4 py-3 text-left sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex min-w-0 items-center gap-3 text-slate-300">
          <X
            onClick={handleDelete}
            className="size-5 shrink-0 rounded-sm text-red-400 hover:bg-red-400 hover:text-white"
          />

          <div className="min-w-0">
            <p className="truncate font-medium">{mouse}</p>
            <p className="truncate text-xs text-olive-300">
              {mousepad} · {skates}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <div className="flex flex-wrap gap-1">
            {trialTypes.map((type) => (
              <span
                key={type}
                className={`bg-surface-1 rounded-full border border-slate-900 px-2 py-0.5 text-sm ${type === "tracking" ? "text-track-teal" : "text-flick-orange"} `}
              >
                {type}
              </span>
            ))}
          </div>

          <span className="text-sm font-semibold text-slate-500 sm:whitespace-nowrap">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <>
          {sessionDetailsLoading ? (
            <div className="flex h-48 w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-olive-300" />
            </div>
          ) : (
            <>
              {/* Metrics */}
              <div className="flex flex-col gap-4 px-4 pt-4 sm:flex-row">
                {trial === "tracking" && (
                  <>
                    <MetricCard title="Average Velocity (px/ms)" color="track">
                      X <span>|</span> {trackingTrial?.metrics.avgVelocitiesX.toFixed(3) ?? "-"}
                      <br />Y <span>|</span> {trackingTrial?.metrics.avgVelocitiesY.toFixed(3) ?? "-"}
                    </MetricCard>

                    <MetricCard title="Average Acceleration (px²/ms)" color="track">
                      X <span>|</span> {trackingTrial?.metrics.avgAccelerationsX.toFixed(3) ?? "-"}
                      <br />Y <span>|</span> {trackingTrial?.metrics.avgAccelerationsY.toFixed(3) ?? "-"}
                    </MetricCard>
                  </>
                )}

                {trial === "flicking" && (
                  <>
                    <MetricCard title="Peak Velocity (px/ms)" color="flick">
                      {flickingTrial?.metrics.peakVelocity.toFixed(3) ?? "-"}
                    </MetricCard>

                    <MetricCard title="Peak Acceleration (px²/ms)" color="flick">
                      {flickingTrial?.metrics.peakAcceleration.toFixed(3) ?? "-"}
                    </MetricCard>
                  </>
                )}
              </div>

              <div className="animate-in fade-in p-2 pb-4 duration-200">
                <MetricPlotsDashboard
                  trackingFrames={trackingTrial?.metrics.frameSamples}
                  flickingFrames={flickingTrial?.metrics.frameSamples}
                  onTrialChange={setTrial}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

type MetricCardProps = {
  title: string;
  color: "track" | "flick";
  children: React.ReactNode;
};

function MetricCard({ title, color, children }: MetricCardProps) {
  return (
    <div className="flex-1 rounded-lg bg-mist-900 px-2 py-2 text-sm">
      <span className={color === "track" ? "text-track-teal" : "text-flick-orange"}>{title}</span>

      <hr className="mb-2 w-full" />

      <div>{children}</div>
    </div>
  );
}

export default SessionSummaryRow;
