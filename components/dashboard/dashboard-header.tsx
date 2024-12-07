"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, MessageCircle, BookOpen, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard/issues", label: "Issue Raise", icon: Building2 },
  { href: "/dashboard/events", label: "Events", icon: Calendar },
  { href: "/dashboard/chat", label: "Chat", icon: MessageCircle },
  { href: "/dashboard/resources", label: "Resources", icon: BookOpen },
];

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const userName = "Yash Lal"; // Demo data

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-primary">
            ITM CONNECT
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}