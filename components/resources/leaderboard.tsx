"use client";

import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useResourceStore } from "@/lib/store/resources";

export function Leaderboard() {
  const resources = useResourceStore((state) => state.resources);

  const leaderboard = Object.values(
    resources.reduce((acc, resource) => {
      const { id, name, points } = resource.author;
      if (!acc[id]) {
        acc[id] = { id, name, points, upvotes: 0 };
      }
      acc[id].upvotes += resource.upvotes.length;
      return acc;
    }, {} as Record<string, { id: string; name: string; points: number; upvotes: number }>)
  ).sort((a, b) => b.upvotes - a.upvotes);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Award className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {leaderboard.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg w-6">
                {index + 1}
              </span>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {user.upvotes} upvotes
                </p>
              </div>
            </div>
            <div className="text-primary font-semibold">
              {user.points} pts
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <p className="text-sm text-center">
          Top contributor wins an Amazon coupon worth ₹1000!
        </p>
      </div>
    </Card>
  );
}