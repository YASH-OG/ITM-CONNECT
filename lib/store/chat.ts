"use client";

import { create } from 'zustand';

export interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    roll: string;
  };
  channelId: string;
  timestamp: string;
  attachments?: string[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  category: 'general' | 'academic' | 'career' | 'community';
  description: string;
}

interface ChatStore {
  messages: Message[];
  channels: Channel[];
  activeChannel: string;
  setActiveChannel: (channelId: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
}

const defaultChannels: Channel[] = [
  {
    id: 'general',
    name: 'general',
    type: 'text',
    category: 'general',
    description: 'General discussion channel'
  },
  {
    id: 'alumni',
    name: 'alumni',
    type: 'text',
    category: 'community',
    description: 'Connect with ITM alumni'
  },
  {
    id: 'faqs',
    name: 'faqs',
    type: 'text',
    category: 'general',
    description: 'Frequently asked questions'
  },
  {
    id: 'borrow-items',
    name: 'borrow-items',
    type: 'text',
    category: 'community',
    description: 'Request or offer items to borrow'
  },
  {
    id: 'placements',
    name: 'placements',
    type: 'text',
    category: 'career',
    description: 'Placement updates and discussions'
  },
  {
    id: 'startups',
    name: 'startups',
    type: 'text',
    category: 'career',
    description: 'Startup discussions and opportunities'
  },
  {
    id: 'voice-lounge',
    name: 'voice-lounge',
    type: 'voice',
    category: 'general',
    description: 'General voice chat'
  }
];

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  channels: defaultChannels,
  activeChannel: 'general',
  setActiveChannel: (channelId) => set({ activeChannel: channelId }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }]
  }))
}));