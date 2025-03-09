"use client";

import { useRouter } from "next/navigation";
import { Input, Select, Button, message, Form } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Title from "antd/es/typography/Title";
import { useCreateUser } from "@/services/queries/user";

const userSchema = z.object({
  name: z
    .string()
    .min(1, "Nama harus diisi")
    .min(3, "Nama minimal 3 karakter")
    .max(50, "Nama maksimal 50 karakter"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  username: z
    .string()
    .min(1, "Username harus diisi")
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh berisi huruf, angka, dan underscore"
    ),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(6, "Password minimal 6 karakter")
    .max(50, "Password maksimal 50 karakter")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password harus mengandung huruf besar, huruf kecil, dan angka"
    ),
  role: z.enum(["ADMIN", "STAFF"], {
    required_error: "Role harus dipilih",
    invalid_type_error: "Role tidak valid",
  }),
});

type FormValues = z.infer<typeof userSchema>;

export function CreateForm() {
  const router = useRouter();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    createUser(values, {
      onSuccess: () => {
        message.success("Pengguna berhasil dibuat");
        router.push("/users");
      },
      onError: () => {
        message.error("Gagal membuat user");
      },
    });
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        Buat Pengguna Baru
      </Title>
      <Form layout="vertical">
        <Form.Item
          label="Nama"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
          style={{ marginBottom: 12 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Masukkan nama lengkap"
                size="middle"
                status={errors.name ? "error" : ""}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
          style={{ marginBottom: 12 }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Masukkan alamat email"
                size="middle"
                status={errors.email ? "error" : ""}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Username"
          validateStatus={errors.username ? "error" : ""}
          help={errors.username?.message}
          style={{ marginBottom: 12 }}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Masukkan username"
                size="middle"
                status={errors.username ? "error" : ""}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
          style={{ marginBottom: 12 }}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Minimum 6 karakter"
                size="middle"
                status={errors.password ? "error" : ""}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Role"
          validateStatus={errors.role ? "error" : ""}
          help={errors.role?.message}
          style={{ marginBottom: 32 }}
        >
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Pilih role"
                size="middle"
                status={errors.role ? "error" : ""}
                style={{ width: "100%" }}
              >
                <Select.Option value="ADMIN">Admin</Select.Option>
                <Select.Option value="STAFF">Staff</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            loading={isCreating}
          >
            Buat Pengguna
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
