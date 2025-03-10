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
import {
  KNOWLEDGE_QUERY_KEY,
  useDeleteKnowledge,
  useGetAllKnowledge,
} from "@/services/queries/knowledge";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IKnowledge } from "@/types/knowledge";
import { useMemo, useState } from "react";
import { SorterResult } from "antd/es/table/interface";
import { PermissionGate } from "@/components/permission-gate/PermissionGate";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { usePermission } from "@/utils/hooks/usePermission";
export function KnowledgeTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteKnowledge } = useDeleteKnowledge();
  const { confirm } = Modal;

  const { data: knowledgesData, isLoading } = useGetAllKnowledge({
    page,
    limit: pageSize,
  });

  const hasUpdateKnowledge = usePermission(PERMISSIONS.UPDATE_KNOWLEDGE);
  const hasDeleteKnowledge = usePermission(PERMISSIONS.DELETE_KNOWLEDGE);

  const handleEditKnowledge = (record: IKnowledge) => {
    router.push(`/knowledges/${record.id}`);
  };

  const handleDeleteKnowledge = (record: IKnowledge) => {
    confirm({
      title: "Hapus Pengetahuan",
      icon: <ExclamationCircleFilled />,
      content: `Apakah Anda yakin ingin menghapus pengetahuan ini?`,
      okText: "Hapus",
      okType: "danger",
      cancelText: "Batal",
      onOk() {
        deleteKnowledge(
          { id: record.id },
          {
            onSuccess: () => {
              message.success("Pengetahuan berhasil dihapus");
              queryClient.invalidateQueries({
                queryKey: [KNOWLEDGE_QUERY_KEY.getAll],
              });
            },
            onError: () => {
              message.error("Gagal menghapus pengetahuan");
            },
          }
        );
      },
    });
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<IKnowledge> | SorterResult<IKnowledge>[]
  ) => {
    setPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
  };

  const columns: ColumnsType<IKnowledge> = [
    {
      title: "Kata Kunci",
      dataIndex: "keywords",
      key: "keywords",
      render: (keywords) => keywords.join(", "),
      width: "15%",
    },
    {
      title: "Jawaban",
      dataIndex: "answer",
      key: "answer",
      width: "60%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      width: "15%",
    },
    {
      title: "Tanggal Dibuat",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      render: (date) => format(new Date(date), "dd MMMM yyyy", { locale: id }),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <PermissionGate permission={PERMISSIONS.UPDATE_KNOWLEDGE}>
            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditKnowledge(record)}
              />
            </Tooltip>
          </PermissionGate>
          <PermissionGate permission={PERMISSIONS.DELETE_KNOWLEDGE}>
            <Tooltip title="Hapus">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteKnowledge(record)}
              />
            </Tooltip>
          </PermissionGate>
        </Space>
      ),
      hidden: !hasUpdateKnowledge && !hasDeleteKnowledge,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={knowledgesData?.data ?? []}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: pageSize,
        total: knowledgesData?.meta?.total ?? 0,
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
