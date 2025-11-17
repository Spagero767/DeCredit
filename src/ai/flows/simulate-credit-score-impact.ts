'use server';
/**
 * @fileOverview Simulates the impact of different on-chain activities on a user's credit score.
 *
 * - simulateCreditScoreImpact - A function that simulates the impact of on-chain activities on a credit score.
 * - SimulateCreditScoreImpactInput - The input type for the simulateCreditScoreImpact function.
 * - SimulateCreditScoreImpactOutput - The return type for the simulateCreditScoreImpact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateCreditScoreImpactInputSchema = z.object({
  transactionVolume: z.number().describe('The volume of transactions in USD.'),
  transactionFrequency: z.number().describe('The frequency of transactions per month.'),
  daoParticipation: z.number().describe('The level of participation in DAOs (0-100).'),
  defiUsage: z.number().describe('The extent of DeFi protocol usage (0-100).'),
  verifiedIdentity: z.boolean().describe('Whether the user has a verified identity.'),
});
export type SimulateCreditScoreImpactInput = z.infer<typeof SimulateCreditScoreImpactInputSchema>;

const SimulateCreditScoreImpactOutputSchema = z.object({
  simulatedCreditScore: z.number().describe('The simulated credit score based on the input parameters.'),
  explanation: z.string().describe('An explanation of how the input parameters affected the credit score.'),
});
export type SimulateCreditScoreImpactOutput = z.infer<typeof SimulateCreditScoreImpactOutputSchema>;

export async function simulateCreditScoreImpact(input: SimulateCreditScoreImpactInput): Promise<SimulateCreditScoreImpactOutput> {
  return simulateCreditScoreImpactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateCreditScoreImpactPrompt',
  input: {schema: SimulateCreditScoreImpactInputSchema},
  output: {schema: SimulateCreditScoreImpactOutputSchema},
  prompt: `You are a credit scoring expert specializing in decentralized finance.

  Based on the following on-chain activity parameters, simulate a credit score between 0 and 1000, and explain how each parameter affected the score.

  Transaction Volume: {{transactionVolume}} USD
  Transaction Frequency: {{transactionFrequency}} per month
  DAO Participation: {{daoParticipation}} (0-100)
  DeFi Usage: {{defiUsage}} (0-100)
  Verified Identity: {{verifiedIdentity}}

  Consider these factors when determining the credit score:
  - Higher transaction volume and frequency generally indicate greater financial activity and trustworthiness.
  - Active participation in DAOs and DeFi protocols can reflect engagement with the decentralized ecosystem.
  - A verified identity can increase the reliability of the credit profile.

  Output the simulated credit score and a brief explanation of how the parameters influenced the score.
  `,
});

const simulateCreditScoreImpactFlow = ai.defineFlow(
  {
    name: 'simulateCreditScoreImpactFlow',
    inputSchema: SimulateCreditScoreImpactInputSchema,
    outputSchema: SimulateCreditScoreImpactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
