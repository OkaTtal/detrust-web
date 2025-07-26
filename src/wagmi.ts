import { createConfig, http } from '@wagmi/core';
import { walletConnect } from '@wagmi/connectors';
import { defineChain } from 'viem';
import { createAppKit } from '@reown/appkit/react';
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5';
import { bscTestnet } from 'wagmi/chains';
import { ReactNode } from 'react';

// 定义 BNB Testnet 链
export const bnbTestnet = defineChain({
  id: 97,
  name: 'BNB Testnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://bsc-testnet-rpc.publicnode.com'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
});

// 定义 Injective Testnet 链
export const injectiveTestnet = defineChain({
  id: 1439,
  name: 'Injective Testnet',
  nativeCurrency: {
    name: 'Injective',
    symbol: 'INJ',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://k8s.testnet.json-rpc.injective.network'] }, // 使用 Injective 测试网 RPC
  },
  blockExplorers: {
    default: { name: 'Injective Testnet Explorer', url: 'https://testnet.blockscout.injective.network/blocks' },
  },
});

const projectId = '83ff5c8d3d124b29fcf8a12feb7f4118';

const metadata = {
  name: 'My BNB DApp',
  description: 'A decentralized application on BNB Testnet and Injective Testnet',
  url: 'http://localhost:3000',
  icons: ['https://yourdomain.com/icon.png'],
};

// 配置 Wagmi
export const wagmiConfig = createConfig({
  chains: [bnbTestnet, injectiveTestnet],
  connectors: [
    walletConnect({
      projectId,
      showQrModal: true,
    }),
  ],
  transports: {
    [bnbTestnet.id]: http(bnbTestnet.rpcUrls.default.http[0]),
    [injectiveTestnet.id]: http(injectiveTestnet.rpcUrls.default.http[0]),
  },
});

// 配置 AppKit
createAppKit({
  adapters: [new Ethers5Adapter()],
  networks: [bnbTestnet, injectiveTestnet],
  projectId,
  metadata,
  features: { analytics: true },
});

// 组合 Provider