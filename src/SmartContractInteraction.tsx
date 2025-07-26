import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { ethers, Contract, utils } from "ethers"; // ethers v5 import

const USDTAddress = "0x617f3112bf5397D0467D315cC709EF968D9ba546";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const USDTAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const Components: React.FC = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } : any = useAppKitProvider("eip155");

  async function getBalance() {
    if (!isConnected) throw new Error("User disconnected");

    // In ethers v5, we use Web3Provider instead of BrowserProvider
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = ethersProvider.getSigner();
    
    // The Contract object (same as v6, no changes needed here)
    const USDTContract = new Contract(USDTAddress, USDTAbi, signer);
    const USDTBalance = await USDTContract.balanceOf(address);

    // formatUnits is under utils in ethers v5
    console.log(utils.formatUnits(USDTBalance, 18));
  }

  return <button onClick={getBalance}>Get User Balance</button>;

};

const SmartContractInteraction: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 你可以在这里添加 Web3 初始化逻辑或 Provider 包装
  return <>{children}</>;
};

export default SmartContractInteraction;