"use client";

import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { dashboardMenuItems } from "./dashboard-menu-config";
import DashboardSideFooter from "./DashboardSideFooter";
import SidebarLink from "./SidebarLink";
import { useSession } from "@/lib/auth-client";

const DashboardSideBar = () => {

  const {data:session} = useSession();
  const currentRole = session?.user?.role || "customer";

  const pathname = usePathname();
  const menuItems = dashboardMenuItems[currentRole]?? [];

  return (
    <Sidebar
      className="top-(--dashboard-navbar-height)! bottom-0! h-[calc(100svh-var(--dashboard-navbar-height))]! border-r border-sidebar-border"
      mobileClassName="!top-[var(--dashboard-navbar-height)] !bottom-0 !h-[calc(100svh-var(--dashboard-navbar-height))]"
    >
      <SidebarContent className="justify-start">
        <SidebarGroup className="shrink-0 px-3 pt-6">
          <SidebarGroupLabel className="px-3 text-xs uppercase tracking-[0.16em] text-text-muted">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((menuItem) => (
                <SidebarLink
                  key={menuItem.href}
                  {...menuItem}
                  isActive={
                    pathname === menuItem.href ||
                    (menuItem.href !== `/dashboard/${currentRole}` &&
                      pathname.startsWith(`${menuItem.href}/`))
                  }
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <DashboardSideFooter role={currentRole} />
    </Sidebar>
  );
};

export default DashboardSideBar;
