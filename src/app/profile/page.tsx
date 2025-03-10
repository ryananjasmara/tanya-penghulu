import { SidebarClient } from "@/components/layout/Sidebar";
import { ProfileForm } from "./__partials__/ProfileForm";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";

export default function ProfilePage() {
  return (
    <SidebarClient>
      <div style={{ padding: 24 }}>
        <ProfileForm />
      </div>
    </SidebarClient>
  );
}
