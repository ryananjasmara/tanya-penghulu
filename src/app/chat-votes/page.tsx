import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { SidebarClient } from "@/components/layout/Sidebar";
import { ChatVoteTable } from "./__partials__/ChatVoteTable";

export default function ChatVotesPage() {
  return (
    <SidebarClient>
      <div style={{ padding: "0px 12px" }}>
        <Breadcrumb
          items={[
            { title: "Voting" },
            { title: "Daftar Voting", href: "/chat-votes" },
          ]}
          style={{ marginBottom: 24 }}
        />
        <ChatVoteTable />
      </div>
    </SidebarClient>
  );
}
