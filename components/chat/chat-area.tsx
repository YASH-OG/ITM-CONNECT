"use client";

import { useState } from "react";
import { useChatStore } from "@/lib/store/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatAreaProps {
  channelId: string;
}

export function ChatArea({ channelId }: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState("");
  const { messages, channels, addMessage } = useChatStore();
  const channel = channels.find(c => c.id === channelId);
  const channelMessages = messages.filter(m => m.channelId === channelId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addMessage({
      content: newMessage,
      channelId,
      sender: {
        name: "Yash Lal",
        roll: "150096724047"
      }
    });

    setNewMessage("");
  };

  if (channel?.type === 'voice') {
    return (
      <div className="h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Voice Channel</h3>
          <p className="text-muted-foreground mb-4">Click to join the voice chat</p>
          <Button>Join Voice</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-muted rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-background">
        <div className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          <h2 className="font-semibold">{channel?.name}</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {channel?.description}
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {channelMessages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {message.sender.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{message.sender.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #${channel?.name}`}
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}