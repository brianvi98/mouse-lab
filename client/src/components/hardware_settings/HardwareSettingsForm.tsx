import type { FormEventHandler, SubmitEventHandler } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import SearchableDropdown from "../SearchableDropdown";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { gearData } from "@/mock_data/settings";
import type { HardwareSettingsFormValues } from "./hardwareSettingsFormSchema";

type HardwareSettingsFormProps = {
  control: Control<HardwareSettingsFormValues>;
  errors: FieldErrors<HardwareSettingsFormValues>;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

function HardwareSettingsForm({ control, errors, onSubmit }: HardwareSettingsFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Card className="w-full self-stretch">
        <CardHeader className="font-bold">GEAR SETTINGS</CardHeader>

        <div className="mx-3 grid grid-cols-3 gap-4">
          <div>
            <Controller
              name="mouse"
              control={control}
              render={({ field }) => (
                <SearchableDropdown label="Mouse" items={gearData.mice} value={field.value} onChange={field.onChange} />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.mouse?.message}</p>
          </div>

          <div>
            <Controller
              name="mousePad"
              control={control}
              render={({ field }) => (
                <SearchableDropdown
                  label="Mouse Pad"
                  items={gearData.mousepads}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.mousePad?.message}</p>
          </div>

          <div>
            <Controller
              name="mouseSkates"
              control={control}
              render={({ field }) => (
                <SearchableDropdown
                  label="Mouse Skates"
                  items={gearData.mouseskates}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.mouseSkates?.message}</p>
          </div>

          <div>
            <Controller
              name="pollingRate"
              control={control}
              render={({ field }) => (
                <SearchableDropdown
                  label="Polling Rate"
                  items={gearData.pollingRate}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.pollingRate?.message}</p>
          </div>

          <div className="flex flex-col gap-1">
            <div>DPI</div>
            <Controller
              name="dpi"
              control={control}
              render={({ field }) => (
                <Input
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.dpi?.message}</p>
          </div>

          <div className="flex flex-col gap-1">
            <div>Windows Sensitivity</div>
            <Controller
              name="windowsSensitivity"
              control={control}
              render={({ field }) => (
                <Input
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.windowsSensitivity?.message}</p>
          </div>

          <div>
            <Controller
              name="screenResolution"
              control={control}
              render={({ field }) => (
                <SearchableDropdown
                  label="Screen Resolution"
                  items={gearData.screenResolution}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.screenResolution?.message}</p>
          </div>

          <div>
            <Controller
              name="refreshRate"
              control={control}
              render={({ field }) => (
                <SearchableDropdown
                  label="Refresh Rate"
                  items={gearData.refreshRate}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.refreshRate?.message}</p>
          </div>
        </div>

        <div className="mx-3 mt-4 flex justify-center">
          <Button type="submit">Save settings</Button>
        </div>
      </Card>
    </form>
  );
}

export default HardwareSettingsForm;
