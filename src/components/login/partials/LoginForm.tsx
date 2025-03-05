import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, Input, Card, Typography, theme } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Outfit } from "next/font/google";
import Image from "next/image";

const { Title } = Typography;
const { useToken } = theme;

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["800"],
});

const loginSchema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const { token } = useToken();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card
      style={{
        maxWidth: 400,
        width: "100%",
        boxShadow: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
        borderRadius: "12px",
        margin: "0px 32px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Image
          src="/images/illustration/couple.png"
          alt="Tanya Penghulu Illustration"
          width={200}
          height={200}
        />
      </div>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Title
          className={outfit.className}
          style={{
            fontSize: "2rem",
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
          Tanya Penghulu Admin Panel
        </Title>
      </div>

      <Form onFinish={handleSubmit(onSubmit)} layout="vertical" size="large">
        <Form.Item
          validateStatus={errors.username ? "error" : ""}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={
                  <UserOutlined style={{ color: token.colorTextSecondary }} />
                }
                placeholder="Username"
                disabled={isLoading}
                style={{
                  borderRadius: "8px",
                  height: "45px",
                }}
                autoComplete="off"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
          style={{ marginBottom: "32px" }}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={
                  <LockOutlined style={{ color: token.colorTextSecondary }} />
                }
                placeholder="Password"
                disabled={isLoading}
                style={{
                  borderRadius: "8px",
                  height: "45px",
                }}
                autoComplete="off"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{
              width: "100%",
              height: "45px",
              borderRadius: "8px",
              background: `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
              border: "none",
              boxShadow: "0 4px 14px 0 rgba(0,118,255,0.39)",
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
