import type { CalculatedMetrics } from "@/utils/metricsCalculation";
import type { PointerSample } from "@/hooks/usePointerCapture";
import type { GearSettings } from "./gearsettings";

export type TrialType = "flicking" | "tracking";

export type TrialResponse = {
  id: string; // UUID
  trialType: TrialType;
  metrics: CalculatedMetrics;
};

export type TrialRequest = {
  trialType: TrialType;
  pointerSamples: PointerSample[];
};

export type SessionSummaryResponse = {
  id: string; // UUID
  createdAt: string; // Java Instant
  mouse: string;
  mousepad: string;
  skates: string;
  trialTypes: TrialType[];
};

export type SessionDetailsResponse = {
  id: string; // UUID
  createdAt: string; // Java Instant
  trials: TrialResponse[];
};

export type CreateSessionRequest = {
  settings: GearSettings;
  trials: TrialRequest[];
};

export type SessionsStatsResponse = {
  mostUsedMouseFullName: string;
  mostUsedMousepadFullName: string;
  mostUsedSkatesFullName: string;
  totalSessionsCompleted: number;
};
