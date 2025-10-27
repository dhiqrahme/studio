import ChatView from "@/components/pages/chat/chat-view";
import { chats, users } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return chats.map(chat => ({ id: chat.id }));
}

export default function IndividualChatPage({ params }: { params: { id: string } }) {
  const chat = chats.find(c => c.id === params.id);
  if (!chat) {
    notFound();
  }

  const otherUserId = chat.userIds.find(id => id !== '0');
  const otherUser = users.find(u => u.id === otherUserId);
  if (!otherUser) {
    notFound();
  }

  return <ChatView chat={chat} otherUser={otherUser} />;
}
