"use client";

import { useRouter } from "next/navigation";
import { Input, Button, message, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Title from "antd/es/typography/Title";
import { useChangePassword, useUpdateUser } from "@/services/queries/user";
import { useSession } from "next-auth/react";

const passwordSchema = z.object({
  password: z.string().min(8, "Password minimal 8 karakter"),
  newPassword: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string().min(8, "Password minimal 8 karakter"),
});

type PasswordValues = z.infer<typeof passwordSchema>;

export function ProfileForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const {
    control: passwordControl,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onPasswordSubmit = async (values: PasswordValues) => {
    if (!session?.user?.id) return;

    if (values.newPassword !== values.confirmPassword) {
      message.error("Password baru tidak sama dengan konfirmasi password");
      return;
    }

    changePassword(
      {
        id: session.user.id,
        currentPassword: values.password,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          message.success("Password berhasil diubah");
          router.refresh();
        },
        onError: () => {
          message.error("Gagal mengubah password");
        },
      }
    );
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        Ganti Password
      </Title>
      <Form layout="vertical">
        <Form.Item
          label="Password Lama"
          style={{ marginBottom: 12 }}
          validateStatus={passwordErrors.password ? "error" : ""}
          help={passwordErrors.password?.message}
        >
          <Controller
            name="password"
            control={passwordControl}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Password Baru"
          style={{ marginBottom: 12 }}
          validateStatus={passwordErrors.newPassword ? "error" : ""}
          help={passwordErrors.newPassword?.message}
        >
          <Controller
            name="newPassword"
            control={passwordControl}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Konfirmasi Password"
          style={{ marginBottom: 24 }}
          validateStatus={passwordErrors.confirmPassword ? "error" : ""}
          help={passwordErrors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={passwordControl}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            onClick={passwordHandleSubmit(onPasswordSubmit)}
            loading={isChangingPassword}
          >
            Ganti Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
