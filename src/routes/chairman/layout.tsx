import { SidebarNav } from "@/components/sidebar-nav";
import { NotificationSidebar } from "@/components/notification-sidebar";
import { RoleNavigationHeader } from "@/components/role-navigation-header";
import { useParams, Outlet } from "react-router";

export default function ChairmanLayout() {
  const { conferenceId } = useParams<{ conferenceId: string }>();

  if (!conferenceId) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 hidden md:block">
        <SidebarNav role="chairman" conferenceId={conferenceId} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoleNavigationHeader
          role="chairman"
          conferenceId={conferenceId}
          conferenceName="AI Research Conference 2025"
        />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
          <NotificationSidebar />
        </div>
      </div>
    </div>
  );
}
