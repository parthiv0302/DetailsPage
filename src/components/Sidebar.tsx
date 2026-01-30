"use client";

import { Heart, Share2, Check } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const features = [
    "No Spam Calls or Messages",
    "24x7 Expert Support",
    "End-To-End Homebuying Guidance",
  ];

  return (
    <div className="w-full max-w-[390px] flex flex-col items-center gap-[16px] sticky top-[68px] h-fit">
      {/* Share and Wishlist Buttons */}
      <div className="flex items-center gap-[8px] self-stretch">
        <button className="flex-[1_0_0] flex items-center justify-center gap-[8px] p-[12px_16px] rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-[#EDEDED] transition-colors cursor-pointer">
          <Share2 className="w-[20px] h-[20px] text-[#262626]" />
          <span className="font-manrope text-[16px] font-semibold text-[#262626] leading-[1.5]">Share</span>
        </button>
        <button className="flex-[1_0_0] flex items-center justify-center gap-[8px] p-[12px_16px] rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-[#EDEDED] transition-colors cursor-pointer">
          <Heart className="w-[20px] h-[20px] text-[#262626]" />
          <span className="font-manrope text-[16px] font-semibold text-[#262626] leading-[1.5]">Whishlist</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="flex flex-col items-start gap-[24px] self-stretch p-[20px_24px] rounded-[12px] border-[1.5px] border-[#E5E5E5] bg-[#FAFAFA]">
        <h3 className="font-archivo text-[18px] font-medium text-[#262626] leading-[150%]">
          Thinking of buying a home? Think of Canvas Homes.
        </h3>

        {/* Features List */}
        <div className="flex flex-col items-start gap-[12px] self-stretch">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-[10px] self-stretch">
              <div className="w-[24px] h-[24px] flex items-center justify-center bg-purple-100 rounded-full">
                <Check className="w-[14px] h-[14px] text-purple-800" />
              </div>
              <p className="font-manrope text-[16px] font-medium text-[#404040] leading-[150%]">
                {feature}
              </p>
            </div>
          ))}
        </div>

        {/* Actions Section */}
        <div className="flex flex-col items-start gap-[12px] self-stretch">
          <button className="flex items-center justify-center gap-[8px] self-stretch p-[12px_16px] rounded-[8px] bg-[#6B21A8] hover:bg-[#581C87] transition-colors cursor-pointer">
            <Image 
              src="/assets/calendercontact.svg" 
              alt="Calendar" 
              width={20} 
              height={20} 
              className="w-[20px] h-[20px]" 
            />
            <span className="font-manrope text-[16px] font-semibold text-white leading-[150%]">
              Schedule a Call
            </span>
          </button>
          
          <div className="flex items-center gap-[24px] self-stretch">
            <div className="flex-1 h-px bg-[#E5E5E5]" />
            <span className="font-manrope text-[16px] font-normal text-[#525252] leading-[150%]">or</span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>

          <button className="flex items-center justify-center gap-[8px] self-stretch p-[12px_16px] rounded-[8px] border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-[#EDEDED] transition-colors cursor-pointer">
            <Image 
              src="/whatsappcontact.svg" 
              alt="WhatsApp" 
              width={20} 
              height={20} 
              className="w-[20px] h-[20px]" 
            />
            <span className="font-manrope text-[16px] font-semibold text-[#262626] leading-[150%]">
              Chat With Us
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}