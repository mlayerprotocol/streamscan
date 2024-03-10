export const THEME_STORAGE_KEY = "@@mlayer-storage/theme";
export const KEYPAIR_STORAGE_KEY = "@@mlayer-storage/keypair";

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
// export const HOST_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const AUTH_URL = "/auth";
export const ACCOUNT_URL = "/account";
export const ACCOUNT_LOGOUT = "/logout";
export const STATUS_URL = "/status";
export const USER_URL = "/users";
export const TRANSACTION_URL = "/transaction";

export const displayVariants = {
  hidden: { opacity: 0, scale: 0 },
  exit0: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
  },
};
