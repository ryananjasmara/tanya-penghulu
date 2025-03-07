"use client";

import { Table, Space, Button, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { UserData } from "@/types/user";

interface UserTableProps {
  data: UserData[];
  loading?: boolean;
  onEdit?: (record: UserData) => void;
  onDelete?: (record: UserData) => void;
}

export function UserTable({ data, loading, onEdit, onDelete }: UserTableProps) {
  const columns: ColumnsType<UserData> = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
              onClick={() => onEdit?.(record)}
            />
          </Tooltip>
          <Tooltip title="Hapus">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete?.(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{
        showSizeChanger: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} dari ${total} items`,
      }}
      scroll={{
        x: 1200,
      }}
    />
  );
}
