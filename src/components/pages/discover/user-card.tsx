"use client";

import { useState } from 'react';
import { Heart, X, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';
import { interests as allInterests } from '@/lib/data';
import type { User } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type UserCardProps = {
  user: User;
  onSwipe: (userId: string, action: 'like' | 'pass') => void;
};

export default function UserCard({ user, onSwipe }: UserCardProps) {
  const [swipeAction, setSwipeAction] = useState<'like' | 'pass' | null>(null);

  const userInterests = user.interests
    .map((interestId) => allInterests.find((i) => i.id === interestId))
    .filter(Boolean);

  const handleSwipe = (action: 'like' | 'pass') => {
    setSwipeAction(action);
    setTimeout(() => onSwipe(user.id, action), 300); // Allow time for animation
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300",
        swipeAction === 'like' && 'transform -translate-y-2 rotate-6 opacity-0',
        swipeAction === 'pass' && 'transform -translate-y-2 -rotate-6 opacity-0',
        !swipeAction && 'hover:shadow-lg hover:-translate-y-1'
      )}
    >
      <div className="relative">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
          data-ai-hint={user.avatarHint}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-white">{user.name}, {user.age}</h3>
            {user.isVerified && <BadgeCheck className="h-5 w-5 text-primary-foreground" fill="hsl(var(--primary))"/>}
          </div>
          <p className="text-sm text-gray-300">{user.location}</p>
        </div>
        {swipeAction && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            {swipeAction === 'like' ? (
              <Heart className="h-24 w-24 text-green-500" fill="currentColor" />
            ) : (
              <X className="h-24 w-24 text-destructive" />
            )}
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground h-10 line-clamp-2">{user.bio}</p>
        <div className="flex flex-wrap gap-2">
          {userInterests.slice(0, 3).map((interest) => interest && (
            <Badge key={interest.id} variant="secondary">
              <interest.icon className="h-3 w-3 mr-1" />
              {interest.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button variant="outline" size="icon" className="w-full h-12 group" onClick={() => handleSwipe('pass')}>
          <X className="h-6 w-6 text-destructive transition-transform group-hover:scale-110" />
        </Button>
        <Button size="icon" className="w-full h-12 bg-green-500 hover:bg-green-600 group" onClick={() => handleSwipe('like')}>
          <Heart className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
        </Button>
      </CardFooter>
    </Card>
  );
}
