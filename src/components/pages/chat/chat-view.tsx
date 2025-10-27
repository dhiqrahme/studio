"use client";

import { Ban, MoreVertical, Send, ShieldAlert, Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import type { Chat, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ChatViewProps = {
  chat: Chat;
  otherUser: User;
};

export default function ChatView({ chat, otherUser }: ChatViewProps) {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <UserAvatar user={otherUser} className="h-10 w-10" />
          <h2 className="text-xl font-bold">{otherUser.name}</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
              <ShieldAlert className="mr-2 h-4 w-4" />
              <span>Report User</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
              <Ban className="mr-2 h-4 w-4" />
              <span>Block User</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chat.messages.map((message) => {
            const isOwnMessage = message.senderId === "0";
            return (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2",
                  isOwnMessage ? "justify-end" : "justify-start"
                )}
              >
                {!isOwnMessage && <UserAvatar user={otherUser} className="h-8 w-8" />}
                <div
                  className={cn(
                    "max-w-xs rounded-lg px-4 py-2 md:max-w-md",
                    isOwnMessage
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <footer className="border-t p-4">
        <form className="relative">
          <Input placeholder="Type a message..." className="pr-24" />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button type="button" variant="ghost" size="icon">
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button type="submit" variant="ghost" size="icon">
              <Send className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
}
