"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  MessageCircle,
  Sparkles,
  User,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/data";
import UserAvatar from "@/components/user-avatar";

const menuItems = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/sync-circles", label: "Sync Circles", icon: Sparkles },
  { href: "/profile", label: "Profile", icon: User },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Logo can be placed here if available */}
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label, side: "right" }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <div className="flex items-center gap-3 p-2">
          <UserAvatar user={currentUser} className="h-10 w-10" />
          <div className="flex flex-col overflow-hidden">
            <span className="truncate font-semibold">{currentUser.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {currentUser.location}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
