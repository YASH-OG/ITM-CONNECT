import { BookOpen, Building2, Calendar, Bell, BarChart3, MessageCircle } from "lucide-react";
import { FeatureCard } from "@/components/features/feature-card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const features = [
  {
    icon: <MessageCircle className="w-12 h-12 text-primary" />,
    title: "Real-Time Communication",
    description: "Chat with peers, join group discussions, and stay connected with your community.",
  },
  {
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    title: "Community Resource Sharing",
    description: "Share tools, books, and skills with your peers to foster collaboration.",
  },
  {
    icon: <Building2 className="w-12 h-12 text-primary" />,
    title: "Issue Reporting Made Easy",
    description: "Report and track maintenance issues in real-time.",
  },
  {
    icon: <Calendar className="w-12 h-12 text-primary" />,
    title: "Event Management",
    description: "Stay informed about campus events and manage your RSVPs.",
  },
  {
    icon: <Bell className="w-12 h-12 text-primary" />,
    title: "Real-Time Notifications",
    description: "Get instant updates about important announcements.",
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-primary" />,
    title: "Analytics Dashboard",
    description: "Access insights about community engagement and trends.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Welcome to ITM CONNECT</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Your all-in-one platform for smart engagement within the ITM universities community.
              Connect, collaborate, and contribute to our thriving ecosystem.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}