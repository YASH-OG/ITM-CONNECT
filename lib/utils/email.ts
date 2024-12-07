"use client";

import type { Event } from "@/lib/store/events";

export async function sendEventEmail(email: string, event: Event) {
  // For demo, just log the email details
  console.log('Event confirmation email sent to:', email, {
    subject: `Event Registration: ${event.title}`,
    event: event
  });
}