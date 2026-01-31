"use client";

import { fields } from "../lib/fields";
import QueryBuilder, { ActionProps } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { useQueryStore } from "@/store/useQueryStore";
import { FilterMenu } from "./FilterMenu";
import { Copy, MoreVertical, Trash } from "lucide-react";
import { ValueEditor } from "./ValueEditor";
import { FieldSelector } from "./FieldSelector";
import { OperatorSelector } from "./OperatorSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CombinatorSelector } from "./CombinatorSelector";

export function QueryBuilderComponent() {
  const query = useQueryStore((state) => state.query);
  const setQuery = useQueryStore((state) => state.setQuery);
  const setActiveGroupId = useQueryStore((state) => state.setActiveGroupId);

  return (
    <div className="p-6 rounded-xl border border-gray-200 bg-white overflow-visible">
      <div className="flex items-center gap-2  group cursor-default">
        <p className="uppercase text-slate-400 font-bold text-[10px] tracking-widest">
          ALL USERS
        </p>
      </div>
      <div className=" flex flex-col gap-2">
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={setQuery}
          showCombinatorsBetweenRules={true}
          controlElements={{
            fieldSelector: FieldSelector,
            valueEditor: ValueEditor,
            addGroupAction: () => null,
            addRuleAction: ({ path }: ActionProps) => {
              let targetGroupId: string | null = null;
              if (path.length > 0) {
                let current: any = query;
                for (let i = 0; i < path.length; i++) {
                  if (i === path.length - 1) {
                    current = current.rules[path[i]];
                    if ("rules" in current) {
                      targetGroupId = current.id;
                    }
                  } else {
                    current = current.rules[path[i]];
                  }
                }
              }

              return <FilterMenu targetGroupId={targetGroupId} />;
            },
            operatorSelector: OperatorSelector,
            combinatorSelector: CombinatorSelector,
            removeGroupAction: ({ handleOnClick }: ActionProps) => (
              <button
                onClick={(e) => {
                  handleOnClick(e);
                  setActiveGroupId(null);
                }}
                className="ml-10 p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Trash className="h-4 w-4 hover:text-red-600" />
              </button>
            ),
            removeRuleAction: ({ handleOnClick }: ActionProps) => (
              <div className="flex items-center gap-1 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  onClick={handleOnClick}
                  className="ml-auto p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Trash className="h-4 w-4 hover:text-red-600" />
                </button>
              </div>
            ),
          }}
          controlClassnames={{
            queryBuilder: "bg-transparent p-0 border-none",
            ruleGroup:
              "flex flex-col gap-2 border-2 border-slate-200 bg-indigo-50 rounded-lg p-4 my-2",
            combinators: "first:hidden",
            addRule: "w-fit",
            body: "flex flex-col gap-4",
          }}
        />
      </div>
    </div>
  );
}
