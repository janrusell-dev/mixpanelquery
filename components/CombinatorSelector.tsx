import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CombinatorSelectorProps } from "react-querybuilder";

export const CombinatorSelector = ({
  value,
  handleOnChange,
}: CombinatorSelectorProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`text-[11px] font-black tracking-widest px-2 py-0.5 rounded transition-colors ${
            value === "and"
              ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              : "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
          }`}
        >
          {value}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-1 w-24">
        <div className="flex flex-col space-y-1">
          <button
            type="button"
            onClick={() => handleOnChange("and")}
            className={`text-[11px] font-bold  px-2 py-1 rounded transition-colors ${
              value === "and"
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-indigo-50"
            }`}
          >
            and
          </button>
          <button
            type="button"
            onClick={() => handleOnChange("or")}
            className={`text-[11px] font-bold  px-2 py-1 rounded transition-colors ${
              value === "or"
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-indigo-50"
            }`}
          >
            or
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
