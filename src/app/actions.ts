'use server';

import {
  simulateCreditScoreImpact,
  type SimulateCreditScoreImpactInput,
  type SimulateCreditScoreImpactOutput,
} from '@/ai/flows/simulate-credit-score-impact';

export async function getCreditScoreSimulation(
  input: SimulateCreditScoreImpactInput
): Promise<SimulateCreditScoreImpactOutput> {
  try {
    const result = await simulateCreditScoreImpact(input);
    return result;
  } catch (error) {
    console.error('Error in credit score simulation:', error);
    // Return a structured error response
    return {
      simulatedCreditScore: 0,
      explanation:
        'An error occurred while running the simulation. Please try again later.',
    };
  }
}
