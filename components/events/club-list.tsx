"use client";

import { Card } from "@/components/ui/card";
import { useEventStore } from "@/lib/store/events";
import { Users } from "lucide-react";
import { EventList } from "./event-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ClubList() {
  const { clubs } = useEventStore();

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {clubs.map((club) => (
        <AccordionItem key={club.id} value={club.id}>
          <Card className="p-6">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold">{club.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {club.description}
                </p>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {club.coordinator}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <h4 className="font-semibold mb-4">Club Events</h4>
              <EventList filter="club" clubId={club.id} />
            </AccordionContent>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
}