import { ChatWindow } from "@/components/chat/chat-window";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Messages</h1>
          <ChatWindow />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}