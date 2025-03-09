"use client";

import { SidebarClient } from "@/components/layout/Sidebar";
import { Breadcrumb, Button, message, Modal } from "antd";
import { UserTable } from "./__partials__/UserTable";
import { UserData } from "@/types/user";
import { useDeleteUser, useGetAllUsers } from "@/services/queries/user";
import { useRouter } from "next/navigation";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";

export default function UsersPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useGetAllUsers({
    page: 1,
    limit: 10,
  });

  const { mutate: deleteUser } = useDeleteUser();
  const { confirm } = Modal;

  const handleEditUser = (record: UserData) => {
    router.push(`/users/${record.id}`);
  };

  const handleDeleteUser = (record: UserData) => {
    confirm({
      title: "Hapus Pengguna",
      icon: <ExclamationCircleFilled />,
      content: `Apakah Anda yakin ingin menghapus pengguna "${record.name}"?`,
      okText: "Hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk() {
        deleteUser(
          { id: record.id },
          {
            onSuccess: () => {
              message.success("Pengguna berhasil dihapus");
              queryClient.invalidateQueries({ queryKey: ["users"] });
            },
            onError: () => {
              message.error("Gagal menghapus pengguna");
            },
          }
        );
      },
    });
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
