"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";
import { LoginForm } from "./__partials/LoginForm";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("callbackUrl")) {
      router.replace("/login");
      return;
    }

    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router, searchParams]);

  if (status === "loading" || session) {
    return <Loading />;
  }

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
      <LoginForm />
    </div>
  );
}
