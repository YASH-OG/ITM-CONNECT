import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

const notices = [
  {
    id: 1,
    title: "Mid-Semester Examination Schedule",
    date: "2024-04-15",
    priority: "high"
  },
  {
    id: 2,
    title: "Campus Cleanup Drive",
    date: "2024-04-20",
    priority: "medium"
  },
  {
    id: 3,
    title: "Technical Symposium Registration Open",
    date: "2024-04-25",
    priority: "high"
  }
];

export function NoticeBoard() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Notice Board</h2>
      </div>
      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className={`w-2 h-2 mt-2 rounded-full ${
              notice.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            <div>
              <h3 className="font-medium">{notice.title}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(notice.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}