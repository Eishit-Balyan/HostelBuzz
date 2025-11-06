'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { Post, Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

const categories: Category[] = ['Mess', 'Laundry', 'Cafe', 'General'];

const postSchema = z.object({
  content: z
    .string()
    .min(10, 'Post must be at least 10 characters long.')
    .max(280, 'Post cannot be longer than 280 characters.'),
  category: z.enum(categories),
});

type PostFormValues = z.infer<typeof postSchema>;

interface NewPostDialogProps {
  onAddPost: (
    post: Omit<Post, 'id' | 'author' | 'timestamp' | 'votes' | 'comments'>
  ) => void;
}

export default function NewPostDialog({ onAddPost }: NewPostDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: '',
      category: 'General',
    },
  });

  function onSubmit(data: PostFormValues) {
    onAddPost(data);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110 hover:bg-accent/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          size="icon"
          aria-label="Create new post"
        >
          <Plus className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>
            Share an update with the hostel community. Keep it short and to the
            point.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's the buzz?"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {categories.map(cat => (
                        <FormItem
                          key={cat}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={cat} />
                          </FormControl>
                          <FormLabel className="font-normal">{cat}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Post Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
