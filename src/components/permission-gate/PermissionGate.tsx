import { ReactNode } from "react";
import { Permission } from "@/lib/auth/permissions";
import { usePermission } from "@/utils/hooks/usePermission";

interface Props {
  permission: Permission;
  children: ReactNode;
}

export function PermissionGate({ permission, children }: Props) {
  const hasAccess = usePermission(permission);

  if (!hasAccess) return null;

  return <>{children}</>;
}
