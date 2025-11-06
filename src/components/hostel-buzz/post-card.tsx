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
} from 'lucide-react';
import Image from 'next/image';

import type { Post } from '@/lib/types';
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

interface PostCardProps {
  post: Post;
  onVote: (postId: string, voteType: 'up' | 'down') => void;
}

const categoryIcons = {
  Mess: <Utensils className="h-3 w-3" />,
  Laundry: <Shirt className="h-3 w-3" />,
  Cafe: <Coffee className="h-3 w-3" />,
  General: <Megaphone className="h-3 w-3" />,
};

export default function PostCard({ post, onVote }: PostCardProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })
    );
  }, [post.timestamp]);

  const getInitials = (name: string) => name.charAt(0).toUpperCase();

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
          <CardFooter className="p-4 pt-0">
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 font-medium"
            >
              {categoryIcons[post.category]}
              {post.category}
            </Badge>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
