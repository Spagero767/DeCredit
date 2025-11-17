import type { SVGProps } from 'react';

export type CreditScoreData = {
  score: number;
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  factors: {
    transactionVolume: {
      value: string;
      description: string;
      icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    };
    transactionFrequency: {
      value: string;
      description: string;
      icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    };
    daoParticipation: {
      value: string;
      description: string;
      icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    };
    defiUsage: {
      value: string;
      description: string;
      icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    };
    verifiedIdentity: {
      value: 'Verified' | 'Not Verified';
      description: string;
      icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    };
  };
};
