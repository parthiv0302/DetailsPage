import Image from "next/image";
import { MapPin, ShieldCheck } from "lucide-react";

export default function PropertyHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {/* Desktop/Tablet Layout (md and up) */}
      <div className="hidden md:flex items-center justify-between w-full max-w-[54.0625rem] gap-[0.75rem]">
        {/* Property Info */}
        <div className="flex-1 flex flex-col">
          {/* Title Row with RERA Badge */}
          <div className="flex items-center gap-[1rem] flex-wrap">
            <h1 className="text-[1.875rem] font-medium text-[#262626] leading-[1.3] font-archivo">
              Sattva Vasanta Skye
            </h1>
            <div className="flex items-center gap-[0.25rem] bg-blue-100 px-[0.625rem] py-[0.125rem] rounded-full translate-y-[2px]">
              <ShieldCheck className="w-[1rem] h-[1rem] text-blue-800" />
              <span className="text-[0.875rem] font-semibold text-blue-800 leading-[1.5]">RERA</span>
            </div>
          </div>
          
          {/* Location */}
          <p className="text-[1.125rem] font-medium text-[#525252] leading-[1.5] mt-[0.375rem] font-manrope">Devanhalli, Bangalore</p>
          
          {/* Price */}
          <p className="text-[1.875rem] font-semibold text-[#262626] leading-[1.3] mt-[0.75rem] font-archivo">₹85L - ₹3.27 Cr</p>
        </div>
        
        {/* View on Map Button */}
        <button className="cursor-pointer group shrink-0 w-[6.25rem] h-[6.25rem] rounded-lg overflow-hidden border border-gray-200 relative bg-gray-100 hover:border-purple-400 transition-all flex flex-col items-center justify-center gap-[7px]">
          <MapPin className="w-[2rem] h-[2rem] text-purple-600 fill-purple-600" />
          <p className="text-[0.875rem] font-semibold text-[#404040] text-center leading-[1.2] tracking-[0.25px] font-archivo">
            View on<br/>Map
          </p>
        </button>
      </div>

      {/* Mobile Layout (below md) */}
      <div className="md:hidden flex flex-col w-full">
        {/* Title and RERA Badge */}
        <div className="flex items-start justify-between w-full">
          <h1 className="flex-1 font-archivo font-weight-500 text-[#262626] leading-[1.5] text-[24px]">
            Sattva Vasanta Skye
          </h1>
          <div className="flex items-center bg-[#fef9c3] rounded-full shrink-0 gap-[4px] px-[12px] py-[2px] translate-y-[6px]">
            <span className="font-manrope font-semibold text-[#a16207] leading-[1.5] whitespace-nowrap text-[12px]">RERA Awaited</span>
          </div>
        </div>

        {/* Location */}
        <p className="font-manrope font-weight-500 text-[#525252] leading-[1.5] text-[18px] mt-[6px]">
          Devanhalli, Bangalore
        </p>

        {/* Price */}
        <p className="font-archivo font-weight-600 text-[#262626] leading-[1.5] text-[18px] mt-[6px]">
          ₹85L - ₹3.27 Cr
        </p>
      </div>
    </div>
  );
}
