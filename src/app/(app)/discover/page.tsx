"use client";

import { useState } from 'react';
import FilterControls from '@/components/pages/discover/filter-controls';
import UserCard from '@/components/pages/discover/user-card';
import { users as initialUsers, interests } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function DiscoverPage() {
  const [users, setUsers] = useState(initialUsers);
  
  const interestsForClient = interests.map(({ icon, ...rest }) => rest);

  const handleSwipe = (userId: string, action: 'like' | 'pass') => {
    // In a real app, you'd send this to a server.
    console.log(`User ${userId} was ${action}d.`);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };
  
  const resetUsers = () => {
    setUsers(initialUsers);
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Discover New Friends</h1>
          <p className="text-muted-foreground">
            Filter and find people who share your interests.
          </p>
        </header>
        <FilterControls interests={interestsForClient} />
        {users.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} onSwipe={handleSwipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">That's everyone for now!</h2>
            <p className="text-muted-foreground mt-2">Check back later for new people.</p>
            <Button onClick={resetUsers} className="mt-4">
              Reset Users
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
