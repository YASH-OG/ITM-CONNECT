"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEventStore } from "@/lib/store/events";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EventForm() {
  const router = useRouter();
  const { clubs, addEvent } = useEventStore();
  const [formData, setFormData] = useState({
    clubId: "",
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    capacity: "",
    budget: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addEvent({
      ...formData,
      capacity: parseInt(formData.capacity),
      budget: parseInt(formData.budget),
      status: 'upcoming'
    });

    router.push("/dashboard/events?tab=upcoming");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label>Club</Label>
        <Select onValueChange={(value) => handleChange("clubId", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select club" />
          </SelectTrigger>
          <SelectContent>
            {clubs.map(club => (
              <SelectItem key={club.id} value={club.id}>
                {club.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Event Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter event title"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe the event"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => handleChange("time", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Venue</Label>
        <Input
          value={formData.venue}
          onChange={(e) => handleChange("venue", e.target.value)}
          placeholder="Event venue"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Capacity</Label>
          <Input
            type="number"
            value={formData.capacity}
            onChange={(e) => handleChange("capacity", e.target.value)}
            placeholder="Maximum participants"
          />
        </div>
        <div className="space-y-2">
          <Label>Budget (₹)</Label>
          <Input
            type="number"
            value={formData.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            placeholder="Event budget"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Event
      </Button>
    </form>
  );
}