"use client";

import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { IMissingAnswer } from "@/types/missing-answer";
import { useGetAllMissingAnswers } from "@/services/queries/missing-answer";
import { useState } from "react";
import type { SorterResult } from "antd/es/table/interface";

export function QuestionTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: questionsData, isLoading } = useGetAllMissingAnswers({
    page,
    limit: pageSize,
  });

  const columns: ColumnsType<IMissingAnswer> = [
    {
      title: "Pertanyaan",
      dataIndex: "question",
      key: "question",
      width: "90%",
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
    sorter: SorterResult<IMissingAnswer> | SorterResult<IMissingAnswer>[]
  ) => {
    setPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 10);
  };

  return (
    <Table
      columns={columns}
      dataSource={questionsData?.data ?? []}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: pageSize,
        total: questionsData?.meta?.total ?? 0,
        showSizeChanger: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} dari ${total} items`,
        simple: true,
        defaultPageSize: 10,
        pageSizeOptions: ["5", "10", "20", "50"],
      }}
      onChange={handleTableChange}
      scroll={{
        x: 800,
      }}
    />
  );
}
