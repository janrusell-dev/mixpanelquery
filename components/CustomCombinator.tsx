import { CombinatorSelectorProps } from "react-querybuilder";
import { Button } from "./ui/button";

export const CustomCombinator = ({
  value,
  handleOnChange,
}: CombinatorSelectorProps) => {
  const toggle = () => handleOnChange(value === "and" ? "or" : "and");
  const isOr = value === "or";

  return (
    <div
      className={`relative w-full flex justify-center items-center transition-all duration-300 
      ${isOr ? "h-20 my-4" : "h-8 -my-4"}`} // OR expands the gap, AND collapses it
    >
      {/* The Connector Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 z-0" />

      <Button
        variant="outline"
        onClick={toggle}
        className={`z-10 h-6 px-2 text-[10px] font-bold uppercase shadow-sm rounded-md transition-all
          ${
            isOr
              ? "border-amber-200 text-amber-600 bg-amber-50"
              : "border-indigo-200 text-indigo-600 bg-white"
          }`}
      >
        {value}
      </Button>
    </div>
  );
};
