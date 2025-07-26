import { ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, bscTestnet, sepolia } from "@reown/appkit/networks";
import { injectiveTestnet } from "./injectiveChain";

const projectId = "83ff5c8d3d124b29fcf8a12feb7f4118";
const metadata = {
  name: "My Web3 App",
  description: "Demo appkit integration",
  url: "https://yourdomain.com",
  icons: ["https://yourdomain.com/favicon.png"],
};

createAppKit({
  adapters: [new Ethers5Adapter()],
  networks: [mainnet,bscTestnet,sepolia,injectiveTestnet],
  projectId,
  metadata,
  features: { analytics: true },
});

export default function AppKitProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
