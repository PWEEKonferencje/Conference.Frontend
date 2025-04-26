import { PaneFull } from "@/components/ui/app/pane/pane-full";
import { NavUser } from "@/components/ui/app/sidenav/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <PaneFull>
      <SidebarProvider>
        <Sidebar variant="inset">
          <SidebarHeader />
          <SidebarContent></SidebarContent>
          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </PaneFull>
  );
}
