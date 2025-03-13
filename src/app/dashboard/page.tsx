"use client";

import { Card, Row, Col, Statistic, Grid } from "antd";
import { Line, Column } from "@ant-design/charts";
import { useGetAnalyticsSummary } from "@/services/queries";
import {
  UserOutlined,
  BookOutlined,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { SidebarClient } from "@/components/layout/Sidebar";

const { useBreakpoint } = Grid;

export default function DashboardPage() {
  const screens = useBreakpoint();
  const { data: analyticsData, isLoading } = useGetAnalyticsSummary();

  const commonConfig = {
    data: analyticsData?.data?.metrics?.missingAnswers?.dailyTrend || [],
    xField: "date",
    yField: "count",
    seriesField: "type",
    autoFit: true,
    yAxis: {
      title: {
        text: "Jumlah Pertanyaan",
      },
      label: {
        formatter: (v: string) => `${v}`,
      },
    },
  };

  const lineConfig = {
    ...commonConfig,
    smooth: true,
    height: 300,
    padding: [30, 45, 50, 45],
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
                title="Jumlah Pengguna"
                value={analyticsData?.data?.metrics?.users?.total || 0}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card loading={isLoading}>
              <Statistic
                title="Jumlah Pengetahuan"
                value={analyticsData?.data?.metrics?.knowledges?.total || 0}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card loading={isLoading}>
              <Statistic
                title="Feedback Positif"
                value={analyticsData?.data?.metrics?.feedbacks?.positive || 0}
                prefix={<LikeOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card loading={isLoading}>
              <Statistic
                title="Feedback Negatif"
                value={analyticsData?.data?.metrics?.feedbacks?.negative || 0}
                prefix={<DislikeOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {!screens.xs && (
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={24}>
              <Card title="Pertanyaan Tidak Terjawab" loading={isLoading}>
                <Line {...lineConfig} />
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </SidebarClient>
  );
}
