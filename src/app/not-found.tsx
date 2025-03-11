"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Maaf, halaman yang Anda cari tidak ditemukan."
        extra={
          <Button type="primary" onClick={() => router.push("/")}>
            Kembali ke Halaman Utama
          </Button>
        }
      />
    </div>
  );
}
