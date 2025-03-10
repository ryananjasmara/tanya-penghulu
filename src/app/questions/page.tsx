"use client";

import { SidebarClient } from "@/components/layout/Sidebar";
import { useGetAllMissingAnswers } from "@/services/queries/missing-answer";
import { QuestionTable } from "./__partials__/QuestionTable";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

export default function QuestionsPage() {
  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Pertanyaan", href: "/questions" },
            { title: "Daftar Pertanyaan", href: "/questions" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <QuestionTable />
      </div>
    </SidebarClient>
  );
}
