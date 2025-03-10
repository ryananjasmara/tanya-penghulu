import { SidebarClient } from "@/components/layout/Sidebar";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { CreateForm } from "./__partials__/CreateForm";

export default function CreateUserPage() {
  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Pengguna" },
            { title: "Daftar Pengguna", href: "/users" },
            { title: "Buat Pengguna", href: "/users/create" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <CreateForm />
      </div>
    </SidebarClient>
  );
}
