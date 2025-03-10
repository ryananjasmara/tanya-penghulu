import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { SidebarClient } from "@/components/layout/Sidebar";
import { useGetAllLogs } from "@/services/queries";
import { LogTable } from "./__partials__/LogTable";

export default function LogsPage() {
  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Riwayat Aktivitas" },
            { title: "Daftar Aktivitas", href: "/logs" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <LogTable />
      </div>
    </SidebarClient>
  );
}
