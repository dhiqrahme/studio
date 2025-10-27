"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Chat, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import { Search } from "lucide-react";

type ChatListProps = {
  chats: Chat[];
  users: User[];
};

export default function ChatList({ chats, users }: ChatListProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">Chats</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-9"/>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-4 pt-0">
          {chats.map((chat) => {
            const otherUserId = chat.userIds.find((id) => id !== "0");
            const user = users.find((u) => u.id === otherUserId);
            if (!user) return null;

            const lastMessage = chat.messages[chat.messages.length - 1];

            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent/10 hover:text-primary",
                  pathname === `/chat/${chat.id}` && "bg-accent/10 text-primary"
                )}
              >
                <UserAvatar user={user} className="h-10 w-10" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold truncate">{user.name}</p>
                  <p className="text-sm truncate">{lastMessage.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
