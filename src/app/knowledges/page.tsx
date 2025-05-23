"use client";

import { SidebarClient } from "@/components/layout/Sidebar";
import { KnowledgeTable } from "./__partials__/KnowledgeTable";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { PermissionGate } from "@/components/permission-gate/PermissionGate";
import { PERMISSIONS } from "@/lib/auth/permissions";

export default function KnowledgesPage() {
  const router = useRouter();

  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            {
              title: "Pengetahuan",
            },
            {
              title: "Daftar Pengetahuan",
              href: "/knowledges",
            },
          ]}
          style={{ marginBottom: 24 }}
        />
        <PermissionGate permission={PERMISSIONS.CREATE_KNOWLEDGE}>
          <Button
            type="primary"
            style={{ marginBottom: 24 }}
            onClick={() => router.push("/knowledges/create")}
          >
            Tambah Pengetahuan
          </Button>
        </PermissionGate>
        <KnowledgeTable />
      </div>
    </SidebarClient>
  );
}
