import { Field } from "react-querybuilder";
import { dummyUsers } from "./dummy-data";

// Helper to get unique values for a dropdown
const getUniqueValues = (key: keyof (typeof dummyUsers)[0]) => {
  const unique = Array.from(new Set(dummyUsers.map((user) => user[key])));
  return unique
    .filter(Boolean)
    .sort()
    .map((val) => ({ name: val, label: val }));
};

export const fields: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    operators: [
      { name: "=", label: "Is" },
      { name: "!=", label: "Is not" },
      { name: "contains", label: "Contains" },
      { name: "doesNotContain", label: "Does not contain" },
      { name: "isNotSet", label: "Is not set" },
    ],
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    operators: [
      { name: "=", label: "Is" },
      { name: "!=", label: "Is not" },
      { name: "contains", label: "Contains" },
      { name: "doesNotContain", label: "Does not contain" },
      { name: "isNotSet", label: "Is not set" },
    ],
  },
  {
    name: "distinctId",
    label: "Distinct ID",
    type: "text",
    operators: [
      { name: "=", label: "Is" },
      { name: "!=", label: "Is not" },
      { name: "contains", label: "Contains" },
      { name: "doesNotContain", label: "Does not contain" },
      { name: "isNotSet", label: "Is not set" },
    ],
  },
  {
    name: "updatedAt",
    label: "Updated at",
    type: "date",
    operators: [
      { name: "last", label: "Last" },
      { name: "notInLast", label: "Not in the last" },
      { name: "between", label: "Between" },
      { name: "notBetween", label: "Not between" },
      { name: "on", label: "On" },
      { name: "notOn", label: "Not on" },
      { name: "beforeLast", label: "Before the last" },
      { name: "before", label: "Before" },
      { name: "since", label: "Since" },
      { name: "inNext", label: "In the next" },
    ],
  },
  {
    name: "countryCode",
    label: "Country Code",
    type: "text",
    values: getUniqueValues("country"),
    operators: [
      { name: "=", label: "Is" },
      { name: "!=", label: "Is not" },
      { name: "contains", label: "Contains" },
      { name: "doesNotContain", label: "Does not contain" },
      { name: "isNotSet", label: "Is not set" },
    ],
  },
  {
    name: "region",
    label: "Region",
    type: "text",
    values: getUniqueValues("region"),
    operators: [
      { name: "=", label: "Is" },
      { name: "!=", label: "Is not" },
      { name: "contains", label: "Contains" },
      { name: "doesNotContain", label: "Does not contain" },
      { name: "isNotSet", label: "Is not set" },
    ],
  },
];
