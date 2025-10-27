import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type UserAvatarProps = {
  user: User;
  className?: string;
};

export default function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <div className="relative inline-block">
      <Avatar className={cn('border-2 border-background', className)}>
        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.avatarHint} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {user.isVerified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute bottom-0 right-0 rounded-full bg-background p-0.5">
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Verified User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
