"use client";

import { useChatStore, type Channel } from "@/lib/store/chat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Volume2, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function ChatSidebar() {
  const { channels, activeChannel, setActiveChannel } = useChatStore();

  const categories = {
    general: "General",
    academic: "Academic",
    career: "Career",
    community: "Community"
  };

  const groupedChannels = channels.reduce((acc, channel) => {
    if (!acc[channel.category]) {
      acc[channel.category] = [];
    }
    acc[channel.category].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  return (
    <div className="w-64 bg-muted rounded-lg overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {Object.entries(groupedChannels).map(([category, channels]) => (
            <Collapsible key={category} defaultOpen>
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-muted-foreground/10 rounded-md">
                <ChevronDown className="h-4 w-4" />
                <span className="font-semibold text-sm uppercase">
                  {categories[category as keyof typeof categories]}
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {channels.map((channel) => (
                  <Button
                    key={channel.id}
                    variant={activeChannel === channel.id ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setActiveChannel(channel.id)}
                  >
                    {channel.type === 'text' ? (
                      <Hash className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                    <span className="truncate">{channel.name}</span>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}