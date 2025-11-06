'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowDown,
  ArrowUp,
  Utensils,
  Shirt,
  Coffee,
  Megaphone,
  Flag,
  MessageCircle,
} from 'lucide-react';
import Image from 'next/image';

import type { Post, Comment } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

interface PostCardProps {
  post: Post;
  onVote: (postId: string, voteType: 'up' | 'down') => void;
  onReport: (postId: string) => void;
  onComment: (postId: string, commentText: string) => void;
}

const categoryIcons = {
  Mess: <Utensils className="h-3 w-3" />,
  Laundry: <Shirt className="h-3 w-3" />,
  Cafe: <Coffee className="h-3 w-3" />,
  General: <Megaphone className="h-3 w-3" />,
};

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
        <AvatarFallback>
          {comment.author.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="text-sm">
          <span className="font-semibold text-foreground">
            {comment.author.name}
          </span>
          <span className="text-muted-foreground ml-2">
            {formatDistanceToNow(new Date(comment.timestamp), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-sm text-foreground/90">{comment.content}</p>
      </div>
    </div>
  );
}

export default function PostCard({ post, onVote, onReport, onComment }: PostCardProps) {
  const [timeAgo, setTimeAgo] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })
    );
    const interval = setInterval(() => {
      setTimeAgo(
        formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })
      );
    }, 60000);
    return () => clearInterval(interval);
  }, [post.timestamp]);

  const getInitials = (name: string) => name.charAt(0).toUpperCase();

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex">
        <div className="flex flex-col items-center justify-start space-y-1 bg-muted/50 p-2 sm:p-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0 text-muted-foreground transition-all hover:text-accent-foreground hover:bg-accent/50 active:scale-90"
            onClick={() => onVote(post.id, 'up')}
            aria-label="Upvote"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span
            className="text-base font-bold text-foreground"
            aria-label={`${post.votes} votes`}
          >
            {post.votes}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0 text-muted-foreground transition-all hover:text-primary-foreground hover:bg-primary/80 active:scale-90"
            onClick={() => onVote(post.id, 'down')}
            aria-label="Downvote"
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1">
          <CardHeader className="flex-row items-center gap-3 space-y-0 p-4">
            <Avatar className="h-8 w-8">
              <AvatarImage asChild src={post.author.avatarUrl} alt={post.author.name}>
                <Image src={post.author.avatarUrl} alt={post.author.name} width={32} height={32} data-ai-hint="person portrait" />
              </AvatarImage>
              <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
            </Avatar>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {post.author.name}
              </span>
              <span className="mx-1.5">•</span>
              <span>{timeAgo || '...'}</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-foreground/90">{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 font-medium"
            >
              {categoryIcons[post.category]}
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments.length}</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onReport(post.id)}>
                <Flag className="h-4 w-4" />
                <span className="sr-only">Report</span>
              </Button>
            </div>
          </CardFooter>

          {showComments && (
            <div className="px-4 pb-4">
              <Separator className="my-4" />
              <div className="space-y-4">
                {post.comments.length > 0 ? (
                  post.comments.map(comment => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No comments yet.</p>
                )}
                <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/seed/you/40/40" alt="You" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="h-9 flex-1"
                  />
                  <Button type="submit" size="sm">Post</Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
