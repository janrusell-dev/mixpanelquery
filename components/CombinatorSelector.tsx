import { CombinatorSelectorProps } from "react-querybuilder";

export const CombinatorSelector = ({
  value,
  handleOnChange,
  path,
}: CombinatorSelectorProps) => {
  const toggle = () => handleOnChange(value === "and" ? "or" : "and");

  return (
    <div className="flex items-center my-1 ml-1">
      <button
        type="button"
        onClick={toggle}
        className={`text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded transition-colors ${
          value === "and"
            ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
            : "text-amber-600 bg-amber-50 hover:bg-amber-100"
        }`}
      >
        {value}
      </button>
    </div>
  );
};
