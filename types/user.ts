import { RuleGroupType } from "react-querybuilder";

export interface User {
  name: string;
  email: string;
  distinctId: string;
  updatedAt: string;
  country: string;
  region: string;
  city: string;
}

export interface UserStore {
  query: RuleGroupType;
  filteredUsers: User[];
  setQuery: (newQuery: RuleGroupType) => void;
}
