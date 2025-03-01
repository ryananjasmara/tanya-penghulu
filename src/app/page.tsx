"use client";

import { useRouter } from "next/navigation";
import { Button, Typography, Space, Card, Row, Col, theme } from "antd";
import {
  MessageOutlined,
  QuestionCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { Outfit } from "next/font/google";

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
    <div className="px-10 py-5 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
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
              }}
            >
              Tanya Nikah
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
                boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0,118,255,0.39)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px 0 rgba(0,118,255,0.39)";
              }}
            >
              Mulai Bertanya
            </Button>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <div className="flex justify-center items-center h-full">
            <Image
              src="/images/illustration/couple.png"
              alt="Tanya Nikah Illustration"
              className="max-w-full h-auto"
              width={500}
              height={500}
            />
          </div>
        </Col>
      </Row>

      <div className="mt-10">
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
          <div className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-gradient-to-r from-primary to-[#36a1ff] rounded-sm" />
        </Title>

        <Row gutter={[24, 24]}>
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
              <div className="bg-primary-bg rounded-xl p-4 mb-5">
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
