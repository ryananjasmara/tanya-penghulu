"use client";

import { useState } from "react";
import { Button, Grid, Layout, Menu, theme, Typography } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  BookOutlined,
  MessageOutlined,
  ArrowLeftOutlined,
  FileOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { Outfit } from "next/font/google";
import { signOut } from "next-auth/react";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { usePermission } from "@/utils/hooks/usePermission";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["800"],
});

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarClient({ children }: SidebarLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const screens = Grid.useBreakpoint();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      permission: PERMISSIONS.READ_DASHBOARD,
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "Pengguna",
      permission: PERMISSIONS.READ_USER,
    },
    {
      key: "/questions",
      icon: <MessageOutlined />,
      label: "Pertanyaan",
      permission: PERMISSIONS.READ_QUESTION,
    },
    {
      key: "/knowledges",
      icon: <BookOutlined />,
      label: "Pengetahuan",
      permission: PERMISSIONS.READ_KNOWLEDGE,
    },
    {
      key: "/logs",
      icon: <FileOutlined />,
      label: "Riwayat Aktivitas",
      permission: PERMISSIONS.READ_LOG_ACTIVITY,
    },
    {
      key: "/chat-votes",
      icon: <LineChartOutlined />,
      label: "Feedback",
      permission: PERMISSIONS.READ_CHAT_VOTE,
    },
  ];

  const authorizedMenuItems = menuItems.filter((item) => {
    return usePermission(item.permission);
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={screens.md ? undefined : null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
        width={screens.md ? 256 : "100vw"}
        breakpoint="md"
        collapsedWidth={screens.md ? 80 : 0}
      >
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            marginBottom: "8px",
          }}
        >
          <Title
            level={3}
            className={outfit.className}
            style={{
              margin: 0,
              background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {collapsed ? "TP" : "Tanya Penghulu"}
          </Title>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          items={authorizedMenuItems}
          onClick={({ key }) => {
            if (key === pathname && !screens.md) {
              setCollapsed(true);
            } else {
              router.push(key);
            }
          }}
          style={{
            borderInlineEnd: "none",
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0px 16px",
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            display: "flex",
            alignItems: "center",
            height: "65px",
          }}
        >
          {!screens.md && (
            <ArrowLeftOutlined
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "18px", cursor: "pointer" }}
            />
          )}
          <div style={{ marginLeft: "auto" }}>
            <Button
              type="primary"
              onClick={() => router.push("/profile")}
              style={{ marginRight: "8px" }}
            >
              Ubah Password
            </Button>
            <Button type="primary" onClick={() => signOut()}>
              Keluar
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
