
"use client";

import { useActionState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PartyPopper } from "lucide-react";

import { generateMeetupPlan } from "@/actions/sync-circles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { User } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  friends: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one friend.",
  }),
  timeConstraints: z.string().min(5, "Please be more specific."),
  locationConstraints: z.string().min(5, "Please be more specific."),
  activityPreferences: z.string().min(5, "Please be more specific."),
});

type FormValues = z.infer<typeof formSchema>;

const initialState = {
  form: {
    friends: [],
    timeConstraints: "",
    locationConstraints: "",
    activityPreferences: "",
  },
  status: "default" as const,
};

export default function SyncCirclesForm({ friends }: { friends: User[] }) {
  const [state, formAction] = useActionState(generateMeetupPlan, initialState);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      friends: [],
      timeConstraints: "This weekend",
      locationConstraints: "Downtown",
      activityPreferences: "Casual hangout or coffee",
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <Form {...form}>
          <form
            action={formAction}
            onSubmit={form.handleSubmit((data) => {
              const formData = new FormData();
              data.friends.forEach((friend) => formData.append("friends", friend));
              formData.append("timeConstraints", data.timeConstraints);
              formData.append("locationConstraints", data.locationConstraints);
              formData.append("activityPreferences", data.activityPreferences);
              formAction(formData);
            })}
          >
            <CardHeader>
              <CardTitle>Plan Your Meetup</CardTitle>
              <CardDescription>
                Fill in the details and let AI handle the coordination.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="friends"
                render={() => (
                  <FormItem>
                    <FormLabel>Friends</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {friends.slice(0, 8).map((friend) => (
                        <FormField
                          key={friend.id}
                          control={form.control}
                          name="friends"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(friend.name)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, friend.name])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== friend.name
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {friend.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeConstraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Constraints</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Any weekday evening', 'This weekend'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationConstraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Constraints</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Downtown', 'Near a park'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activityPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Coffee', 'Casual hangout', 'Sports'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4">
              <SubmitButton />
              {state.status === "error" && state.error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>

      {state.status === "loading" && (
        <div className="flex items-center justify-center rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating your ideal meetup plan...</p>
          </div>
        </div>
      )}

      {state.status === "success" && state.result && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PartyPopper className="h-6 w-6 text-accent" />
              Here's Your Plan!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Meetup Plan</h3>
              <p className="text-muted-foreground">{state.result.meetupPlan}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg">Reasoning</h3>
              <p className="text-muted-foreground">{state.result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SubmitButton() {
    const { formState } = useForm();
    return (
        <Button type="submit" disabled={formState.isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {formState.isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : "Generate Plan"}
        </Button>
    );
}

