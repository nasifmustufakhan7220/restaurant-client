"use client";

import Link from "next/link";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SidebarLinkProps = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
};

const SidebarLink = ({ label, href, icon: Icon, isActive }: SidebarLinkProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={href} />}
        isActive={isActive}
        className={cn(
          "h-11 px-3 text-text-secondary",
          isActive &&
            "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <Icon />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarLink;
