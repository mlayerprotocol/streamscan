import { arbitrum, mainnet, base, baseSepolia, sepolia } from 'wagmi/chains';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { defineChain } from 'viem';
import { cookieStorage, createStorage, createConfig, http } from 'wagmi';

export const wagmiProjectId: string =
  process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID ?? '';
export const appUrl: string =
  process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const metadata = {
  name: 'mlayerStudio',
  description: 'MLayer web3 connector',
  url: appUrl, // origin must match your domain & subdomain
  icons: ['/logo.png'],
};

export const chains = [base, baseSepolia] as const;
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: wagmiProjectId,
  metadata,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// export const wagmiConfig = createConfig({
//   chains: [mainnet, arbitrum, sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [arbitrum.id]: http(),
//     [sepolia.id]: http(),
//   },
// });
