import { RuleGroupType, RuleType } from "react-querybuilder";

export interface QueryStore {
  query: RuleGroupType;
  setQuery: (newQuery: RuleGroupType) => void;
  addRule: (rule: RuleType, targetGroupId?: string | null) => void;
  updateRule: (ruleId: string, updates: Partial<RuleType>) => void;
  duplicateRule: (rule: RuleType | RuleGroupType) => void;
  addGroup: (parentGroupId: string | null) => void;
  clearQuery: () => void;
  lastCreatedGroupId: string | null;
}
