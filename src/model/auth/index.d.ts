// Generated by https://quicktype.io

export interface AuthModel {
  meta: Meta | undefined;
  data: AuthModelData | undefined;
  remember_me: boolean;
}

export interface AuthModelData {
  stripeConnect: StripeConnect | undefined;
  airdropPoints: AirdropPoints | undefined;
  _id: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  banner: string | undefined;
  __v: number | undefined;
  active: boolean | undefined;
  createdAt: string | undefined;
  emailVerificationCode: null | undefined;
  emailVerified: boolean | undefined;
  emailVerifyCodeExpiration: null | undefined;
  followers: number | undefined;
  followings: number | undefined;
  isCreator: boolean | undefined;
  lastLoggedIn: string | undefined;
  password: string | undefined;
  publicId: string | undefined;
  referralActive: boolean | undefined;
  updatedAt: string | undefined;
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  walletAddress: string | undefined;
  socialAuth: string | undefined;
  socialAuthType: string | undefined;
  token: string | undefined;
  balance: string | undefined;
  settings: Settings | undefined;
}

export interface AirdropPoints {
  followPoints: number | undefined;
  likePoints: number | undefined;
  referralPoints: number | undefined;
  subscriptionPoints: number | undefined;
  total: number | undefined;
}

export interface Settings {
  token: Token | undefined;
}

export interface Token {
  access: Access | undefined;
  cashoutRate: number | undefined;
}

export interface Access {
  earlyAccess: EarlyAccess | undefined;
  generalAccessCost: GeneralAccessCost | undefined;
}

export interface EarlyAccess {
  cost: number | undefined;
  durationStart: number | undefined;
  durationEnd: number | undefined;
}

export interface GeneralAccessCost {
  cost: number | undefined;
  duration: number | undefined;
}

export interface StripeConnect {
  active: boolean | undefined;
}

export interface Meta {
  statusCode: number | undefined;
  success: boolean | undefined;
}