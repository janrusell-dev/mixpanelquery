import { useState } from "react";
import { generateID, RuleType } from "react-querybuilder";
import { fields } from "@/lib/fields";
import { useQueryStore } from "@/store/useQueryStore";

export function useFilterBuilder() {
  const query = useQueryStore((state) => state.query);
  const addRuleToStore = useQueryStore((state) => state.addRule);
  const addGroupToStore = useQueryStore((state) => state.addGroup);
  const updateRuleInStore = useQueryStore((state) => state.updateRule);
  const duplicateRuleInStore = useQueryStore((state) => state.duplicateRule);
  const clearQuery = useQueryStore((state) => state.clearQuery);
  const activeGroupId = useQueryStore((state) => state.activeGroupId);

  const [isOpen, setIsOpen] = useState(false);
  const [field, setFieldState] = useState("");
  const [operator, setOperator] = useState("contains");
  const [value, setValue] = useState("");

  const [propertySearch, setPropertySearch] = useState("");
  const [lastAddedRuleId, setLastAddedRuleId] = useState<string | null>(null);
  const [hoveredProperty, setHoveredProperty] = useState<{
    name: string;
    label: string;
    description?: string;
  } | null>(null);

  const filteredProperties = fields.filter((f) =>
    f.label.toLowerCase().includes(propertySearch.toLowerCase()),
  );

  const setField = (newFieldname: string, targetGroupId?: string | null) => {
    const config = fields.find((f) => f.name === newFieldname);
    setFieldState(newFieldname);

    if (!config) return;

    const firstOperator = config.operators?.[0] as { name: string } | undefined;
    const defaultOperator = firstOperator?.name || "contains";

    setOperator(defaultOperator);
    setValue("");

    const groupId = targetGroupId !== undefined ? targetGroupId : activeGroupId;

    const newRuleId = generateID();

    addRuleToStore(
      {
        id: newRuleId,
        field: newFieldname,
        operator: defaultOperator,
        value: "",
      } as RuleType,
      groupId,
    );

    setLastAddedRuleId(newRuleId);
    setIsOpen(false);
    setPropertySearch("");
  };

  const clearDraft = () => {
    setFieldState("");
    setValue("");
    setPropertySearch("");
  };

  const clearAll = () => {
    clearQuery();
    clearDraft();
  };

  const resetLastAddedRule = () => {
    setLastAddedRuleId(null);
  };

  const hasIncompleteRules = query.rules.some((rule) => {
    if ("value" in rule) {
      return (
        !rule.value || rule.value === "" || rule.value === "Select value..."
      );
    }
    return false;
  });

  const hasFilter = query.rules.length > 0;

  return {
    draft: { field, operator, value },
    setField,
    setOperator,
    setValue,
    propertySearch,
    setPropertySearch,
    clearDraft,
    isOpen,
    setIsOpen,
    lastAddedRuleId,
    resetLastAddedRule,
    activeGroupId,
    hasFilter,
    filteredProperties,
    hasIncompleteRules,
    clearAll,
    addGroup: addGroupToStore,
    updateRule: updateRuleInStore,
    duplicateRule: duplicateRuleInStore,
    hoveredProperty,
    setHoveredProperty,
  };
}
