"use client";

import { useState } from "react";
import { ResourceList } from "@/components/resources/resource-list";
import { ResourceForm } from "@/components/resources/resource-form";
import { Leaderboard } from "@/components/resources/leaderboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resources</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="p-6">
            <Tabs defaultValue="browse" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="browse">Browse</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="share">Share</TabsTrigger>
              </TabsList>

              <TabsContent value="browse">
                <ResourceList filter="all" />
              </TabsContent>

              <TabsContent value="following">
                <ResourceList filter="following" />
              </TabsContent>

              <TabsContent value="share">
                <ResourceForm />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}