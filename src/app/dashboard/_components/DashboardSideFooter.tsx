import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronRight, UserRound } from "lucide-react";

import type { Role } from "@/lib/types/role";

const DashboardSideFooter = ({ role }: { role: Role }) => {
  return (
    <SidebarFooter className="mt-auto border-t border-sidebar-border px-3 py-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="h-auto gap-3 px-3 py-3 hover:bg-accent hover:text-accent-foreground"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <UserRound className="size-4" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start">
              <span className="truncate text-sm font-medium text-foreground">PizzaHub User</span>
              <span className="truncate text-xs capitalize text-text-muted">{role}</span>
            </span>
            <ChevronRight className="size-4 text-text-muted" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default DashboardSideFooter;
