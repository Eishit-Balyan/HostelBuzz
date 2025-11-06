'use client';

import { Bell, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Category } from '@/lib/types';

interface HostelBuzzHeaderProps {
  activeCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
}

const categories: (Category | 'All')[] = [
  'All',
  'Mess',
  'Laundry',
  'Cafe',
  'General',
];

export default function HostelBuzzHeader({
  activeCategory,
  onCategoryChange,
}: HostelBuzzHeaderProps) {
  return (
    <header className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Wind className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">
            HostelBuzz
          </h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
      <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-primary/20">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </header>
  );
}
