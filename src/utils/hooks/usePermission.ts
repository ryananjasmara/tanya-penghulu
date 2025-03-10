import { useSession } from "next-auth/react";
import { Permission, hasPermission } from "@/lib/auth/permissions";

export function usePermission(permission: Permission) {
  const { data: session } = useSession();

  if (!session?.user?.role) return false;

  return hasPermission(session.user.role, permission);
}
