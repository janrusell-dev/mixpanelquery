"use client";

import { TitleArea } from "@/components/TitleArea";
import { QueryBuilderComponent } from "@/components/QueryBuilder";
import { UserTable } from "@/components/UserTable";
import { FilterBar } from "@/components/FilterBar";
import { QueryEntry } from "@/components/QueryEntry";

export default function Home() {
  return (
    <div className="px-10 space-y-4">
      <TitleArea />
      <FilterBar />

      <QueryBuilderComponent />

      <QueryEntry />
      <UserTable />
    </div>
  );
}
