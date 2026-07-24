export type Option = {
  label: string;
  value: string;
};

export const formEnums: Record<string, Option[]> = {
  pollingRate: [
    { label: "125 Hz", value: "125" },
    { label: "250 Hz", value: "250" },
    { label: "500 Hz", value: "500" },
    { label: "1000 Hz", value: "1000" },
    { label: "2000 Hz", value: "2000" },
    { label: "4000 Hz", value: "4000" },
    { label: "8000 Hz", value: "8000" },
  ],

  screenResolution: [
    { label: "1920 x 1080", value: "1920x1080" },
    { label: "2560 x 1440", value: "2560x1440" },
    { label: "3840 x 2160", value: "3840x2160" },
    { label: "2560 x 1080", value: "2560x1080" },
    { label: "3440 x 1440", value: "3440x1440" },
    { label: "3840 x 1600", value: "3840x1600" },
  ],

  refreshRate: [
    { label: "60 Hz", value: "60" },
    { label: "75 Hz", value: "75" },
    { label: "100 Hz", value: "100" },
    { label: "120 Hz", value: "120" },
    { label: "144 Hz", value: "144" },
    { label: "165 Hz", value: "165" },
    { label: "180 Hz", value: "180" },
    { label: "240 Hz", value: "240" },
    { label: "360 Hz", value: "360" },
    { label: "480 Hz", value: "480" },
    { label: "540 Hz", value: "540" },
  ],
};
