import { useState } from "react";
import { useUserStore } from "./useUserStore";
import { generateID, RuleType } from "react-querybuilder";
import { fields } from "@/lib/fields";

export function useFilterStore() {
  const setQuery = useUserStore((state) => state.setQuery);
  const currentQuery = useUserStore((state) => state.query);
  const [isOpen, setIsOpen] = useState(false);
  const [field, setFieldState] = useState<string>("");
  const [operator, setOperator] = useState<string>("contains");
  const [value, setValue] = useState<string>("");
  const [propertySearch, setPropertySearch] = useState("");
  const [lastAddedRuleId, setLastAddedRuleId] = useState<string | null>(null);

  const filteredProperties = fields.filter((f) =>
    f.label.toLowerCase().includes(propertySearch.toLowerCase())
  );

  const setField = (newFieldname: string) => {
    const config = fields.find((f) => f.name === newFieldname);
    setFieldState(newFieldname);
    if (!config) return;

    const firstOperator = config.operators?.[0] as { name: string } | undefined;
    const defaultOperator = firstOperator?.name || "contains";

    setFieldState(newFieldname);
    setOperator(defaultOperator);

    setValue("");

    setQuery({
      ...currentQuery,
      rules: [
        ...currentQuery.rules,
        {
          id: generateID(),
          field: newFieldname,
          operator: defaultOperator,
          value: "",
        } as RuleType,
      ],
    });
    setLastAddedRuleId(generateID());
    setIsOpen(false);
    // Reset search after applying
    setPropertySearch("");
  };

  const updateRule = (ruleId: string, updates: Partial<RuleType>) => {
    setQuery({
      ...currentQuery,
      rules: currentQuery.rules.map((rule) =>
        "id" in rule && rule.id === ruleId ? { ...rule, ...updates } : rule
      ),
    });
  };

  const addGroup = () => {
    setQuery({
      ...currentQuery,
      rules: [
        ...currentQuery.rules,
        {
          id: generateID(),
          combinator: "and",
          rules: [],
        },
      ],
    });
  };
  const clearDraft = () => {
    setFieldState("");
    setValue("");
    setPropertySearch("");
  };

  const clearAll = () => {
    setQuery({ combinator: "and", rules: [] });
    clearDraft();
  };

  const resetLastAddedRule = () => {
    setLastAddedRuleId(null);
  };

  return {
    draft: { field, operator, value },
    setField,
    setOperator,
    setValue,
    propertySearch,
    setPropertySearch,
    clearDraft,
    setIsOpen,
    hasFilter: currentQuery.rules.length > 0,
    filteredProperties,
    isOpen,
    clearAll,
    addGroup,
    lastAddedRuleId,
    resetLastAddedRule,
    updateRule,
  };
}
