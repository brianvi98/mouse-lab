import * as z from "zod";

export const hardwareSettingsFormSchema = z.object({
  mouse: z.string().min(1, "Please choose a mouse"),
  mousePad: z.string().min(1, "Please choose a mouse pad"),
  mouseSkates: z.string().min(1, "Please choose a mouse skate"),
  pollingRate: z.string().min(1, "Please choose a polling rate"),
  dpi: z.number().min(1, "Please enter DPI"),
  windowsSensitivity: z.number().min(1, "Please enter sensitivity"),
  screenResolution: z.string().min(1, "Please choose a screen resolution"),
  refreshRate: z.string().min(1, "Please choose a refresh rate"),
});

export type HardwareSettingsFormValues = z.infer<typeof hardwareSettingsFormSchema>;

export const hardwareSettingsFormDefaultValues: HardwareSettingsFormValues = {
  mouse: "",
  mousePad: "",
  mouseSkates: "",
  pollingRate: "",
  dpi: 800,
  windowsSensitivity: 11,
  screenResolution: "",
  refreshRate: "",
};
