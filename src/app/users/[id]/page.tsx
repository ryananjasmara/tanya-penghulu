import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { SidebarClient } from "@/components/layout/Sidebar";
import { EditForm } from "./__partials__/EditForm";

export default function EditUserPage() {
  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Pengguna" },
            { title: "Edit Pengguna", href: "/users/edit" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <EditForm />
      </div>
    </SidebarClient>
  );
}
