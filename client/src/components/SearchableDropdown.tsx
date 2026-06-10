import { Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem } from "./ui/combobox";

export type DropdownOption = {
  label: string;
  value: string;
};

type SearchableDropdownProps = {
  label: string;
  items: DropdownOption[];
  value: string;
  onChange: (value: string | null) => void;
};

function SearchableDropdown({ label, items, value, onChange }: SearchableDropdownProps) {
  const selectedLabel = items.find((i) => i.value === value)?.label ?? "";

  return (
    <div className="flex w-full flex-col gap-1">
      <div>{label}</div>

      <Combobox items={items} value={value ?? ""} onValueChange={onChange}>
        <ComboboxInput value={selectedLabel} placeholder="Select..." />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export default SearchableDropdown;
