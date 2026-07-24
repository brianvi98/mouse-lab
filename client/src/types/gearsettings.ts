export type PollingRate = 125 | 250 | 500 | 1000 | 2000 | 4000 | 8000;

export type RefreshRate = 60 | 75 | 100 | 120 | 144 | 165 | 180 | 240 | 360 | 480 | 540;

export type ScreenResolution = "1920x1080" | "2560x1440" | "3840x2160" | "2560x1080" | "3440x1440" | "3840x1600";

export type GearSettings = {
  pollingRateHz: PollingRate;
  dpi: number;
  windowsSensitivity: number;
  screenResolution: ScreenResolution;
  refreshRateHz: RefreshRate;
  mouseId: string; // UUID
  mousepadId: string; // UUID
  skatesId: string; // UUID
};
