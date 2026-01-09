import { Button } from "./button";

export function ActionButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 gap-2 font-medium px-2"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Button>
  );
}
