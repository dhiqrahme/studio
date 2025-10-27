import FilterControls from '@/components/pages/discover/filter-controls';
import UserCard from '@/components/pages/discover/user-card';
import { users, interests } from '@/lib/data';

export const metadata = {
  title: 'Discover | SameHere',
};

export default function DiscoverPage() {
  const interestsForClient = interests.map(({ icon, ...rest }) => rest);
  
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
