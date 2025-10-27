'use server';

/**
 * @fileOverview A flow that suggests optimal meet-up plans with matched friends based on user-provided constraints like time and location.
 *
 * - syncCirclesFacilitation - A function that handles the meet-up plan generation.
 * - SyncCirclesInput - The input type for the syncCirclesFacilitation function.
 * - SyncCirclesOutput - The return type for the syncCirclesFacilitation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SyncCirclesInputSchema = z.object({
  friends: z
    .array(z.string())
    .describe('A list of names of matched friends.'),
  timeConstraints: z
    .string()
    .describe(
      'Constraints of time for meetup, e.g., 3PM on Friday, or any weekday evening.'
    ),
  locationConstraints: z
    .string()
    .describe(
      'Location constraints for the meetup, e.g., downtown, or near a park.'
    ),
  activityPreferences: z
    .string()
    .describe(
      'Preferred activities for the meetup, e.g., coffee, casual hangout, or sports.'
    ),
});
export type SyncCirclesInput = z.infer<typeof SyncCirclesInputSchema>;

const SyncCirclesOutputSchema = z.object({
  meetupPlan: z
    .string()
    .describe(
      'A detailed meetup plan including time, location, and suggested activities.'
    ),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the suggested plan.'),
});
export type SyncCirclesOutput = z.infer<typeof SyncCirclesOutputSchema>;

export async function syncCirclesFacilitation(
  input: SyncCirclesInput
): Promise<SyncCirclesOutput> {
  return syncCirclesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'syncCirclesPrompt',
  input: {schema: SyncCirclesInputSchema},
  output: {schema: SyncCirclesOutputSchema},
  prompt: `You are a helpful assistant designed to create an optimal meet-up plan for a group of friends.

  Given the following constraints and preferences, please generate a detailed plan including a specific time, location, and activity suggestions.

  Friends: {{{friends}}}
  Time Constraints: {{{timeConstraints}}}
  Location Constraints: {{{locationConstraints}}}
  Activity Preferences: {{{activityPreferences}}}

  The meetup plan should be realistic and consider the provided constraints. Include a brief reasoning for why the plan is optimal.

  Output:
  Meetup Plan: (A detailed plan with time, location and activities)
  Reasoning: (Why this plan is optimal given the constraints)`,
});

const syncCirclesFlow = ai.defineFlow(
  {
    name: 'syncCirclesFlow',
    inputSchema: SyncCirclesInputSchema,
    outputSchema: SyncCirclesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
