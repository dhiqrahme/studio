import ChatList from "@/components/pages/chat/chat-list";
import { chats, users } from "@/lib/data";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const otherUserIds = chats.map(chat => chat.userIds.find(id => id !== '0')!);
  const chatUsers = users.filter(user => otherUserIds.includes(user.id));
  
  return (
    <div className="grid h-[calc(100vh-4rem-1px)] grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <div className="hidden md:block border-r">
        <ChatList chats={chats} users={chatUsers} />
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        {children}
      </div>
    </div>
  );
}
