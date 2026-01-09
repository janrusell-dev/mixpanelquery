"use client";

import { fields } from "../lib/fields";
import QueryBuilder, {
  FieldSelectorProps,
  OperatorSelectorProps,
  ActionProps,
} from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { useUserStore } from "@/store/useUserStore";
import { FilterMenu } from "./FilterMenu";
import { User, ChevronRight, X, Trash } from "lucide-react";
import { CustomValueEditor } from "./CustomValueEditor";
import { CustomCombinator } from "./CustomCombinator";

const CustomFieldSelector = ({ options, value }: FieldSelectorProps) => (
  <div className="flex items-center gap-1.5 text-slate-500 mr-1">
    <div className="bg-slate-200 p-1 rounded">
      <User className="h-3 w-3 text-slate-600" />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
      User
    </span>
    <ChevronRight className="h-3 w-3 text-slate-300" />
    <span className="font-bold text-slate-900">
      {options.find((o) => o.label === value)?.label}
    </span>
  </div>
);

export function QueryBuilderComponent() {
  const query = useUserStore((state) => state.query);
  const setQuery = useUserStore((state) => state.setQuery);

  return (
    <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4 group cursor-default">
        <p className="uppercase text-slate-400 font-bold text-[10px] tracking-widest">
          ALL USERS
        </p>
      </div>

      {query.rules.length > 0 && (
        <div className="mb-4 flex flex-col gap-2">
          <QueryBuilder
            fields={fields}
            query={query}
            onQueryChange={setQuery}
            controlElements={{
              combinatorSelector: CustomCombinator,
              fieldSelector: CustomFieldSelector,
              valueEditor: CustomValueEditor,
              addRuleAction: () => null,
              addGroupAction: () => null,
              removeRuleAction: ({ handleOnClick }: ActionProps) => (
                <button
                  onClick={handleOnClick}
                  className="ml-auto p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Trash className="h-4 w-4 hover:text-red-600" />
                </button>
              ),
            }}
            controlClassnames={{
              queryBuilder: "bg-transparent p-0 border-none shadow-none",
              rule: "flex items-center gap-2 py-1 bg-transparent border-none w-full max-w-2xl group",
              ruleGroup:
                "data-[level='1']:bg-white data-[level='1']:border data-[level='1']:border-slate-200 data-[level='1']:rounded-xl data-[level='1']:p-4 data-[level='1']:shadow-sm data-[level='1']:mb-2 data-[level='0']:bg-transparent",
            }}
          />
        </div>
      )}
      <FilterMenu />
    </div>
  );
}
