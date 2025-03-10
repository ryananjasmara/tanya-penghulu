"use client";

import { useRouter } from "next/navigation";
import { Input, Select, Button, message, Form } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Title from "antd/es/typography/Title";
import { useCreateKnowledge } from "@/services/queries/knowledge";

const { TextArea } = Input;

const knowledgeSchema = z.object({
  keywords: z
    .array(z.string())
    .min(1, "Kata kunci harus diisi")
    .transform((keywords) => keywords.map((keyword) => keyword.trim())),
  answer: z
    .string()
    .min(1, "Jawaban harus diisi")
    .min(10, "Jawaban minimal 10 karakter")
    .max(500, "Jawaban maksimal 500 karakter"),
  category: z
    .string()
    .min(1, "Kategori harus diisi")
    .min(3, "Kategori minimal 3 karakter")
    .max(50, "Kategori maksimal 50 karakter"),
});

type FormValues = z.infer<typeof knowledgeSchema>;

export function CreateForm() {
  const router = useRouter();
  const { mutate: createKnowledge, isPending: isCreating } =
    useCreateKnowledge();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(knowledgeSchema),
    defaultValues: {
      keywords: [],
      answer: "",
      category: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    createKnowledge(
      {
        keywords: values.keywords,
        answer: values.answer,
        category: values.category,
      },
      {
        onSuccess: () => {
          message.success("Pengetahuan berhasil dibuat");
          router.push("/knowledges");
        },
        onError: () => {
          message.error("Gagal membuat pengetahuan");
        },
      }
    );
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        Buat Pengetahuan Baru
      </Title>
      <Form layout="vertical">
        <Form.Item
          label="Kata Kunci"
          validateStatus={errors.keywords ? "error" : ""}
          help={errors.keywords?.message}
          style={{ marginBottom: 12 }}
        >
          <Controller
            name="keywords"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Select
                {...field}
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Ketik kata kunci dan tekan enter"
                onChange={(newValue) => {
                  onChange(newValue.map((tag) => tag.trim()));
                }}
                value={value}
                tokenSeparators={[","]}
                size="middle"
                status={errors.keywords ? "error" : ""}
                allowClear
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Jawaban"
          validateStatus={errors.answer ? "error" : ""}
          help={errors.answer?.message}
          style={{ marginBottom: 12 }}
        >
          <Controller
            name="answer"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Masukkan jawaban"
                size="middle"
                status={errors.answer ? "error" : ""}
                autoSize={{ minRows: 3, maxRows: 8 }}
                showCount
                maxLength={1000}
                style={{
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Kategori"
          validateStatus={errors.category ? "error" : ""}
          help={errors.category?.message}
          style={{ marginBottom: 12 }}
        >
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<TagOutlined style={{ color: "#bfbfbf" }} />}
                placeholder="Masukkan kategori"
                size="middle"
                status={errors.category ? "error" : ""}
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            loading={isCreating}
          >
            Buat Pengetahuan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
