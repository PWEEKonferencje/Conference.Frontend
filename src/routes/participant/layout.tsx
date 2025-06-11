import { SidebarNav } from "@/components/sidebar-nav";
import { NotificationSidebar } from "@/components/notification-sidebar";
import { useParams, Outlet } from "react-router";
import { RoleNavigationHeader } from "@/components/role-navigation-header";

export default function ParticipantLayout() {
  const { conferenceId } = useParams<{ conferenceId: string }>();

  if (!conferenceId) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 hidden md:block">
        <SidebarNav role="participant" conferenceId={conferenceId} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <RoleNavigationHeader
          role="participant"
          conferenceId={conferenceId}
          conferenceName="Neural Networks in Health Care"
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
