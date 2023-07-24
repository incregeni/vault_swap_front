import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { http } from 'viem';

//* Chain definitions
const sepoliaTestnet = {
  id: 11155111,
  name: 'Sepolia EVM Mainnet',
  network: 'SepoliaETH',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia',
    symbol: 'SepoliaETH',
  },
  rpcUrls: {
    public: { http: ['https://eth-sepolia-public.unifra.io'] },
    default: {
      http: ['https://eth-sepolia-public.unifra.io'],
    },
  },
  blockExplorers: {
    blockscout: {
      name: 'Sepolia Explorer',
      url: 'https://eth-sepolia-public.unifra.io',
    },
    default: {
      name: 'Sepolia Explorer',
      url: 'https://eth-sepolia-public.unifra.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 3_661_165,
    },
  },
} as const satisfies Chain;

//* Rainbow wallet configuration

//* Wagmi + Rainbow wallet configuration
export const { chains, publicClient } = configureChains(
  [sepoliaTestnet],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://eth-sepolia-public.unifra.io',
      }),
    }),
  ],
  { stallTimeout: 10_000 }
);

const { connectors } = getDefaultWallets({
  appName: 'VaultSwap',
  chains,
});

export const configuration = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  logger: {
    warn: null,
  },
});
