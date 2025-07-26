import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function Page2(): JSX.Element {
  // Data for statistics cards
  const statsCards = [
    {
      title: "资金量",
      value: "$1.2",
      hasGlow: true,
    },
    {
      title: "信托单数量",
      value: "1,500",
      hasGlow: false,
    },
    {
      title: "委托人数量",
      value: "1,200",
      hasGlow: false,
    },
    {
      title: "受益人数量",
      value: "1,100",
      hasGlow: true,
    },
  ];

  return (
    <section className="w-full bg-[#010101] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
          {/* Left content area */}
          <div className="flex flex-col gap-11 lg:w-1/3">
            <h2 className="text-7xl text-white tracking-[-1.50px] [font-family:'PingFang_SC-Semibold',Helvetica] font-normal">
              深受喜爱
            </h2>
            <p className="text-2xl text-white tracking-[-0.30px] leading-8 [font-family:'PingFang_SC-Regular',Helvetica] font-normal">
              相比于传统的信托产品，Detrust不需要依赖于第三方中介，使用智能合约，确保资金会按委托人的信托条款执行
            </p>
            <div className="mt-4">
              <a href="https://github.com/33357/DeTrust" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="h-auto px-6 py-3 text-white border-white hover:bg-white/10"
              >
                了解更多
              </Button>
              </a>
            </div>
          </div>

          {/* Right content area - Stats cards */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {statsCards.map((card, index) => (
                <Card
                  key={index}
                  className="relative w-full h-[299px] bg-[#080c1999] rounded-[20px] border-none "
                >
                  <CardContent className="p-10 h-full flex flex-col justify-between">
                    {card.hasGlow && (
                      <div className="absolute w-36 h-36 top-0 left-0 rounded-[71.94px] blur-[127.75px] [background:radial-gradient(50%_50%_at_53%_44%,rgba(26,151,163,0.7)_0%,rgba(44,91,137,0.7)_100%)]" />
                    )}
                    <div className="relative z-10">
                      <h3 className="text-[32px] text-white tracking-[0.30px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium">
                        {card.title}
                      </h3>
                    </div>
                    <div className="relative z-10">
                      <p className="text-[66px] text-white tracking-[2.00px] [font-family:'PingFang_SC-Medium',Helvetica] font-medium">
                        {card.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom glow effect */}
        <div className="relative h-36 mt-8">
          <div className="absolute w-36 h-36 right-0 bottom-0 rounded-[71.94px] blur-[127.75px] [background:radial-gradient(50%_50%_at_53%_44%,rgba(26,151,163,0.7)_0%,rgba(44,91,137,0.7)_100%)]" />
        </div>
      </div>
    </section>
  );
}