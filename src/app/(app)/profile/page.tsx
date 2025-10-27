import ProfileForm from "@/components/pages/profile/profile-form";
import { currentUser, interests } from "@/lib/data";

export const metadata = {
  title: 'My Profile | SameHere',
};

export default function ProfilePage() {
  const interestsForClient = interests.map(({ icon, ...rest }) => rest);

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Keep your profile up to date to get the best matches.
          </p>
        </header>
        <ProfileForm user={currentUser} interests={interests} />
      </div>
    </div>
  );
}
