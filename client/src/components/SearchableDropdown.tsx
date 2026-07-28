import { Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem } from "./ui/combobox";

export type DropdownOption = {
  label: string;
  value: string;
};

type SearchableDropdownProps = {
  header: string;
  items: DropdownOption[];
  value: string;
  onChange: (value: DropdownOption | null) => void;
};

function SearchableDropdown({ header, items, value, onChange }: SearchableDropdownProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="h-8 leading-4">{header}</div>

      <Combobox items={items} value={items.find((i) => i.value === value) ?? null} onValueChange={onChange}>
        <ComboboxInput placeholder="Select..." />
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
