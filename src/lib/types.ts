export type Category = 'Laundry' | 'Mess' | 'Cafe' | 'General';

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Comment = {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
};

export type Post = {
  id: string;
  author: User;
  content: string;
  category: Category;
  timestamp: Date;
  votes: number;
  comments: Comment[];
};
