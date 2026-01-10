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
import { ValueEditor } from "./ValueEditor";
import { Combinator } from "./Combinator";
import { FieldSelector } from "./FieldSelector";
import { OperatorSelector } from "./OperatorSelector";

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
              fieldSelector: FieldSelector,
              valueEditor: ValueEditor,
              addRuleAction: () => null,
              addGroupAction: () => null,
              operatorSelector: OperatorSelector,
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
              queryBuilder: "bg-transparent p-0 border-none",
              ruleGroup:
                "border-l-2 border-slate-200 ml-6 pl-4 my-4 first:ml-0 first:pl-0 first:border-none",
              rule: "flex items-center gap-2 py-1 w-full max-w-2xl group",
              combinators: "first:hidden",
            }}
          />
        </div>
      )}
      <FilterMenu />
    </div>
  );
}
