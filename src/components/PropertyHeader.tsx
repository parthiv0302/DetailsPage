"use client";

import Image from "next/image";
import { MapPin, ShieldCheck } from "lucide-react";

export default function PropertyHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const scrollToLocality = () => {
    const element = document.getElementById("locality");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={className} {...props}>
      <div className="hidden lg:flex items-center justify-between w-full gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-3xl font-[500] text-[#262626] leading-[1.3] font-archivo">
                Sattva Vasanta Skye
              </h1>
              <div className="flex items-center gap-1 bg-[#fef9c3] px-2.5 py-0.5 rounded-full">
                <span className="text-sm font-[600] text-[#a16207] leading-[1.5] font-manrope">RERA Awaited</span>
              </div>
            </div>
            <p className="text-lg font-[500] text-[#525252] leading-[1.5] font-manrope">Devanhalli, Bangalore</p>
          </div>
          
          <p className="text-3xl font-[600] text-[#262626] leading-[1.3] font-archivo">₹85L - ₹3.27 Cr</p>
        </div>
        
        <button 
          onClick={scrollToLocality}
          className="cursor-pointer group shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200 relative bg-gray-100 hover:border-purple-400 transition-all flex flex-col items-center justify-center gap-2"
        >
          <MapPin className="w-8 h-8 text-purple-600 fill-purple-600" />
          <p className="text-sm font-[600] text-[#404040] text-center leading-[1.2] tracking-[0.25px] font-archivo">
            View on<br/>Map
          </p>
        </button>
      </div>

      <div className="hidden md:flex lg:hidden flex-col w-full gap-5">
        <div className="flex items-start justify-between w-full gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-[500] text-[#262626] leading-[1.3] font-archivo">
                  Sattva Vasanta Skye
                </h1>
                <div className="flex items-center gap-1 bg-[#fef9c3] px-2.5 py-0.5 rounded-full">
                  <span className="text-sm font-[600] text-[#a16207] leading-[1.5] font-manrope">RERA Awaited</span>
                </div>
              </div>
              <p className="text-lg font-[500] text-[#525252] leading-[1.5] font-manrope">Devanhalli, Bangalore</p>
            </div>
            
            <p className="text-3xl font-[600] text-[#262626] leading-[1.3] font-archivo">₹85L - ₹3.27 Cr</p>
          </div>
          
          <button 
            onClick={scrollToLocality}
            className="cursor-pointer group shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200 relative bg-gray-100 hover:border-purple-400 transition-all flex flex-col items-center justify-center gap-2"
          >
            <MapPin className="w-8 h-8 text-purple-600 fill-purple-600" />
            <p className="text-sm font-[600] text-[#404040] text-center leading-[1.2] tracking-[0.25px] font-archivo">
              View on<br/>Map
            </p>
          </button>
        </div>

        <div className="flex flex-wrap gap-7 items-center">
          <div className="flex items-center gap-2.5">
            <Image src="/assets/building-type.svg" alt="" width={24} height={24} className="w-6 h-6" />
            <span className="text-lg font-[500] text-[#262626] leading-[1.5] font-manrope">Apartment, Plot & Villa</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src="/assets/Project Stage.svg" alt="" width={24} height={24} className="w-6 h-6" />
            <span className="text-lg font-[500] text-[#262626] leading-[1.5] font-manrope">Pre-Launch<span className="text-rose-700">*</span></span>
          </div>
          <div className="flex items-center gap-2.5">
            <Image src="/assets/calendar-clock.svg" alt="" width={24} height={24} className="w-6 h-6" />
            <span className="text-lg font-[500] text-[#262626] leading-[1.5] font-manrope">Exp. Launch by Oct 2032<span className="text-rose-700">*</span></span>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col w-full">
        <div className="flex items-start justify-between w-full">
          <h1 className="flex-1 font-archivo font-[500] text-[#262626] leading-[1.5] text-2xl">
            Sattva Vasanta Skye
          </h1>
          <div className="flex items-center bg-[#fef9c3] rounded-full shrink-0 gap-1 px-3 py-0.5 translate-y-1.5">
            <span className="font-manrope font-[600] text-[#a16207] leading-[1.5] whitespace-nowrap text-xs">RERA Awaited</span>
          </div>
        </div>

        <p className="font-manrope font-[500] text-[#525252] leading-[1.5] text-lg mt-1.5">
          Devanhalli, Bangalore
        </p>

        <p className="font-archivo font-[600] text-[#262626] leading-[1.5] text-lg mt-1.5">
          ₹85L - ₹3.27 Cr
        </p>
      </div>
    </div>
  );
}

