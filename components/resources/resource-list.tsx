"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, UserPlus, UserMinus } from "lucide-react";
import { useResourceStore } from "@/lib/store/resources";

interface ResourceListProps {
  filter: "all" | "following";
}

export function ResourceList({ filter }: ResourceListProps) {
  const { resources, following, upvoteResource, followUser, unfollowUser } = useResourceStore();
  const demoUser = { id: "demo-user", name: "Demo User" };

  const filteredResources = filter === "following"
    ? resources.filter(resource => following.has(resource.author.id))
    : resources;

  const sortedResources = [...filteredResources].sort(
    (a, b) => b.upvotes.length - a.upvotes.length
  );

  return (
    <div className="space-y-4">
      {sortedResources.map((resource) => {
        const isFollowing = following.has(resource.author.id);
        const hasUpvoted = resource.upvotes.includes(demoUser.id);

        return (
          <Card key={resource.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Shared by {resource.author.name}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => isFollowing 
                  ? unfollowUser(resource.author.id)
                  : followUser(resource.author.id)
                }
              >
                {isFollowing ? (
                  <UserMinus className="h-4 w-4 mr-2" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </div>

            <p className="text-muted-foreground mb-4">{resource.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant={hasUpvoted ? "default" : "outline"}
                size="sm"
                onClick={() => upvoteResource(resource.id, demoUser.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                {resource.upvotes.length} Upvotes
              </Button>

              {resource.link && (
                <Button variant="link" asChild>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    View Resource
                  </a>
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}