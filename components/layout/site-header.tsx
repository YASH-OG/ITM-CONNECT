import { SignInDialog } from "@/components/auth/sign-in-dialog";
import { SignUpDialog } from "@/components/auth/sign-up-dialog";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          ITM CONNECT
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/chat">
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>
          <SignInDialog />
          <SignUpDialog />
        </div>
      </div>
    </header>
  );
}