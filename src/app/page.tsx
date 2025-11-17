import type { SVGProps } from 'react';
import {
  DollarSign,
  Repeat,
  Users,
  GitCommitHorizontal,
  ShieldCheck,
  Landmark,
} from 'lucide-react';

import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CreditScoreData } from '@/lib/types';
import CreditScoreSimulator from '@/components/credit-score-simulator';
import { ApiUsageGuide } from '@/components/api-usage-guide';

const creditData: CreditScoreData = {
  score: 785,
  rating: 'Good',
  factors: {
    transactionVolume: {
      value: '$15,230',
      description: 'Last 90 days',
      icon: DollarSign,
    },
    transactionFrequency: {
      value: '42/month',
      description: 'Avg. over 6 months',
      icon: Repeat,
    },
    daoParticipation: {
      value: '7 proposals',
      description: 'Voted on',
      icon: Users,
    },
    defiUsage: {
      value: 'High',
      description: 'Across 5+ protocols',
      icon: GitCommitHorizontal,
    },
    verifiedIdentity: {
      value: 'Verified',
      description: 'via BrightID',
      icon: ShieldCheck,
    },
  },
};

function CreditFactorCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ScoreRating({ rating }: { rating: CreditScoreData['rating'] }) {
  const ratingClasses = {
    Excellent: 'text-green-400',
    Good: 'text-green-300',
    Fair: 'text-yellow-400',
    Poor: 'text-orange-400',
    'Very Poor': 'text-red-400',
  };

  return (
    <span
      className={`text-lg font-semibold uppercase tracking-wider ${ratingClasses[rating]}`}
    >
      {rating}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 space-y-8 p-4 md:p-8 lg:p-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <Card className="lg:col-span-2 flex flex-col items-center justify-center text-center bg-primary/90 text-primary-foreground shadow-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-primary-foreground/80">
                On-Chain Credit Score
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-7xl font-extrabold tracking-tighter">
                {creditData.score}
              </div>
              <ScoreRating rating={creditData.rating} />
            </CardContent>
          </Card>

          <CreditFactorCard
            title="Transaction Volume"
            value={creditData.factors.transactionVolume.value}
            description={creditData.factors.transactionVolume.description}
            icon={creditData.factors.transactionVolume.icon}
          />

          <CreditFactorCard
            title="Transaction Frequency"
            value={creditData.factors.transactionFrequency.value}
            description={creditData.factors.transactionFrequency.description}
            icon={creditData.factors.transactionFrequency.icon}
          />
          <CreditFactorCard
            title="Verified Identity"
            value={creditData.factors.verifiedIdentity.value}
            description={creditData.factors.verifiedIdentity.description}
            icon={creditData.factors.verifiedIdentity.icon}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
           <CreditFactorCard
            title="DAO Participation"
            value={creditData.factors.daoParticipation.value}
            description={creditData.factors.daoParticipation.description}
            icon={creditData.factors.daoParticipation.icon}
          />
           <CreditFactorCard
            title="DeFi Protocol Usage"
            value={creditData.factors.defiUsage.value}
            description={creditData.factors.defiUsage.description}
            icon={creditData.factors.defiUsage.icon}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <CreditScoreSimulator />
          <ApiUsageGuide />
        </div>
      </main>
    </div>
  );
}
