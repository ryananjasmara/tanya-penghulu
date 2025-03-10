import { SidebarClient } from "@/components/layout/Sidebar";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { CreateForm } from "./__partials__/CreateForm";

export default function CreateKnowledgePage() {
  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Pengetahuan" },
            { title: "Daftar Pengetahuan", href: "/knowledges" },
            { title: "Buat Pengetahuan", href: "/knowledges/create" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <CreateForm />
      </div>
    </SidebarClient>
  );
}
