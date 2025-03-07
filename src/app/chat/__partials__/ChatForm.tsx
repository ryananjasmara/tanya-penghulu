import { useForm, Controller } from "react-hook-form";
import { Input, Button, Grid } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { theme } from "antd";

const { useToken } = theme;

interface ChatFormProps {
  onSubmit: (message: string) => void;
}

type FormValues = {
  message: string;
};

export function ChatForm({ onSubmit }: ChatFormProps) {
  const { token } = useToken();
  const screens = Grid.useBreakpoint();

  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      message: "",
    },
  });

  const message = watch("message");

  const onSubmitForm = handleSubmit((data) => {
    onSubmit(data.message);
    reset();
  });

  return (
    <form
      onSubmit={onSubmitForm}
      style={{
        padding: "16px 24px",
        background: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              placeholder="Ketik pertanyaan Anda di sini..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmitForm();
                }
              }}
              style={{
                borderRadius: "8px",
                padding: "12px",
                resize: "none",
              }}
            />
          )}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          htmlType="submit"
          disabled={!message?.trim()}
          style={{
            borderRadius: "8px",
            height: "46px",
            width: "80px",
            background: !message?.trim()
              ? token.colorBgContainer
              : `linear-gradient(135deg, ${token.colorPrimary} 0%, #36a1ff 100%)`,
            border: !message?.trim()
              ? `1px solid ${token.colorBorder}`
              : "none",
            boxShadow: !message?.trim()
              ? "none"
              : "0 4px 14px 0 rgba(0,118,255,0.39)",
            transition: "all 0.3s ease",
            color: !message?.trim() ? token.colorTextDisabled : "#fff",
            cursor: !message?.trim() ? "not-allowed" : "pointer",
          }}
        >
          {!screens.md && "Kirim"}
        </Button>
      </div>
    </form>
  );
}
