import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Coins, Gift, Heart } from "lucide-react";
import React from "react";

export default function Page4(): JSX.Element {
  // Data for trust cards
  const trustCards = [
    {
      icon: <Coins className="w-9 h-9" />,
      title: "养老金信托",
      description: "工作期间储蓄资产，退休后按周期释放使用。",
    },
    {
      icon: <Gift className="w-9 h-9" />,
      title: "遗产信托",
      description: "使用链上资产设立遗产继承计划，自动分配给后代或特定成员。",
    },
    {
      icon: <Heart className="w-9 h-9" />,
      title: "慈善信托",
      description: "透明记录捐款流向，按预设规则自动发放善款。",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "企业股权信托",
      description:
        "创始团队或员工持股计划可通过链上信托管理，实现激励和退出机制。",
    },
  ];

  return (
    <section className="w-full bg-black py-16 relative overflow-hidden">
<div className="relative w-full ">
  <div className="absolute w-[709px] h-[709px] top-0 left-[233px] rounded-[354.5px] blur-[114.4px] [background:radial-gradient(50%_50%_at_58%_42%,rgba(135,206,250,1)_0%,rgba(100,149,237,0.76)_50%,rgba(72,61,139,0.51)_100%)]" />
  <div className="absolute w-[640px] h-[640px] top-[594px] right-[160px] rounded-[320px] blur-[127.75px] [background:radial-gradient(50%_50%_at_53%_44%,rgba(32,178,170,1)_0%,rgba(25,25,112,1)_100%)]" />
  <div className="absolute w-[487px] h-[487px] top-[250px] right-[240px] rounded-[243.35px] blur-[127.75px] [background:radial-gradient(50%_50%_at_35%_43%,rgba(32,178,170,1)_0%,rgba(176,224,230,0.05)_100%)]" />
  <div className="absolute w-[502px] h-[502px] top-[613px] left-[77px] rounded-[251px] blur-[114.4px] [background:radial-gradient(50%_50%_at_57%_45%,rgba(176,224,230,1)_0%,rgba(100,149,237,0.76)_50%,rgba(72,61,139,0.51)_100%)]" />
  <div className="absolute w-[125px] h-[126px] top-[609px] left-[316px] bg-[#121224] rounded-[62.5px/63px] blur-[94.5px]" />
  <div className="absolute w-[845px] h-[477px] top-[613px] left-[579px] rounded-[422.47px/238.33px] blur-[56.95px] bg-[linear-gradient(0deg,rgba(18,10,50,1)_0%,rgba(18,10,50,1)_100%)]" />
  <div className="absolute w-[568px] h-[511px] top-[778px] left-0 rounded-[283.94px/255.69px] blur-[66.05px] bg-[linear-gradient(0deg,rgba(199,199,255,0.82)_0%,rgba(199,199,255,0.82)_100%)]" />
  <div className="absolute w-[343px] h-[428px] top-[88px] right-0 bg-[#20b2aa] rounded-[171.6px/213.82px] blur-[127.75px]" />
</div>






      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-16 relative z-10">
          {/* Section Title */}
          <p className="text-4xl  text-center tracking-tight font-semibold text-white">
            为什么选择Detrust
          </p>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {trustCards.map((card, index) => (
              <Card
                key={`trust-card-${index}`}
                className="bg-[#080c19cc] border-none rounded-[20px] shadow-lg overflow-hidden relative"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 p-px rounded-[20px]  pointer-events-none" />

                {/* Card content */}
                <CardContent className="p-8">
                  <div className="flex flex-col gap-8">
                    {/* Icon and title */}
                    <div className="flex items-center gap-3">
                      <div className="w-[42px] h-[42px] flex items-center justify-center bg-black/20 rounded-full">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl font-medium text-white tracking-tight ">
                        {card.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xl text-white tracking-tight">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute w-[435px] h-[435px] top-0 right-0 rounded-full blur-[114px] bg-gradient-radial from-[rgba(97,186,255,1)] via-[rgba(67,116,220,0.76)] to-[rgba(84,0,255,0.51)]" />
      <div className="absolute w-[547px] h-[359px] bottom-0 left-1/3 rounded-[273px/179px] blur-[48px] bg-gradient-radial from-[rgba(244,119,255,0.61)] to-[rgba(142,38,233,0.21)]" />
    </section>
  );
}
