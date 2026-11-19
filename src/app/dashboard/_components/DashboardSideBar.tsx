"use client";

import { usePathname } from "next/navigation";
import { Pizza } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
  const menuItems = dashboardMenuItems[currentRole];

  return (
    <Sidebar className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Pizza className="size-5" />
          </div>
          <div>
            <p className="font-heading text-lg text-foreground">PizzaHub</p>
            <p className="text-xs text-text-muted capitalize">{currentRole} dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 py-6">
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
