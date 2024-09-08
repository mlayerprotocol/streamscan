export interface LeaderboardPointListModel {
  message: string;
  data: LeaderboardData[];
}

export interface LeaderboardData {
  socials?: Socials;
  _id: string;
  projectId: number;
  walletAddress: string;
  referredBy: null;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Socials {
  discord?: string;
  twitter: string;
}
