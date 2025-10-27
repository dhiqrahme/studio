"use server";

import { syncCirclesFacilitation, type SyncCirclesInput, type SyncCirclesOutput } from "@/ai/flows/sync-circles-facilitation";
import { z } from "zod";

const SyncCirclesActionSchema = z.object({
  friends: z.array(z.string()).min(1, "Please select at least one friend."),
  timeConstraints: z.string().min(1, "Please provide time constraints."),
  locationConstraints: z.string().min(1, "Please provide location constraints."),
  activityPreferences: z.string().min(1, "Please provide activity preferences."),
});

type SyncCirclesState = {
  form: {
    friends: string[];
    timeConstraints: string;
    locationConstraints: string;
    activityPreferences: string;
  },
  status: 'default' | 'loading' | 'success' | 'error';
  result?: SyncCirclesOutput;
  error?: string;
}

export async function generateMeetupPlan(prevState: SyncCirclesState, formData: FormData): Promise<SyncCirclesState> {
  const rawFormData = {
    friends: formData.getAll("friends") as string[],
    timeConstraints: formData.get("timeConstraints") as string,
    locationConstraints: formData.get("locationConstraints") as string,
    activityPreferences: formData.get("activityPreferences") as string,
  };

  const validatedFields = SyncCirclesActionSchema.safeParse(rawFormData);
  
  if (!validatedFields.success) {
    return {
      ...prevState,
      status: 'error',
      error: validatedFields.error.flatten().fieldErrors.friends?.[0] || 'Invalid form data.',
      form: rawFormData,
    };
  }

  try {
    const result = await syncCirclesFacilitation(validatedFields.data);
    return {
      ...prevState,
      status: 'success',
      result: result,
      form: rawFormData,
    };
  } catch (error) {
    return {
      ...prevState,
      status: 'error',
      error: "Failed to generate a meetup plan. Please try again.",
      form: rawFormData,
    };
  }
}
