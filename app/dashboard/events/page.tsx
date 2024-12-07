"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventList } from "@/components/events/event-list";
import { EventForm } from "@/components/events/event-form";
import { ClubList } from "@/components/events/club-list";
import { ExpenseTracker } from "@/components/events/expense-tracker";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("clubs");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events</h1>
      </div>

      <Tabs defaultValue="clubs" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="my-rsvps">My RSVPs</TabsTrigger>
          <TabsTrigger value="create">Create Event</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="clubs">
          <ClubList />
        </TabsContent>

        <TabsContent value="upcoming">
          <EventList filter="upcoming" />
        </TabsContent>

        <TabsContent value="my-rsvps">
          <EventList filter="my-rsvps" />
        </TabsContent>

        <TabsContent value="create">
          <EventForm />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpenseTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
}