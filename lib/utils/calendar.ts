"use client";

import type { Event } from "@/lib/store/events";

export async function addToCalendar(event: Event) {
  const startTime = new Date(`${event.date}T${event.time}`);
  const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

  const calendarEvent = {
    title: event.title,
    description: event.description,
    location: event.venue,
    start: startTime,
    end: endTime
  };

  // For demo, just log the calendar event
  console.log('Added to calendar:', calendarEvent);
}