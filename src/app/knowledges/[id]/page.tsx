import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { SidebarClient } from "@/components/layout/Sidebar";
import { EditForm } from "./__partials__/EditForm";

export default function EditKnowledgePage() {
  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Pengetahuan" },
            { title: "Daftar Pengetahuan", href: "/knowledges" },
            { title: "Edit Pengetahuan", href: "/knowledges/edit" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <EditForm />
      </div>
    </SidebarClient>
  );
}
