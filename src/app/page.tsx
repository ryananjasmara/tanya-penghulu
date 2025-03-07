"use client";

import {
  BookOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Space, theme, Typography } from "antd";
import { Row } from "antd";
import { Card } from "antd";
import { Outfit } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;
const { useToken } = theme;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["800"],
});

export default function HomePage() {
  const router = useRouter();
  const { token } = useToken();

  return (
    <div
      style={{
        padding: "0px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12}>
          <Space direction="vertical" size="large">
            <Title
              className={outfit.className}
              style={{
                fontSize: "4rem",
                background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 0,
                letterSpacing: "-0.02em",
                fontWeight: 800,
                paddingBottom: "4px",
              }}
            >
              Tanya Penghulu
            </Title>
            <Paragraph
              style={{
                fontSize: "18px",
                color: "#15417E",
                lineHeight: 1.6,
                letterSpacing: "0.01em",
                maxWidth: "600px",
              }}
            >
              Asisten pintar yang memberikan jawaban cepat dan akurat seputar
              pernikahan dalam Islam. Temukan informasi terpercaya tentang rukun
              nikah, mahar, wali, dan berbagai aspek penting lainnya untuk
              menuju akad yang berkah.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/chat")}
              style={{
                height: "50px",
                borderRadius: "8px",
                fontSize: "16px",
                background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
                border: "none",
                boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0,118,255,0.39)";
                e.currentTarget.style.background = `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 80%)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px 0 rgba(0,118,255,0.39)";
                e.currentTarget.style.background = `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`;
              }}
            >
              Mulai Bertanya
            </Button>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image
              src="/images/illustration/couple.png"
              alt="Tanya Penghulu Illustration"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              width={400}
              height={400}
            />
          </div>
        </Col>
      </Row>

      <div style={{ marginBottom: "20px" }}>
        <Title
          level={2}
          className={outfit.className}
          style={{
            textAlign: "center",
            marginBottom: "40px",
            position: "relative",
            display: "inline-block",
            left: "50%",
            transform: "translateX(-50%)",
            background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "2.5rem",
            fontWeight: 800,
          }}
        >
          Fitur Utama
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "25%",
              width: "50%",
              height: "4px",
              background: `linear-gradient(to right, ${token.colorPrimary}, #36a1ff)`,
              borderRadius: "2px",
            }}
          />
        </Title>

        <Row gutter={[24, 24]} style={{ marginBottom: "20px" }}>
          <Col xs={24} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: "12px",
                background: "#ffffff",
                border: `1px solid ${token.colorPrimaryBorder}`,
                transition: "all 0.3s ease",
              }}
              hoverable
              styles={{
                body: {
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                },
              }}
            >
              <div
                style={{
                  background: token.colorPrimaryBg,
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <QuestionCircleOutlined
                  style={{
                    fontSize: "32px",
                    color: token.colorPrimary,
                  }}
                />
              </div>
              <Title
                level={4}
                className={outfit.className}
                style={{
                  marginBottom: "12px",
                  fontSize: "20px",
                  color: "#15417E",
                }}
              >
                Tanya Jawab Cepat
              </Title>
              <Paragraph
                style={{
                  color: "#334155",
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.6,
                }}
              >
                Dapatkan jawaban instan untuk pertanyaan seputar pernikahan
                dalam Islam.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: "12px",
                background: "#ffffff",
                border: `1px solid ${token.colorPrimaryBorder}`,
                transition: "all 0.3s ease",
              }}
              hoverable
              styles={{
                body: {
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                },
              }}
            >
              <div
                style={{
                  background: token.colorPrimaryBg,
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <BookOutlined
                  style={{
                    fontSize: "32px",
                    color: token.colorPrimary,
                  }}
                />
              </div>
              <Title
                level={4}
                className={outfit.className}
                style={{
                  marginBottom: "12px",
                  fontSize: "20px",
                  color: "#15417E",
                }}
              >
                Referensi Terpercaya
              </Title>
              <Paragraph
                style={{
                  color: "#334155",
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.6,
                }}
              >
                Jawaban berdasarkan sumber-sumber terpercaya dan sesuai syariat
                Islam.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: "12px",
                background: "#ffffff",
                border: `1px solid ${token.colorPrimaryBorder}`,
                transition: "all 0.3s ease",
              }}
              hoverable
              styles={{
                body: {
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                },
              }}
            >
              <div
                style={{
                  background: token.colorPrimaryBg,
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <MessageOutlined
                  style={{
                    fontSize: "32px",
                    color: token.colorPrimary,
                  }}
                />
              </div>
              <Title
                level={4}
                className={outfit.className}
                style={{
                  marginBottom: "12px",
                  fontSize: "20px",
                  color: "#15417E",
                }}
              >
                Riwayat Percakapan
              </Title>
              <Paragraph
                style={{
                  color: "#334155",
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.6,
                }}
              >
                Simpan dan akses kembali percakapan sebelumnya dengan mudah.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
