import { useValueEditorStore } from "@/hooks/useValueEditor";
import { ValueEditorProps } from "react-querybuilder";
import { DateRangeEditor } from "./DateRangeEditor";
import { useQueryBuilder } from "@/hooks/useQueryBuilder";
import { DefaultValueEditor } from "./DefaultValueEditor";
export function ValueEditor(props: ValueEditorProps) {
  console.log("🔍 ValueEditor props:", {
    field: props.field,
    fieldData: props.fieldData,
    value: props.value,
    operator: props.operator,
  });
  const { lastAddedRuleId, resetLastAddedRule } = useQueryBuilder();
  const { isDateField } = useValueEditorStore(
    props,
    lastAddedRuleId,
    resetLastAddedRule,
  );
  if (isDateField) {
    console.log("🔍 Rendering DateRangeEditor");
    return <DateRangeEditor {...props} />;
  }
  console.log("🔍 Rendering regular ValueEditor");
  return <DefaultValueEditor {...props} />;
}
