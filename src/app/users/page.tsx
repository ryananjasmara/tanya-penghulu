"use client";

import { SidebarClient } from "@/components/layout/Sidebar";
import { Breadcrumb, Button } from "antd";
import { UserTable } from "./__partials__/UserTable";
import { UserData } from "@/types/user";
import { useGetAllUsers } from "@/services/queries/user";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const { data: users, isLoading } = useGetAllUsers({
    page: 1,
    limit: 10,
  });

  const handleEditUser = (record: UserData) => {
    console.log("Edit User", record);
  };

  const handleDeleteUser = (record: UserData) => {
    console.log("Delete User", record);
  };

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
        <Button
          type="primary"
          style={{ marginBottom: 24 }}
          onClick={() => router.push("/users/create")}
        >
          Tambah Pengguna
        </Button>
        <UserTable
          data={users ?? []}
          loading={isLoading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </SidebarClient>
  );
}
