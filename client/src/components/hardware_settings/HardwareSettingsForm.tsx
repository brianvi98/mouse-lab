import type { SubmitEventHandler } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import SearchableDropdown from "../SearchableDropdown";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import type { DropdownOption } from "../SearchableDropdown";
import type { HardwareSettingsFormValues } from "./hardwareSettingsFormSchema";
import { useGetGearQuery } from "@/api/gearApi";
import { formEnums } from "@/mock_data/settings";

type HardwareSettingsFormProps = {
  control: Control<HardwareSettingsFormValues>;
  errors: FieldErrors<HardwareSettingsFormValues>;
  submitEnabled: boolean;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

function HardwareSettingsForm({ control, errors, submitEnabled, onSubmit }: HardwareSettingsFormProps) {
  const { data: gearData } = useGetGearQuery();

  const mouseList: DropdownOption[] = gearData?.data?.mice.map((m) => ({ label: m.fullName, value: m.id })) ?? [];
  const mousepadList: DropdownOption[] =
    gearData?.data?.mousepads.map((m) => ({ label: m.fullName, value: m.id })) ?? [];
  const skatesList: DropdownOption[] = gearData?.data?.skates.map((m) => ({ label: m.fullName, value: m.id })) ?? [];

  return (
    <form className="flex justify-center" onSubmit={onSubmit} noValidate>
      <Card className="w-[90%] self-stretch">
        <CardHeader className="font-bold">GEAR SETTINGS</CardHeader>
        <div className="mx-3 grid grid-cols-3 gap-4">
          <div>
            <Controller
              name="mouse"
              control={control}
              render={({ field }) => (
                <SearchableDropdown header="Mouse" items={mouseList} value={field.value} onChange={field.onChange} />
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
                  header="Mouse Pad"
                  items={mousepadList}
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
                  header="Mouse Skates"
                  items={skatesList}
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
                  header="Polling Rate"
                  items={formEnums.pollingRate}
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
                  header="Screen Resolution"
                  items={formEnums.screenResolution}
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
                  header="Refresh Rate"
                  items={formEnums.refreshRate}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-destructive min-h-5 text-sm">{errors.refreshRate?.message}</p>
          </div>
        </div>
        <div className="mx-3 mt-4 flex justify-center">
          <Button type="submit" disabled={!submitEnabled}>
            Save settings
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default HardwareSettingsForm;
