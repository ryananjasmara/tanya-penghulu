"use client";

import { SidebarClient } from "@/components/layout/Sidebar";
import { Breadcrumb, Button } from "antd";
import { UserTable } from "./__partials__/UserTable";
import { useRouter } from "next/navigation";
import { PermissionGate } from "@/components/permission-gate/PermissionGate";
import { PERMISSIONS } from "@/lib/auth/permissions";

export default function UsersPage() {
  const router = useRouter();

  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Pengguna" },
            { title: "Daftar Pengguna", href: "/users" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <PermissionGate permission={PERMISSIONS.CREATE_USER}>
          <Button
            type="primary"
            style={{ marginBottom: 24 }}
            onClick={() => router.push("/users/create")}
          >
            Tambah Pengguna
          </Button>
        </PermissionGate>
        <UserTable />
      </div>
    </SidebarClient>
  );
}
