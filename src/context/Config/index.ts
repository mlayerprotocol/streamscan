import { http, createConfig } from "wagmi";
import { arbitrum, mainnet, sepolia } from "wagmi/chains";
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

export const wagmiProjectId = "595609ade075a7d525a2a3adfc87431f";

export const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const chains = [mainnet, arbitrum, sepolia] as const;
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: wagmiProjectId,
  metadata,
});

// export const wagmiConfig = createConfig({
//   chains: [mainnet, arbitrum, sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [arbitrum.id]: http(),
//     [sepolia.id]: http(),
//   },
// });
