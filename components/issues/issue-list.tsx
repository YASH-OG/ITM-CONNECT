"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Clock, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIssueStore } from "@/lib/store/issues";

interface IssueListProps {
  filter: "my-issues" | "public" | "admin";
}

export function IssueList({ filter }: IssueListProps) {
  const { issues, upvoteIssue, updatePriority } = useIssueStore();
  const demoUser = {
    name: "Yash Lal",
    roll: "150096724047"
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === "my-issues") {
      return issue.createdBy.roll === demoUser.roll;
    }
    if (filter === "public") {
      return issue.isPublic;
    }
    return true; // admin sees all issues
  });

  return (
    <div className="space-y-4">
      {filteredIssues.map(issue => (
        <Card key={issue.id} className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{issue.title}</h3>
                <Badge variant={issue.priority === "high" ? "destructive" : "secondary"}>
                  {issue.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{issue.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {issue.estimatedTime || "Not estimated"}
                </span>
                {issue.isPublic && (
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {issue.upvotes}
                  </span>
                )}
              </div>
            </div>

            {filter === "admin" ? (
              <Select
                defaultValue={issue.priority}
                onValueChange={(value) => updatePriority(issue.id, value as "low" | "medium" | "high")}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              issue.isPublic && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => upvoteIssue(issue.id)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Upvote
                </Button>
              )
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}