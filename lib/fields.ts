import { Field } from "react-querybuilder";

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
    name: "country",
    label: "Country",
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
    name: "region",
    label: "Region",
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
    name: "city",
    label: "City",
    type: "text",
    operators: [
      { name: "=", label: "Is" },
      { name: "!=", label: "Is not" },
      { name: "contains", label: "Contains" },
      { name: "doesNotContain", label: "Does not contain" },
      { name: "isNotSet", label: "Is not set" },
    ],
  },
];
