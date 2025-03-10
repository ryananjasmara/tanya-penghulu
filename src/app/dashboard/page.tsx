"use client";

import { Card, Row, Col, Statistic, Grid } from "antd";
import { Line } from "@ant-design/charts";
import { useGetAnalyticsSummary } from "@/services/queries";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { SidebarClient } from "@/components/layout/Sidebar";

export default function DashboardPage() {
  const { data: analyticsData, isLoading } = useGetAnalyticsSummary();

  const missingAnswersConfig = {
    data: analyticsData?.data?.metrics?.missingAnswers?.dailyTrend || [],
    xField: "date",
    yField: "count",
    seriesField: "type",
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
  };

  return (
    <SidebarClient>
      <div style={{ padding: 24 }}>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card loading={isLoading}>
              <Statistic
                title="Total Pengguna"
                value={analyticsData?.data?.metrics?.users?.total || 0}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card loading={isLoading}>
              <Statistic
                title="Total Knowledge"
                value={analyticsData?.data?.metrics?.knowledges?.total || 0}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={14}>
            <Card title="Pertanyaan Tidak Terjawab" loading={isLoading}>
              <Line {...missingAnswersConfig} />
            </Card>
          </Col>
        </Row>
      </div>
    </SidebarClient>
  );
}
