"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Plus,
  Maximize,
  Car,
  GraduationCap,
  Building2,
  ShoppingBag,
} from "lucide-react";
import AddLocationModal from "./AddLocationModal";

const filters = [
  { label: "Saved(2)" },
  { label: "Transit" },
  { label: "School" },
  { label: "Hospital" },
  { label: "Tech Park" },
  { label: "Mall" },
];

const locations = [
  { name: "Add Location", address: "To See Commute Time", isAdd: true },
  { name: "Work", place: "1579 TruEstate, 27th main road H...", distance: "3 Km", time: "12 min" },
  { name: "School", place: "Little Angels High School", distance: "3 Km", time: "12 min" },
];

export default function LocationSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [activeFilter, setActiveFilter] = useState("Saved(2)");
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);

  return (
    <div className={`flex flex-col w-full gap-[clamp(1rem,2.5vw,1.5rem)] ${className || ""}`} {...props}>
      <h2 className="font-archivo font-semibold text-[#262626] leading-[1.5] text-[length:clamp(1.25rem,4vw,1.5rem)]">Locality</h2>

      <div className="flex overflow-x-auto scrollbar-hide gap-[clamp(0.5rem,1.5vw,0.625rem)]">
        {filters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`flex items-center justify-center rounded-lg font-manrope font-semibold leading-[1.5] whitespace-nowrap transition-all shrink-0 p-[8px_12px] text-[length:clamp(0.75rem,2vw,0.875rem)] ${
              activeFilter === filter.label
                ? "bg-[#f5f5f5] border-[1.5px] border-[#262626] text-[#262626]"
                : "border-[1.5px] border-[#d4d4d4] text-[#525252] hover:border-gray-400"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[865px] border border-[#e5e5e5] rounded-xl overflow-hidden relative h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50" />
        
        <div className="hidden md:flex absolute left-4 top-4 flex-col gap-3 w-fit">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              onClick={() => loc.isAdd && setIsAddLocationModalOpen(true)}
              className={`w-full max-w-[254px] p-[12px_16px] rounded-lg bg-[#FAFAFA] gap-2 ${
                loc.isAdd 
                  ? "flex items-start border border-[#262626] cursor-pointer hover:bg-gray-100 transition-colors" 
                  : "flex flex-col items-start border border-[#E5E5E5]"
              }`}
            >
              {loc.isAdd ? (
                <>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="font-archivo font-medium text-[#262626] text-[16px] leading-[1.5]">{loc.name}</span>
                    <p className="font-manrope font-medium text-[#262626] text-[14px] leading-[1.5]">{loc.address}</p>
                  </div>
                  <Plus className="text-[#262626] w-6 h-6 shrink-0" />
                </>
              ) : (
                <>
                  <div className="w-full flex items-center justify-between">
                    <span className="font-archivo font-medium text-[#262626] text-[16px] leading-[1.5]">{loc.name}</span>
                  </div>
                  <p className="font-manrope font-normal text-[#262626] text-[14px] leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap w-full">{loc.place}</p>
                  <div className="flex items-center text-[#262626] gap-3 text-[14px] w-full">
                    <span className="font-manrope font-medium leading-[1.5]">{loc.distance}</span>
                    <div className="w-px bg-[#d4d4d4] rounded-full h-5" />
                    <div className="flex items-center gap-1.5">
                      <Car className="w-5 h-5" />
                      <span className="font-manrope font-medium leading-[1.5]">{loc.time}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden absolute bottom-0 left-0 right-0 flex overflow-x-auto scrollbar-hide gap-[clamp(0.5rem,2vw,0.625rem)] p-[clamp(0.5rem,2vw,0.625rem)]">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              onClick={() => loc.isAdd && setIsAddLocationModalOpen(true)}
              className={`rounded-lg shadow-sm shrink-0 w-[clamp(180px,48vw,194px)] p-[12px_16px] ${
                loc.isAdd 
                  ? "bg-[#fafafa] border border-[#262626] cursor-pointer" 
                  : idx === 1 
                    ? "bg-[#faf5ff] border border-[#7e22ce]"
                    : "bg-[#fafafa] border border-[#e5e5e5]"
              }`}
            >
              {loc.isAdd ? (
                <div className="flex flex-col gap-[clamp(0.125rem,0.3vw,0.15rem)]">
                  <div className="flex items-center justify-between">
                    <span className="font-archivo font-medium text-[#262626] leading-[1.5] tracking-[0.25px] text-[length:clamp(0.875rem,2.5vw,1rem)]">{loc.name}</span>
                    <Plus className="text-[#262626] w-[clamp(1.25rem,3.5vw,1.5rem)] h-[clamp(1.25rem,3.5vw,1.5rem)]" />
                  </div>
                  <p className="font-manrope font-medium text-[#262626] leading-[1.5] text-[length:clamp(0.75rem,2vw,0.875rem)]">{loc.address}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-[8px]">
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-archivo font-medium text-[#262626] leading-[1.5] tracking-[0.25px] text-[length:clamp(0.875rem,2.5vw,1rem)]">{loc.name}</p>
                    <p className="font-manrope font-normal text-[#262626] leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap text-[length:clamp(0.75rem,2vw,0.875rem)]">{loc.place}</p>
                  </div>
                  <div className="flex items-center text-[#262626] gap-[12px] text-[length:clamp(0.75rem,2vw,0.875rem)]">
                    <span className="font-manrope font-medium leading-[1.5]">{loc.distance}</span>
                    <div className="w-px bg-[#d4d4d4] rounded-full h-5" />
                    <div className="flex items-center gap-1.5">
                      <Car className="w-[clamp(1.25rem,3.5vw,1.5rem)] h-[clamp(1.25rem,3.5vw,1.5rem)]" />
                      <span className="font-manrope font-medium leading-[1.5]">{loc.time}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bg-purple-800 rounded-full flex items-center justify-center shadow-lg left-[clamp(40%,45vw,45%)] top-[clamp(30%,35vw,35%)] w-[clamp(2rem,5vw,2.5rem)] h-[clamp(2rem,5vw,2.5rem)]">
          <MapPin className="text-white w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)]" />
        </div>
        <div className="absolute bg-gray-800 rounded-full flex items-center justify-center shadow-md left-[clamp(50%,55vw,55%)] top-[clamp(55%,60vw,60%)] w-[clamp(1.75rem,4.5vw,2rem)] h-[clamp(1.75rem,4.5vw,2rem)]">
          <GraduationCap className="text-white w-[clamp(0.875rem,2vw,1rem)] h-[clamp(0.875rem,2vw,1rem)]" />
        </div>
        <div className="absolute bg-gray-800 rounded-full flex items-center justify-center shadow-md left-[clamp(70%,75vw,75%)] top-[clamp(40%,45vw,45%)] w-[clamp(1.75rem,4.5vw,2rem)] h-[clamp(1.75rem,4.5vw,2rem)]">
          <ShoppingBag className="text-white w-[clamp(0.875rem,2vw,1rem)] h-[clamp(0.875rem,2vw,1rem)]" />
        </div>

        <button className="absolute bg-[#e5e5e5] rounded-lg border-0 flex items-center justify-center shadow-sm hover:bg-gray-300 transition-colors cursor-pointer top-[clamp(0.625rem,1.5vw,1rem)] right-[clamp(0.875rem,2vw,1rem)] w-[clamp(2rem,5vw,2.3125rem)] h-[clamp(2rem,5vw,2.3125rem)] p-[8px]">
          <Image 
            src="/assets/mapopen.svg" 
            alt="Expand map" 
            width={24} 
            height={24} 
            className="w-[clamp(1.25rem,3vw,1.5rem)] h-[clamp(1.25rem,3vw,1.5rem)]" 
          />
        </button>
      </div>

      <AddLocationModal 
        isOpen={isAddLocationModalOpen} 
        onClose={() => setIsAddLocationModalOpen(false)} 
      />
    </div>
  );
}