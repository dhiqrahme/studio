import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center bg-gray-100 dark:bg-gray-800/20">
      <MessageCircle className="h-12 w-12 text-muted-foreground" />
      <h3 className="text-2xl font-bold tracking-tight">No Chat Selected</h3>
      <p className="text-muted-foreground">
        Select a chat from the sidebar to start a conversation.
      </p>
    </div>
  );
}
