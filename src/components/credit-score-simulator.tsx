'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Beaker, Loader2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { getCreditScoreSimulation } from '@/app/actions';
import type { SimulateCreditScoreImpactOutput } from '@/ai/flows/simulate-credit-score-impact';

const formSchema = z.object({
  transactionVolume: z.number().min(0).max(100000),
  transactionFrequency: z.number().min(0).max(200),
  daoParticipation: z.number().min(0).max(100),
  defiUsage: z.number().min(0).max(100),
  verifiedIdentity: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export default function CreditScoreSimulator() {
  const [simulationResult, setSimulationResult] =
    useState<SimulateCreditScoreImpactOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionVolume: 15000,
      transactionFrequency: 40,
      daoParticipation: 50,
      defiUsage: 75,
      verifiedIdentity: true,
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setSimulationResult(null);
    const result = await getCreditScoreSimulation(data);
    setSimulationResult(result);
    setIsLoading(false);
  };

  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beaker className="h-6 w-6 text-accent" />
          Credit Score Simulator
        </CardTitle>
        <CardDescription>
          See how changes in your on-chain behavior could impact your credit
          score.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <Controller
            name="transactionVolume"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="volume" className="flex justify-between">
                  <span>Transaction Volume (USD)</span>
                  <span className="font-semibold text-primary">
                    ${field.value.toLocaleString()}
                  </span>
                </Label>
                <Slider
                  id="volume"
                  min={0}
                  max={100000}
                  step={1000}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  disabled={isLoading}
                />
              </div>
            )}
          />

          <Controller
            name="transactionFrequency"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="frequency" className="flex justify-between">
                  <span>Transaction Frequency (per month)</span>
                  <span className="font-semibold text-primary">
                    {field.value}
                  </span>
                </Label>
                <Slider
                  id="frequency"
                  min={0}
                  max={200}
                  step={5}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  disabled={isLoading}
                />
              </div>
            )}
          />

          <Controller
            name="daoParticipation"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label
                  htmlFor="dao-participation"
                  className="flex justify-between"
                >
                  <span>DAO Participation</span>
                  <span className="font-semibold text-primary">
                    {field.value}%
                  </span>
                </Label>
                <Slider
                  id="dao-participation"
                  min={0}
                  max={100}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  disabled={isLoading}
                />
              </div>
            )}
          />
          <Controller
            name="defiUsage"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="defi-usage" className="flex justify-between">
                  <span>DeFi Protocol Usage</span>
                  <span className="font-semibold text-primary">
                    {field.value}%
                  </span>
                </Label>
                <Slider
                  id="defi-usage"
                  min={0}
                  max={100}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  disabled={isLoading}
                />
              </div>
            )}
          />

          <Controller
            name="verifiedIdentity"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <Label htmlFor="verified-identity">Verified Identity</Label>
                <Switch
                  id="verified-identity"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </div>
            )}
          />
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? 'Simulating...' : 'Simulate Score Impact'}
          </Button>

          {simulationResult && (
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-center">
                  Simulated Score:{' '}
                  <span className="text-accent">
                    {simulationResult.simulatedCreditScore}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {simulationResult.explanation}
                </p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
