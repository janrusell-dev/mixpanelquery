import { OperatorSelectorProps } from "react-querybuilder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function OperatorSelector({
  options,
  value,
  handleOnChange,
}: OperatorSelectorProps) {
  const selectedOption = options.find((o: any) => o.name === value);
  const displayLabel = (selectedOption as any)?.label || value;

  return (
    <Select value={value} onValueChange={handleOnChange}>
      <SelectTrigger
        className="
           px-2 py-1  bg-gray-100 border-transparent rounded-sm font-semibold
          [&>svg]:hidden
          hover:border-indigo-600
        "
      >
        <SelectValue placeholder="Operator">{displayLabel}</SelectValue>
      </SelectTrigger>

      <SelectContent className="bg-white border-slate-200 shadow-xl min-w-37.5">
        {options.map((opt: any) => (
          <SelectItem
            key={opt.name}
            value={opt.name}
            className="text-sm font-semibold focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
