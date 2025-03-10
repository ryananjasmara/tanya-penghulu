export const PERMISSIONS = {
  // Users
  CREATE_USER: "CREATE_USER",
  READ_USER: "READ_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",

  // Knowledge
  CREATE_KNOWLEDGE: "CREATE_KNOWLEDGE",
  READ_KNOWLEDGE: "READ_KNOWLEDGE",
  UPDATE_KNOWLEDGE: "UPDATE_KNOWLEDGE",
  DELETE_KNOWLEDGE: "DELETE_KNOWLEDGE",

  // Question
  READ_QUESTION: "READ_QUESTION",

  // Log Activity
  READ_LOG_ACTIVITY: "READ_LOG_ACTIVITY",

  // Dashboard
  READ_DASHBOARD: "READ_DASHBOARD",
} as const;

export type Permission = keyof typeof PERMISSIONS;

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ADMIN: Object.values(PERMISSIONS),
  STAFF: [
    PERMISSIONS.READ_KNOWLEDGE,
    PERMISSIONS.CREATE_KNOWLEDGE,
    PERMISSIONS.UPDATE_KNOWLEDGE,
    PERMISSIONS.READ_QUESTION,
    PERMISSIONS.READ_DASHBOARD,
  ],
};

export function hasPermission(role: string, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
