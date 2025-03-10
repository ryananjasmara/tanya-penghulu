"use client";

import { Table, Space, Button, Tag, Tooltip, Modal, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { IUser } from "@/types/user";
import {
  useDeleteUser,
  useGetAllUsers,
  USER_QUERY_KEY,
} from "@/services/queries/user";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SorterResult } from "antd/es/table/interface";
export function UserTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteUser } = useDeleteUser();
  const { confirm } = Modal;

  const { data: usersData, isLoading } = useGetAllUsers({
    page,
    limit: pageSize,
  });

  const handleEditUser = (record: IUser) => {
    router.push(`/users/${record.id}`);
  };

  const handleDeleteUser = (record: IUser) => {
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
              queryClient.invalidateQueries({
                queryKey: [USER_QUERY_KEY.getAll],
              });
            },
            onError: () => {
              message.error("Gagal menghapus pengguna");
            },
          }
        );
      },
    });
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<IUser> | SorterResult<IUser>[]
  ) => {
    setPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
  };

  const columns: ColumnsType<IUser> = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "ADMIN" ? "blue" : "green"}>{role}</Tag>
      ),
      filters: [
        { text: "Admin", value: "ADMIN" },
        { text: "Staff", value: "STAFF" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? "Aktif" : "Nonaktif"}
        </Tag>
      ),
    },
    {
      title: "Tanggal Dibuat",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => format(new Date(date), "dd MMMM yyyy", { locale: id }),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditUser(record)}
            />
          </Tooltip>
          <Tooltip title="Hapus">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={usersData?.data ?? []}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: pageSize,
        total: usersData?.meta?.total ?? 0,
        showSizeChanger: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} dari ${total} items`,
        simple: true,
        defaultPageSize: 10,
        pageSizeOptions: ["5", "10", "20", "50"],
      }}
      onChange={handleTableChange}
      scroll={{
        x: 1200,
      }}
    />
  );
}
