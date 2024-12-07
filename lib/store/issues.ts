"use client";

import { create } from 'zustand';

export interface Issue {
  id: number;
  title: string;
  category: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  isPublic: boolean;
  upvotes: number;
  createdAt: string;
  estimatedTime?: string;
  createdBy: {
    name: string;
    roll: string;
  };
}

interface IssueStore {
  issues: Issue[];
  addIssue: (issue: Omit<Issue, 'id' | 'upvotes' | 'createdAt'>) => void;
  upvoteIssue: (id: number) => void;
  updatePriority: (id: number, priority: Issue['priority']) => void;
}

export const useIssueStore = create<IssueStore>((set) => ({
  issues: [
    {
      id: 1,
      title: "Faulty Projector in Room 301",
      category: "Infrastructure",
      description: "The projector in Room 301 is not working properly...",
      status: "pending",
      priority: "high",
      isPublic: true,
      upvotes: 15,
      createdAt: "2024-03-20",
      estimatedTime: "2 days",
      createdBy: {
        name: "Yash Lal",
        roll: "150096724047"
      }
    },
    {
      id: 2,
      title: "Wi-Fi Connectivity Issues",
      category: "Technical",
      description: "Frequent Wi-Fi disconnections in the library...",
      status: "in-progress",
      priority: "medium",
      isPublic: true,
      upvotes: 8,
      createdAt: "2024-03-19",
      estimatedTime: "1 day",
      createdBy: {
        name: "Yash Lal",
        roll: "150096724047"
      }
    }
  ],
  addIssue: (issue) => set((state) => ({
    issues: [...state.issues, {
      ...issue,
      id: state.issues.length + 1,
      upvotes: 0,
      createdAt: new Date().toISOString(),
    }]
  })),
  upvoteIssue: (id) => set((state) => ({
    issues: state.issues.map(issue =>
      issue.id === id ? { ...issue, upvotes: issue.upvotes + 1 } : issue
    )
  })),
  updatePriority: (id, priority) => set((state) => ({
    issues: state.issues.map(issue =>
      issue.id === id ? { ...issue, priority } : issue
    )
  }))
}));