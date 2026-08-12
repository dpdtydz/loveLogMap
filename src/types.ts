/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserComment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface MemoryPlace {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  photoUrl: string;
  rating: number; // 1 to 5
  comments: UserComment[];
  visitDate: string;
  category: 'food' | 'cafe' | 'activity' | 'stay' | 'scenery' | 'other';
  createdBy: string; // user ID
  tripId?: string; // Links to a cohesive trip
}

export interface CoupleTrip {
  id: string;
  name: string;
  emoji: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  color: string;
}

export interface PlannerItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  category: 'checklist' | 'bucket' | 'budget';
  amount?: number; // for budget
  createdBy: string;
}

export interface QuickMessage {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
}
