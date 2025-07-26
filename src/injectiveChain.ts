// lib/injectiveChain.ts
import { defineChain } from 'viem'

export const injectiveTestnet = defineChain({
  id: 1439,
  name: 'Injective Testnet',
  nativeCurrency: {
    name: 'INJ',
    symbol: 'INJ',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://k8s.testnet.json-rpc.injective.network'] },
  },
  blockExplorers: {
    default: { name: 'InjectiveScan', url: 'https://testnet.blockscout.injective.network/blocks' },
  },
})