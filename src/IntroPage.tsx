import './index.css'
import React from 'react';
import { Button } from "./components/ui/button";
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import { Wallet } from "lucide-react";

export default function IntroPage(): JSX.Element {
  return (
    
   <div>
     <div className="relative w-full ">
  {/* 蓝色主光斑（稍微上移，保持中间偏左） */}
  <div className="absolute w-[709px] h-[709px] top-[40px] left-[200px] rounded-[354.5px] blur-[114.4px] [background:radial-gradient(50%_50%_at_58%_42%,rgba(97,186,255,1)_0%,rgba(67,116,220,0.76)_50%,rgba(84,0,255,0.51)_100%)]" />
  
  {/* 青蓝次光斑（从右移至更中间，蓝区更融合） */}
  <div className="absolute w-[640px] h-[640px] top-[480px] left-[400px] rounded-[320px] blur-[127.75px] [background:radial-gradient(50%_50%_at_53%_44%,rgba(26,151,163,1)_0%,rgba(44,91,137,1)_100%)]" />
  
  {/* 淡蓝圈（放到右上，连接主蓝与深青） */}
  <div className="absolute w-[487px] h-[487px] top-[100px] right-[100px] rounded-[243.35px] blur-[127.75px] [background:radial-gradient(50%_50%_at_35%_43%,rgba(26,151,163,1)_0%,rgba(93,175,255,0.05)_100%)]" />
  
  {/* 紫蓝光斑（往下偏左，连接下方粉紫色） */}
  <div className="absolute w-[502px] h-[502px] top-[600px] left-[120px] rounded-[251px] blur-[114.4px] [background:radial-gradient(50%_50%_at_57%_45%,rgba(126,199,255,1)_0%,rgba(67,116,220,0.76)_50%,rgba(84,0,255,0.51)_100%)]" />
  
  {/* 黑色小点（中心偏下，作为视觉聚焦点） */}
  <div className="absolute w-[125px] h-[126px] top-[640px] left-[380px] bg-[#0b0930] rounded-[62.5px/63px] blur-[94.5px]" />
  
  {/* 深紫横向渐变（不动，作为背景层支撑） */}
  <div className="absolute w-[845px] h-[477px] top-[613px] left-[579px] rounded-[422.47px/238.33px] blur-[56.95px] bg-[linear-gradient(0deg,rgba(35,22,73,1)_0%,rgba(35,22,73,1)_100%)]" />
  
  {/* 粉紫渐变块（从右下换到左下，与紫蓝相连） */}
  <div className="absolute w-[568px] h-[511px] bottom-0 left-[40px] rounded-[283.94px/255.69px] blur-[66.05px] bg-[linear-gradient(0deg,rgba(225,149,255,0.82)_0%,rgba(225,149,255,0.82)_100%)]" />
  
  {/* 青绿色模糊块（固定右上，平衡冷暖） */}
  <div className="absolute w-[343px] h-[428px] top-[88px] right-[0px] bg-[#299696] rounded-[171.6px/213.82px] blur-[127.75px]" />
</div>
    <Page1></Page1>
    <Page2></Page2>
    <Page3></Page3>
    <Page4></Page4>
   </div>
  );
}



