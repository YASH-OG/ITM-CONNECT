"use client";

import { create } from 'zustand';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link?: string;
  author: {
    id: string;
    name: string;
    roll: string;
    points: number;
  };
  upvotes: string[]; // Array of user IDs who upvoted
  createdAt: string;
  tags: string[];
}

interface ResourceStore {
  resources: Resource[];
  following: Set<string>; // Set of user IDs being followed
  addResource: (resource: Omit<Resource, 'id' | 'upvotes' | 'createdAt'>) => void;
  upvoteResource: (resourceId: string, userId: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resources: [
    {
      id: '1',
      title: 'Complete Web Development Roadmap',
      description: 'A comprehensive guide to becoming a full-stack developer in 2024',
      category: 'Programming',
      link: 'https://example.com/webdev-roadmap',
      author: {
        id: 'user1',
        name: 'Yash Lal',
        roll: '150096724047',
        points: 150
      },
      upvotes: [],
      createdAt: new Date().toISOString(),
      tags: ['web development', 'programming', 'career']
    }
  ],
  following: new Set(),

  addResource: (resource) => set((state) => ({
    resources: [
      {
        ...resource,
        id: Math.random().toString(36).substr(2, 9),
        upvotes: [],
        createdAt: new Date().toISOString()
      },
      ...state.resources
    ]
  })),

  upvoteResource: (resourceId, userId) => set((state) => ({
    resources: state.resources.map(resource => {
      if (resource.id === resourceId) {
        const hasUpvoted = resource.upvotes.includes(userId);
        const newUpvotes = hasUpvoted
          ? resource.upvotes.filter(id => id !== userId)
          : [...resource.upvotes, userId];
        
        return {
          ...resource,
          upvotes: newUpvotes,
          author: {
            ...resource.author,
            points: resource.author.points + (hasUpvoted ? -1 : 1)
          }
        };
      }
      return resource;
    })
  })),

  followUser: (userId) => set((state) => ({
    following: new Set([...state.following, userId])
  })),

  unfollowUser: (userId) => set((state) => {
    const newFollowing = new Set(state.following);
    newFollowing.delete(userId);
    return { following: newFollowing };
  })
}));