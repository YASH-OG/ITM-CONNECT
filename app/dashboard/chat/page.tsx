"use client";

import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatArea } from "@/components/chat/chat-area";
import { useChatStore } from "@/lib/store/chat";

export default function ChatPage() {
  const activeChannel = useChatStore((state) => state.activeChannel);
  
  return (
    <div className="flex h-[calc(100vh-12rem)] gap-4 overflow-hidden">
      <ChatSidebar />
      <div className="flex-1">
        <ChatArea channelId={activeChannel} />
      </div>
    </div>
  );
}