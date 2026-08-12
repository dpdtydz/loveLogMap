/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, MemoryPlace, CoupleTrip, PlannerItem, QuickMessage } from '../types';

export const defaultUsers: UserProfile[] = [
  {
    id: 'user1',
    username: 'my.footsteps',
    nickname: '나 ❤️',
    avatar: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=150&auto=format&fit=crop',
    color: '#0ea5e9' // Sky blue
  },
  {
    id: 'user2',
    username: 'our.footsteps',
    nickname: '짝꿍 🌸',
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=150&auto=format&fit=crop',
    color: '#ec4899' // Pink
  }
];

export const defaultTrips: CoupleTrip[] = [];

export const defaultMemories: MemoryPlace[] = [];

export const defaultPlanner: PlannerItem[] = [];

export const defaultMessages: QuickMessage[] = [];
