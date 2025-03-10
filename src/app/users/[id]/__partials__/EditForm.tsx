"use client";

import { useParams, useRouter } from "next/navigation";
import { Input, Select, Button, message, Form } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Title from "antd/es/typography/Title";
import { useGetUserDetail, useUpdateUser } from "@/services/queries/user";
import { useEffect } from "react";
import Loading from "../../loading";

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
  role: z.enum(["ADMIN", "STAFF"], {
    required_error: "Role harus dipilih",
    invalid_type_error: "Role tidak valid",
  }),
});

type FormValues = z.infer<typeof userSchema>;

export function EditForm() {
  const router = useRouter();

  const { id } = useParams();

  const { data: user, isLoading } = useGetUserDetail({ id: id as string });

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      role: undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    updateUser(
      { ...values, id: id as string },
      {
        onSuccess: () => {
          message.success("Pengguna berhasil diubah");
          router.push("/users");
          router.refresh();
        },
        onError: () => {
          message.error("Gagal mengubah pengguna");
        },
      }
    );
  };

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("username", user.username);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        Edit Pengguna
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
            loading={isUpdating}
          >
            Update Pengguna
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
