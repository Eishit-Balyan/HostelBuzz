'use client';

import { useState } from 'react';
import { initialPosts } from '@/lib/data';
import type { Post, Category } from '@/lib/types';
import HostelBuzzHeader from '@/components/hostel-buzz/header';
import NewPostDialog from '@/components/hostel-buzz/new-post-dialog';
import PostCard from '@/components/hostel-buzz/post-card';
import { useToast } from '@/hooks/use-toast';

type FilterCategory = Category | 'All';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filter, setFilter] = useState<FilterCategory>('All');
  const { toast } = useToast();

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(
      posts.map(p => {
        if (p.id === postId) {
          return { ...p, votes: p.votes + (voteType === 'up' ? 1 : -1) };
        }
        return p;
      })
    );
  };

  const handleAddPost = (
    newPost: Omit<Post, 'id' | 'author' | 'timestamp' | 'votes'>
  ) => {
    const newUser = {
      id: 'user-5',
      name: 'You',
      avatarUrl: 'https://picsum.photos/seed/you/40/40',
    };
    const post: Post = {
      id: `post-${Date.now()}`,
      author: newUser,
      timestamp: new Date(),
      votes: 1,
      ...newPost,
    };
    setPosts([post, ...posts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    toast({
      title: 'Post created!',
      description: 'Your update is now live on the feed.',
    });
  };

  const filteredPosts =
    filter === 'All' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="container mx-auto max-w-3xl flex-1 p-4 sm:p-6 md:p-8">
        <HostelBuzzHeader
          activeCategory={filter}
          onCategoryChange={cat => setFilter(cat as FilterCategory)}
        />
        <main className="mt-6">
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} onVote={handleVote} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No posts in this category yet.</p>
              <p>Be the first to share an update!</p>
            </div>
          )}
        </main>
      </div>
      <NewPostDialog onAddPost={handleAddPost} />
    </div>
  );
}
