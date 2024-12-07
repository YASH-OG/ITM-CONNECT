"use client";

import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

interface UserProfileProps {
  name: string;
  roll: string;
  rewardPoints: number;
}

export function UserProfile({ name, roll, rewardPoints }: UserProfileProps) {
  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-muted-foreground">Roll: {roll}</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
          <Award className="w-5 h-5 text-primary" />
          <span className="font-semibold">{rewardPoints} Points</span>
        </div>
      </div>
    </Card>
  );
}