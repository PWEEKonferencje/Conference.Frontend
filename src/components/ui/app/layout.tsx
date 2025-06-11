import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="font-semibold">Conference</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2">
            {/* Your sidebar content */}
          </SidebarContent>
          <SidebarFooter className="px-2">
            <div className="flex items-center justify-between">
              <ThemeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
