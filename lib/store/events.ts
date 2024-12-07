"use client";

import { create } from 'zustand';

export interface Event {
  id: string;
  clubId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endDate?: string;
  endTime?: string;
  venue: string;
  capacity: number;
  registeredCount: number;
  budget: number;
  status: 'upcoming' | 'completed';
}

export interface Club {
  id: string;
  name: string;
  description: string;
  coordinator: string;
}

export interface RSVP {
  eventId: string;
  userId: string;
  status: 'attending' | 'not-attending';
}

export interface Expense {
  id: string;
  eventId: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface EventStore {
  clubs: Club[];
  events: Event[];
  rsvps: RSVP[];
  expenses: Expense[];
  addEvent: (event: Omit<Event, 'id' | 'registeredCount'>) => void;
  addRSVP: (rsvp: Omit<RSVP, 'id'>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  clubs: [
    {
      id: 'hackathon',
      name: 'Hackathon Club',
      description: 'Fostering innovation through coding challenges',
      coordinator: 'Prem'
    },
    {
      id: 'placement',
      name: 'Placement Club',
      description: 'Preparing students for successful careers',
      coordinator: 'Rahul Sharma'
    },
    {
      id: 'research',
      name: 'Research & Development Club',
      description: 'Advancing knowledge through research',
      coordinator: 'Arjun Mehta'
    },
    {
      id: 'cultural',
      name: 'Cultural Club',
      description: 'Celebrating diversity through arts',
      coordinator: 'Priya Verma'
    },
    {
      id: 'startup',
      name: 'Start Up Club',
      description: 'Nurturing entrepreneurial spirit',
      coordinator: 'Vikram Singh'
    }
  ],
  events: [
    {
      id: '1',
      clubId: 'hackathon',
      title: 'Buildathon 3.0',
      description: '24-hour hackathon to build innovative solutions. Join us for an exciting journey of coding, creativity, and collaboration.',
      date: '2024-12-06',
      time: '14:00',
      endDate: '2024-12-07',
      endTime: '18:00',
      venue: 'Main Auditorium',
      capacity: 200,
      registeredCount: 0,
      budget: 50000,
      status: 'upcoming'
    }
  ],
  rsvps: [],
  expenses: [],
  
  addEvent: (event) => set((state) => ({
    events: [...state.events, {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      registeredCount: 0
    }]
  })),
  
  addRSVP: (rsvp) => set((state) => ({
    rsvps: [...state.rsvps, rsvp],
    events: state.events.map(event =>
      event.id === rsvp.eventId
        ? { ...event, registeredCount: event.registeredCount + (rsvp.status === 'attending' ? 1 : 0) }
        : event
    )
  })),
  
  addExpense: (expense) => set((state) => ({
    expenses: [...state.expenses, {
      ...expense,
      id: Math.random().toString(36).substr(2, 9)
    }]
  }))
}));