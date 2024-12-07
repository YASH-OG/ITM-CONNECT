"use client";

import { useState } from "react";
import { IssueForm } from "@/components/issues/issue-form";
import { IssueList } from "@/components/issues/issue-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function IssuesPage() {
  const [activeTab, setActiveTab] = useState("raise");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Issue Management</h1>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="raise" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="raise">Raise Issue</TabsTrigger>
            <TabsTrigger value="my-issues">My Issues</TabsTrigger>
            <TabsTrigger value="public">Public Issues</TabsTrigger>
            <TabsTrigger value="admin">Admin Panel</TabsTrigger>
          </TabsList>

          <TabsContent value="raise" className="space-y-4">
            <IssueForm />
          </TabsContent>

          <TabsContent value="my-issues">
            <IssueList filter="my-issues" />
          </TabsContent>

          <TabsContent value="public">
            <IssueList filter="public" />
          </TabsContent>

          <TabsContent value="admin">
            <IssueList filter="admin" />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}