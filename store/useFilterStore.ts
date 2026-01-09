import { useMemo, useState } from "react";
import { useUserStore } from "./useUserStore";
import { RuleType } from "react-querybuilder";
import { fields } from "@/lib/fields";

export function useFilterStore() {
  const setQuery = useUserStore((state) => state.setQuery);
  const currentQuery = useUserStore((state) => state.query);
  const [isOpen, setIsOpen] = useState(false);
  const [field, setFieldState] = useState<string>("");
  const [operator, setOperator] = useState<string>("contains");
  const [value, setValue] = useState<string>("");
  const [propertySearch, setPropertySearch] = useState("");

  const currentFieldConfig = useMemo(() => {
    return fields.find((f) => f.name === field);
  }, [field]);

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
          field: newFieldname,
          operator: defaultOperator,
          value: "",
        } as RuleType,
      ],
    });

    setIsOpen(false);
    // Reset search after applying
    setPropertySearch("");
  };

  const applyFilter = () => {
    if (!field) return;
    setPropertySearch("");
  };

  const removeFilter = (index: number) => {
    const newRules = currentQuery.rules.filter((_, i) => i !== index);
    setQuery({ ...currentQuery, rules: newRules });
  };

  const clearDraft = () => {
    setFieldState("");
    setValue("");
    setPropertySearch("");
  };

  return {
    draft: { field, operator, value },
    setField,
    setOperator,
    setValue,
    applyFilter,
    removeFilter,
    propertySearch,
    setPropertySearch,
    currentFieldConfig,
    clearDraft,
    setIsOpen,
    hasFilter: currentQuery.rules.length > 0,
    filteredProperties,
    isOpen,
  };
}
