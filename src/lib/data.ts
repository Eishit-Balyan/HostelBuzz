import type { Post, User } from './types';
import { PlaceHolderImages } from './placeholder-images';

const avatarUrls = PlaceHolderImages.reduce((acc, img) => {
  acc[img.id] = img.imageUrl;
  return acc;
}, {} as Record<string, string>);

export const users: User[] = [
  { id: 'user-1', name: 'Alex', avatarUrl: avatarUrls['avatar-1'] },
  { id: 'user-2', name: 'Mia', avatarUrl: avatarUrls['avatar-2'] },
  { id: 'user-3', name: 'Chris', avatarUrl: avatarUrls['avatar-3'] },
  { id: 'user-4', name: 'Sarah', avatarUrl: avatarUrls['avatar-4'] },
];

export const initialPosts: Post[] = [
  {
    id: 'post-1',
    author: users[0],
    content:
      'Just a heads up, the washing machine on the 2nd floor is out of order. Reported it to the warden.',
    category: 'Laundry',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    votes: 12,
  },
  {
    id: 'post-2',
    author: users[1],
    content:
      "Tonight's mess menu: Paneer Butter Masala, Dal Makhani, and Jeera Rice. Gulab Jamun for dessert! 😋",
    category: 'Mess',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    votes: 42,
  },
  {
    id: 'post-3',
    author: users[2],
    content:
      'The cafe has a special on cold coffee today. Buy one get one free until 5 PM!',
    category: 'Cafe',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    votes: 28,
  },
  {
    id: 'post-4',
    author: users[3],
    content:
      'Found a lost ID card near the main gate. Belongs to Rohan Sharma, Room 301. Please collect from the security desk.',
    category: 'General',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    votes: 15,
  },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
