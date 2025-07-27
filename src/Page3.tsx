import { Card, CardContent } from "./components/ui/card";
import { Globe, Lock, Network, PlayCircle } from "lucide-react";
import React from "react";

export default function Page2(): JSX.Element {
  // Data for advantage cards
  const advantages = [
    {
      icon: <PlayCircle className="w-9 h-9 text-white" />,
      title: "自动化执行",
      description: ["信托条款写入智能合约", "触发条件后自动执行任务"],
    },
    {
      icon: <Network className="w-9 h-9 text-white" />,
      title: "去中介化",
      description: ["不再依赖第三方金融机构", "降低成本和信任门槛"],
    },
    {
      icon: <Lock className="w-9 h-9 text-white" />,
      title: "不可篡改和透明",
      description: ["所有交易记录上链公开透明", "可追溯、难以伪造"],
    },
    {
      icon: <Globe className="w-9 h-9 text-white" />,
      title: "跨境便捷",
      description: ["无需依赖传统金融系统", "支持全球资产的配置"],
    },
  ];

  return (
    <section className="relative w-full bg-[#010101] py-20">
      {/* Background gradient effect */}
      <div className="absolute w-[473px] h-[473px] top-[172px] left-0 rounded-[236.41px] blur-[127.75px] bg-[linear-gradient(90deg,rgba(72,123,255,1)_0%,rgba(50,77,255,0.12)_100%)]" />

      <div className="flex flex-col items-center gap-6 relative z-10 max-w-[808px] mx-auto">
        {/* Section title */}
        <h2 className="self-stretch [font-family:'PingFang_SC-Semibold',Helvetica] font-bold text-white text-4xl tracking-[-1.50px] leading-[normal] margin-0 auto">
          我们的优势
        </h2>

        <div className="flex flex-col items-start gap-7 ">
          {/* First row of cards */}
          <div className="flex items-center gap-10 ">
            {advantages.slice(0, 2).map((advantage, index) => (
              <AdvantageCard key={index} {...advantage} />
            ))}
          </div>

          {/* Second row of cards */}
          <div className="flex items-center gap-10 ">
            {advantages.slice(2, 4).map((advantage, index) => (
              <AdvantageCard key={index} {...advantage} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Advantage card component
function AdvantageCard({ icon, title, description }: any) {
  return (
    <Card className="flex-1 h-[280px] bg-[#080c1999] rounded-[40px] border-[none]">
      <CardContent className="relative p-1 h-full">
        {/* Gradient glow effect */}
        <div className="absolute w-36 h-36 top-0 left-0 rounded-[71.94px] blur-[127.75px] [background:radial-gradient(50%_50%_at_53%_44%,rgba(26,151,163,0.7)_0%,rgba(44,91,137,0.7)_100%)]" />

        <div className="flex flex-col items-start gap-[34px] p-14">
          {/* Title with icon */}
          <div className="inline-flex items-center gap-2">
            <div className="relative w-9 h-9">{icon}</div>
            <div className="[font-family:'PingFang_SC-Semibold',Helvetica] font-medium text-white text-2xl tracking-[0.2px] leading-[normal]">
              {title}
            </div>
          </div>

          {/* Description */}
          <div className="[font-family:'PingFang_SC-Regular',Helvetica] font-normal text-white text-[24px] tracking-[-1.50px] leading-[34px] display-flex">
            {description.map((line: any, index: any) => (
              <React.Fragment key={index}>
                {line}
                {index < description.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}