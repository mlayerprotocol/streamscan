export const THEME_STORAGE_KEY = "@@mlayer-storage/theme";
export const KEYPAIR_STORAGE_KEY = "@@mlayer-storage/keypair-v4";
export const LOCAL_PRIVKEY_STORAGE_KEY = "@@mlayer-storage/local-privkey-v4";
export const CONNECTED_WALLET_STORAGE_KEY = "@@mlayer-storage/connected-wallet";
export const WALLET_ACCOUNTS_STORAGE_KEY = "@@mlayer-storage/wallet-accounts";
export const SELECTED_AGENT_STORAGE_KEY =
  "@@mlayer-storage/selected-agent-account";
export const SELECTED_SUBNET_STORAGE_KEY =
  "@@mlayer-storage/selected-subnet-id";

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
// export const HOST_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const AUTH_URL = "/auth";
export const ACCOUNT_URL = "/account";
export const ACCOUNT_LOGOUT = "/logout";
export const STATUS_URL = "/status";
export const USER_URL = "/users";
export const TRANSACTION_URL = "/transaction";
export const VALIDATOR_PUBLIC_KEY =
  "2c2387845a0e17281653050892d3095e7fc99ad32d79b7fbdf11c9a87671daca";
// export const NODE_HTTP = "http://154.12.228.25:9531";
export const NODE_HTTP = process.env.NEXT_PUBLIC_NODE_HTTP;
export const MIDDLEWARE_HTTP = process.env.NEXT_PUBLIC_MIDDLEWARE_HTTP;
export const displayVariants = {
  hidden: { opacity: 0, scale: 0 },
  exit0: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
  },
};

export const PREVILEDGES = ["Disabled", "Read", "Write", "Admin"];

export const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const MIDDLEWARE_HTTP_URLS = {
  connect: {
    url: `${MIDDLEWARE_HTTP}/v1/activity/connect-wallet`,
    method: `POST`,
  },
  claim: {
    url: `${MIDDLEWARE_HTTP}/v1/activity/claim`,
    method: `POST`,
  },
  account: {
    url: `${MIDDLEWARE_HTTP}/v1/activity/account`,
    method: `GET`,
  },
};
