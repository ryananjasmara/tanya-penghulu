"use client";

import { Spin, Typography, theme } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Outfit } from "next/font/google";

const { Title } = Typography;
const { useToken } = theme;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["800"],
});

export default function Loading() {
  const { token } = useToken();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: token.colorBgContainer,
        gap: "16px",
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
              color: token.colorPrimary,
            }}
            spin
          />
        }
      />
      <Title
        level={4}
        className={outfit.className}
        style={{
          margin: 0,
          background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Mempersiapkan Halaman Utama...
      </Title>
    </div>
  );
}
