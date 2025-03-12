"use client";

import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetAllVotes } from "@/services/queries";
import { useState } from "react";
import type { SorterResult } from "antd/es/table/interface";
import { IVote } from "@/types/vote";

export function ChatVoteTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: votesData, isLoading } = useGetAllVotes({
    page,
    limit: pageSize,
  });

  const columns: ColumnsType<IVote> = [
    {
      title: "Pertanyaan",
      dataIndex: "question",
      key: "question",
      width: "40%",
      render: (question) => question ?? "-",
    },
    {
      title: "Jawaban",
      dataIndex: "knowledge",
      key: "knowledge",
      width: "40%",
      render: (knowledge) => knowledge?.answer ?? "-",
    },
    {
      title: "Vote",
      dataIndex: "vote",
      key: "vote",
      width: "5%",
    },
    {
      title: "Tanggal Dibuat",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => format(new Date(date), "dd MMMM yyyy", { locale: id }),
      width: "10%",
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: any,
    sorter: SorterResult<IVote> | SorterResult<IVote>[]
  ) => {
    setPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
  };

  return (
    <Table
      columns={columns}
      dataSource={votesData?.data ?? []}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: pageSize,
        total: votesData?.meta?.total ?? 0,
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
