"use client";

import { SidebarClient } from "@/components/layout/Sidebar";
import { Button } from "antd";
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
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => router.push("/users/create")}
      >
        Add User
      </Button>
      <UserTable
        data={users ?? []}
        loading={isLoading}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </SidebarClient>
  );
}
