"use client";

import { LoginForm } from "@/components/login/partials/LoginForm";

export default function LoginClient() {
  const handleLogin = async (data: any) => {
    try {
      console.log("Login data:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e6f4ff",
      }}
    >
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
