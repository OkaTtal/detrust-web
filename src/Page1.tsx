import './index.css'
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Wallet } from "lucide-react";

export default function Page1(): JSX.Element {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Background gradients */}
      <div className="relative w-full ">
        <div className="absolute w-[709px] h-[709px] top-0 left-[233px] rounded-[354.5px] blur-[114.4px] [background:radial-gradient(50%_50%_at_58%_42%,rgba(97,186,255,1)_0%,rgba(67,116,220,0.76)_50%,rgba(84,0,255,0.51)_100%)]" />
        <div className="absolute w-[640px] h-[640px] top-[594px] right-[160px] rounded-[320px] blur-[127.75px] [background:radial-gradient(50%_50%_at_53%_44%,rgba(26,151,163,1)_0%,rgba(44,91,137,1)_100%)]" />
        <div className="absolute w-[487px] h-[487px] top-[250px] right-[240px] rounded-[243.35px] blur-[127.75px] [background:radial-gradient(50%_50%_at_35%_43%,rgba(26,151,163,1)_0%,rgba(93,175,255,0.05)_100%)]" />
        <div className="absolute w-[502px] h-[502px] top-[613px] left-[77px] rounded-[251px] blur-[114.4px] [background:radial-gradient(50%_50%_at_57%_45%,rgba(126,199,255,1)_0%,rgba(67,116,220,0.76)_50%,rgba(84,0,255,0.51)_100%)]" />
        <div className="absolute w-[125px] h-[126px] top-[609px] left-[316px] bg-[#0b0930] rounded-[62.5px/63px] blur-[94.5px]" />
        <div className="absolute w-[845px] h-[477px] top-[613px] left-[579px] rounded-[422.47px/238.33px] blur-[56.95px] bg-[linear-gradient(0deg,rgba(35,22,73,1)_0%,rgba(35,22,73,1)_100%)]" />
        <div className="absolute w-[568px] h-[511px] top-[778px] left-0 rounded-[283.94px/255.69px] blur-[66.05px] bg-[linear-gradient(0deg,rgba(225,149,255,0.82)_0%,rgba(225,149,255,0.82)_100%)]" />
        <div className="absolute w-[343px] h-[428px] top-[88px] right-0 bg-[#299696] rounded-[171.6px/213.82px] blur-[127.75px]" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center pt-[172px] pb-[100px] px-6 relative z-10">
        <div className="flex flex-col items-center gap-14 max-w-[1708px]">
          <div className="flex flex-col items-center gap-12">
            <h1 className="[font-family:'PingFang_SC-Semibold',Helvetica] font-bold text-white text-[88px] text-center tracking-[-2.00px] leading-[normal]">
              智能合约驱动的
              <br />
              去中心化信托协议
            </h1>
            <p className="max-w-[730px] [font-family:'PingFang_SC-Regular',Helvetica] font-normal text-white text-lg text-center tracking-[-1.00px] leading-8">
              使用用区块链技术来管理和执行信托协议，确保资产的管理、分配和使用符合预设规则，且过程可验证、不可篡改、无第三方干预。
            </p>
          </div>

         <Link to="/我的信托">
  <Button className="h-auto py-4 px-12 !bg-white text-black rounded-full hover:bg-gray-200 [font-family:'PingFang_SC-Medium',Helvetica] font-medium text-xl leading-5">
    立即开始
  </Button>
</Link>
        </div>

        {/* Decorative images */}
      </div>
    </section>
  );
}



