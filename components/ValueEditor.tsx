import { useValueEditorStore } from "@/hooks/useValueEditor";
import { ValueEditorProps } from "react-querybuilder";
import { DateRangeEditor } from "./DateRangeEditor";
import { useQueryBuilder } from "@/hooks/useQueryBuilder";
import { DefaultValueEditor } from "./DefaultValueEditor";
export function ValueEditor(props: ValueEditorProps) {
  const { lastAddedRuleId, resetLastAddedRule } = useQueryBuilder();
  const { isDateField } = useValueEditorStore(
    props,
    lastAddedRuleId,
    resetLastAddedRule,
  );
  if (isDateField) {
    return <DateRangeEditor {...props} />;
  }
  return <DefaultValueEditor {...props} />;
}
