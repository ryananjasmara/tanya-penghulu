import { SidebarClient } from "@/components/layout/Sidebar";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { UserForm } from "./__partials__/UserForm";

export default function CreateUserPage() {
  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Pengguna" },
            { title: "Buat Pengguna", href: "/users/create" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <UserForm />
      </div>
    </SidebarClient>
  );
}
