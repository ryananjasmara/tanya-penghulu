"use client";

import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetAllLogs } from "@/services/queries";
import { useState } from "react";
import type { SorterResult } from "antd/es/table/interface";
import { ILog } from "@/types/logs";

export function LogTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: logsData, isLoading } = useGetAllLogs({
    page,
    limit: pageSize,
  });

  const columns: ColumnsType<ILog> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      width: "15%",
      render: (user) => user?.name ?? "-",
    },
    {
      title: "Aksi",
      dataIndex: "action",
      key: "action",
      width: "15%",
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      width: "25%",
    },
    {
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: "25%",
    },
    {
      title: "Tanggal Dibuat",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => format(new Date(date), "dd MMMM yyyy", { locale: id }),
      width: "20%",
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<ILog> | SorterResult<ILog>[]
  ) => {
    setPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
  };

  return (
    <Table
      columns={columns}
      dataSource={logsData?.data ?? []}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: pageSize,
        total: logsData?.meta?.total ?? 0,
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
