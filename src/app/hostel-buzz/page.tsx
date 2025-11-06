'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initialPosts } from '@/lib/data';
import type { Post, Category, Comment } from '@/lib/types';
import HostelBuzzHeader from '@/components/hostel-buzz/header';
import NewPostDialog from '@/components/hostel-buzz/new-post-dialog';
import PostCard from '@/components/hostel-buzz/post-card';
import { useToast } from '@/hooks/use-toast';

type FilterCategory = Category | 'All';

export default function HostelBuzzPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filter, setFilter] = useState<FilterCategory>('All');
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [router]);

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
    newPost: Omit<Post, 'id' | 'author' | 'timestamp' | 'votes' | 'comments'>
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
      comments: [],
      ...newPost,
    };
    setPosts([post, ...posts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    toast({
      title: 'Post created!',
      description: 'Your update is now live on the feed.',
    });
  };

  const handleReport = (postId: string) => {
    console.log(`Reported post ${postId}`);
    toast({
      title: 'Post Reported',
      description: 'Thank you for your feedback. We will review this post.',
    });
  };

  const handleComment = (postId: string, commentText: string) => {
    const newUser = {
      id: 'user-5',
      name: 'You',
      avatarUrl: 'https://picsum.photos/seed/you/40/40',
    };
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: newUser,
      content: commentText,
      timestamp: new Date(),
    };
    setPosts(
      posts.map(p => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      })
    );
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
                <PostCard
                  key={post.id}
                  post={post}
                  onVote={handleVote}
                  onReport={handleReport}
                  onComment={handleComment}
                />
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
