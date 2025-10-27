"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BadgeCheck, ShieldCheck } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { User, Interest } from "@/lib/types";
import UserAvatar from "@/components/user-avatar";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.coerce.number().min(18, {
    message: "You must be at least 18 years old.",
  }),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  bio: z.string().max(160).min(4),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one interest.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type ProfileFormProps = {
  user: User;
  interests: Interest[];
};

export default function ProfileForm({ user, interests }: ProfileFormProps) {
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      age: user.age,
      location: user.location,
      bio: user.bio,
      interests: user.interests,
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>This is how you'll appear to others on SameHere.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4">
               <UserAvatar user={user} className="h-20 w-20" />
               <Button type="button" variant="outline">Change Photo</Button>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Your age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
            <CardDescription>Select what you're passionate about.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {interests.map((interest) => (
                      <FormField
                        key={interest.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={interest.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(interest.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, interest.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== interest.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-2">
                                <interest.icon className="h-4 w-4 text-muted-foreground" />
                                {interest.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Verification</CardTitle>
            <CardDescription>Verify your identity to build trust and safety in the community.</CardDescription>
          </CardHeader>
          <CardContent>
             {user.isVerified ? (
                <div className="flex items-center gap-2 text-green-600 p-4 bg-green-50 rounded-lg border border-green-200">
                    <BadgeCheck className="h-5 w-5" />
                    <p className="font-medium">Your account is verified.</p>
                </div>
            ) : (
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-muted-foreground" />
                        <p className="font-medium">Your account is not verified.</p>
                    </div>
                    <Button type="button" variant="outline" className="bg-white">Verify ID</Button>
                </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
