export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  riskTolerance: 'low' | 'medium' | 'high';
  language: string;
  worldIdVerified: boolean;
  totalBalance: number;
  xp: number;
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  amount: number;
  value: number;
}

export interface EarningTask {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'annotation' | 'rating' | 'linguistics';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface LearningModule {
  id: string;
  title: string;
  category: string;
  xp: number;
  completed: boolean;
}
