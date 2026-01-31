"use client";

import { useState } from "react";
import { Heart, Share2, Check } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const [isLiked, setIsLiked] = useState(false);

  const features = [
    "No Spam Calls or Messages",
    "24x7 Expert Support",
    "End-To-End Homebuying Guidance",
  ];

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-4 sticky top-[68px] h-fit">
      <div className="flex items-center gap-3 self-stretch">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-[#EDEDED] transition-colors cursor-pointer">
          <Share2 className="w-5 h-5 text-[#262626]" />
          <span className="font-manrope text-base font-[600] text-[#262626] leading-[1.5]">Share</span>
        </button>
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-[#EDEDED] transition-colors cursor-pointer"
        >
          <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-[#262626]'}`} />
          <span className="font-manrope text-base font-[600] text-[#262626] leading-[1.5]">
            {isLiked ? 'Wishlisted' : 'Wishlist'}
          </span>
        </button>
      </div>

      <div className="flex flex-col items-start gap-6 self-stretch px-6 py-5 rounded-xl border-[1.5px] border-[#E5E5E5] bg-[#FAFAFA]">
        <h3 className="font-archivo text-lg font-[500] text-[#262626] leading-[150%]">
          Thinking of buying a home? Think of Canvas Homes.
        </h3>

        <div className="flex flex-col items-start gap-3 self-stretch">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5 self-stretch">
              <div className="w-6 h-6 flex items-center justify-center bg-purple-100 rounded-full shrink-0">
                <Check className="w-3.5 h-3.5 text-purple-800" />
              </div>
              <p className="font-manrope text-base font-[500] text-[#404040] leading-[150%]">
                {feature}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-3 self-stretch">
          <button className="flex items-center justify-center gap-2 self-stretch px-4 py-3 rounded-lg bg-[#6B21A8] hover:bg-[#581C87] transition-colors cursor-pointer">
            <Image 
              src="/assets/calendercontact.svg" 
              alt="Calendar" 
              width={20} 
              height={20} 
              className="w-5 h-5" 
            />
            <span className="font-manrope text-base font-[600] text-white leading-[150%]">
              Schedule a Call
            </span>
          </button>
          
          <div className="flex items-center gap-6 self-stretch">
            <div className="flex-1 h-px bg-[#E5E5E5]" />
            <span className="font-manrope text-base font-[600] text-[#525252] leading-[150%]">or</span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>

          <button className="flex items-center justify-center gap-2 self-stretch px-4 py-3 rounded-lg border border-[#E5E5E5] bg-[#F5F5F5] hover:bg-[#EDEDED] transition-colors cursor-pointer">
            <Image 
              src="/whatsappcontact.svg" 
              alt="WhatsApp" 
              width={20} 
              height={20} 
              className="w-5 h-5" 
            />
            <span className="font-manrope text-base font-[600] text-[#262626] leading-[150%]">
              Chat With Us
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
