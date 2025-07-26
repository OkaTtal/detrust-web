import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Wallet } from "lucide-react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { wagmiConfig } from './wagmi'
import SmartContractInteraction from './SmartContractInteraction'
import AppKitProvider from './AppKitProvider'
import TriggerModal from './TriggerModal'
import { useConnect, useAccount, WagmiProvider,useWalletClient } from 'wagmi'
export const queryClient = new QueryClient()
export const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  const navItems = ["我的信托"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-[26px] py-3.5 flex items-center justify-between">
      <Link to="/" className="flex items-center relative w-[129px] h-[34px]">
        <div className="relative w-[127px] h-[34px] ">
          <div className="absolute w-[39px] h-6 top-[7px] left-0">
            <div className="absolute w-[13px] h-5 top-0.5 left-[5px] rounded-[7.2px] border-[3px] border-solid border-white rotate-[43.98deg]" />
            <div className="absolute w-3.5 h-5 top-0.5 left-5 rounded-[7.2px] border-[2.4px] border-solid border-white rotate-[43.98deg]" />
          </div>
          <div className="absolute h-[34px] top-0 left-[38px] [font-family:'Poly-Regular',Helvetica] text-[28.8px] tracking-[-1.20px] leading-[normal] whitespace-nowrap font-normal text-white">
            Detrust
          </div>
        </div>
      </Link>

      <div className=" absolute left-1/6 flex space-x-10 [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-2xl tracking-[-1.00px]">
        {navItems.map((item) => {
          const path = `/${item.toLowerCase()}`;
          const isActive = currentPath === path;
          return (
            <Link
              key={item}
              to={path}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              {item}
            </Link>
          );
        })}
      </div>

      {/* 右侧连接按钮 */}
       <SmartContractInteraction>
         <AppKitProvider>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <TriggerModal />
      </QueryClientProvider>
    </WagmiProvider>
   </AppKitProvider>
   </SmartContractInteraction>
    </nav>
  );
};
