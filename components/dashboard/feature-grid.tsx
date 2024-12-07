import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Building2, Calendar, MessageCircle, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Building2 className="w-8 h-8 mb-4 text-primary" />,
    title: "Issue Raise",
    description: "Report and track maintenance issues",
    href: "/dashboard/issues"
  },
  {
    icon: <Calendar className="w-8 h-8 mb-4 text-primary" />,
    title: "Events",
    description: "Manage and track campus events",
    href: "/dashboard/events"
  },
  {
    icon: <MessageCircle className="w-8 h-8 mb-4 text-primary" />,
    title: "Chat",
    description: "Connect with your peers",
    href: "/dashboard/chat"
  },
  {
    icon: <BookOpen className="w-8 h-8 mb-4 text-primary" />,
    title: "Resources",
    description: "Access shared community resources",
    href: "/dashboard/resources"
  }
];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Link key={index} href={feature.href}>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            {feature.icon}
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}