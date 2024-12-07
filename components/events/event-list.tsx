"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, CheckCircle, XCircle } from "lucide-react";
import { useEventStore } from "@/lib/store/events";
import { addToCalendar } from "@/lib/utils/calendar";
import { sendEventEmail } from "@/lib/utils/email";

interface EventListProps {
  filter: "upcoming" | "my-rsvps" | "club";
  clubId?: string;
}

export function EventList({ filter, clubId }: EventListProps) {
  const { events, clubs, addRSVP } = useEventStore();
  const demoUser = { id: "demo-user", email: "demo@example.com" };

  const filteredEvents = events.filter(event => {
    if (filter === "club" && clubId) {
      return event.clubId === clubId;
    }
    if (filter === "upcoming") {
      return event.status === "upcoming";
    }
    return true;
  });

  const handleRSVP = async (eventId: string, status: 'attending' | 'not-attending') => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    addRSVP({
      eventId,
      userId: demoUser.id,
      status
    });

    if (status === 'attending') {
      await addToCalendar(event);
      await sendEventEmail(demoUser.email, event);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredEvents.map((event) => {
        const club = clubs.find(c => c.id === event.clubId);
        const hasEndDate = event.endDate && event.endTime;
        
        return (
          <Card key={event.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <Badge variant="outline">{club?.name}</Badge>
            </div>
            <p className="text-muted-foreground mb-4">{event.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(event.date).toLocaleDateString()} {event.time}
                  {hasEndDate && ` - ${new Date(event.endDate).toLocaleDateString()} ${event.endTime}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span>{event.registeredCount} / {event.capacity} registered</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="default"
                className="flex-1"
                onClick={() => handleRSVP(event.id, 'attending')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Attend
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleRSVP(event.id, 'not-attending')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}