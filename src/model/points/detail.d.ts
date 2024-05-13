export interface PointDetailModel {
  message: string;
  data: Data;
}

export interface Data {
  account: Account;
  token: string;
}

export interface Account {
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
