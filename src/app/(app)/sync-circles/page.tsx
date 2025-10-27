import SyncCirclesForm from "@/components/pages/sync-circles/sync-circles-form";
import { users } from "@/lib/data";
import { currentUser } from "@/lib/data";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: 'Sync Circles | SameHere',
};

export default function SyncCirclesPage() {
    // For demo purposes, we'll assume all users are "matched friends".
    const friends = users.filter(user => user.id !== currentUser.id);

    return (
        <div className="container mx-auto max-w-4xl">
            <div className="space-y-6">
                <header className="space-y-2 text-center">
                    <Sparkles className="mx-auto h-12 w-12 text-accent" />
                    <h1 className="text-3xl font-bold tracking-tight">Sync Circles</h1>
                    <p className="text-muted-foreground">
                        Let our AI assistant help you plan the perfect meetup with your friends.
                    </p>
                </header>
                <SyncCirclesForm friends={friends} />
            </div>
        </div>
    );
}
