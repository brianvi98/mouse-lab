import { useState, useEffect } from "react";
import SearchableDropdown from "../SearchableDropdown";
import { Input } from "../ui/input";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { gearData } from "@/mock_data/settings";

function HardwareSettingsForm() {
  const [form, setForm] = useState({
    mouse: null as string | null,
    mousePad: null as string | null,
    mouseSkates: null as string | null,
    pollingRate: null as string | null,
    dpi: 800,
    windowsSensitivity: 11,
    screenResolution: null as string | null,
    refreshRate: null as string | null,
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <Card className="w-full self-stretch">
      <CardHeader className="font-bold">GEAR SETTINGS</CardHeader>

      <div className="grid grid-cols-3 gap-4 mx-3">
        <SearchableDropdown
          label="Mouse"
          items={gearData.mice}
          value={form.mouse}
          onChange={(v) => setForm((p) => ({ ...p, mouse: v }))}
        />

        <SearchableDropdown
          label="Mouse Pad"
          items={gearData.mousepads}
          value={form.mousePad}
          onChange={(v) => setForm((p) => ({ ...p, mousePad: v }))}
        />

        <SearchableDropdown
          label="Mouse Skates"
          items={gearData.mouseskates}
          value={form.mouseSkates}
          onChange={(v) => setForm((p) => ({ ...p, mouseSkates: v }))}
        />

        <SearchableDropdown
          label="Polling Rate"
          items={gearData.pollingRate}
          value={form.pollingRate}
          onChange={(v) => setForm((p) => ({ ...p, pollingRate: v }))}
        />

        <div className="flex flex-col gap-1">
          <div>DPI</div>
          <Input
            className="[appearance:textfield] 
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={form.dpi}
            onChange={(e) =>
              setForm((p) => ({ ...p, dpi: Number(e.target.value) }))
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <div>Windows Sensitivity</div>
          <Input
            className="[appearance:textfield] 
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={form.windowsSensitivity}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                windowsSensitivity: Number(e.target.value),
              }))
            }
          />
        </div>

        <SearchableDropdown
          label="Screen Resolution"
          items={gearData.screenResolution}
          value={form.screenResolution}
          onChange={(v) => setForm((p) => ({ ...p, screenResolution: v }))}
        />

        <SearchableDropdown
          label="Refresh Rate"
          items={gearData.refreshRate}
          value={form.refreshRate}
          onChange={(v) => setForm((p) => ({ ...p, refreshRate: v }))}
        />
      </div>
    </Card>
  );
}

export default HardwareSettingsForm;
