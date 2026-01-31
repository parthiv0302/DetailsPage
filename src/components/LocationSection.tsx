"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Plus,
  Car,
  GraduationCap,
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
    <div className={`flex flex-col w-full ${className || ""}`} {...props}>
      <div className="flex flex-col gap-5 md:gap-3 lg:gap-7">
        <h2 className="font-archivo font-[600] text-[#262626] leading-[1.5] text-xl md:text-2xl">
          Locality
        </h2>

        <div className="flex overflow-x-auto scrollbar-hide gap-2.5 lg:gap-3">
          {filters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`flex items-center justify-center rounded-lg font-manrope font-[600] text-sm leading-[1.5] whitespace-nowrap transition-all shrink-0 py-2 px-3 ${
                activeFilter === filter.label
                  ? "bg-[#f5f5f5] border-[1.5px] border-[#262626] text-[#262626]"
                  : "border-[1.5px] border-[#d4d4d4] text-[#525252] hover:border-gray-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="w-full lg:max-w-[865px] border border-[#e5e5e5] rounded-xl overflow-hidden relative h-[400px] md:h-[302px] lg:h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50" />
          
          <div className="hidden md:flex absolute left-4 top-4 flex-col gap-2.5 w-fit">
            {locations.map((loc, idx) => (
              <div
                key={idx}
                onClick={() => loc.isAdd && setIsAddLocationModalOpen(true)}
                className={`w-64 rounded-lg bg-[#FAFAFA] ${
                  loc.isAdd 
                    ? "flex items-start px-4 py-3 gap-2 border border-[#262626] cursor-pointer hover:bg-gray-100 transition-colors" 
                    : "flex flex-col items-start px-4 py-3 gap-2 border border-[#E5E5E5]"
                }`}
              >
                {loc.isAdd ? (
                  <>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <span className="font-archivo font-[500] text-[#262626] text-base leading-[1.5]">{loc.name}</span>
                      <p className="font-manrope font-[500] text-[#262626] text-sm leading-[1.5]">{loc.address}</p>
                    </div>
                    <Plus className="text-[#262626] w-6 h-6 shrink-0" />
                  </>
                ) : (
                  <>
                    <div className="w-full flex flex-col gap-0.5">
                      <span className="font-archivo font-[500] text-[#262626] text-base leading-[1.5]">{loc.name}</span>
                      <p className="font-manrope font-[400] text-[#262626] text-sm leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap w-full">{loc.place}</p>
                    </div>
                    <div className="flex items-center text-[#262626] gap-3 text-sm w-full">
                      <span className="font-manrope font-[500] leading-[1.5]">{loc.distance}</span>
                      <div className="w-[1px] bg-[#d4d4d4] rounded-full h-5" />
                      <div className="flex items-center gap-1.5">
                        <Car className="w-5 h-5" />
                        <span className="font-manrope font-[500] leading-[1.5]">{loc.time}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="md:hidden absolute bottom-2.5 left-2.5 right-0 flex overflow-x-auto scrollbar-hide gap-2.5 pr-2.5">
            {locations.map((loc, idx) => (
              <div
                key={idx}
                onClick={() => loc.isAdd && setIsAddLocationModalOpen(true)}
                className={`rounded-lg shrink-0 w-48 px-4 py-3 ${
                  loc.isAdd 
                    ? "bg-[#fafafa] border border-[#262626] cursor-pointer" 
                    : idx === 1 
                      ? "bg-[#faf5ff] border border-[#7e22ce]"
                      : "bg-[#fafafa] border border-[#e5e5e5]"
                }`}
              >
                {loc.isAdd ? (
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-archivo font-[500] text-[#262626] text-base leading-[1.5]">{loc.name}</span>
                      <Plus className="text-[#262626] w-5 h-5" />
                    </div>
                    <p className="font-manrope font-[500] text-[#262626] text-sm leading-[1.5]">{loc.address}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5">
                      <p className="font-archivo font-[500] text-[#262626] text-base leading-[1.5]">{loc.name}</p>
                      <p className="font-manrope font-[400] text-[#262626] text-sm leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap">{loc.place}</p>
                    </div>
                    <div className="flex items-center text-[#262626] gap-3 text-sm">
                      <span className="font-manrope font-[500] leading-[1.5]">{loc.distance}</span>
                      <div className="w-[1px] bg-[#d4d4d4] rounded-full h-5" />
                      <div className="flex items-center gap-1.5">
                        <Car className="w-5 h-5" />
                        <span className="font-manrope font-[500] leading-[1.5]">{loc.time}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="absolute bg-purple-800 rounded-full flex items-center justify-center shadow-lg left-[45%] top-[35%] w-9 h-9">
            <MapPin className="text-white w-5 h-5" />
          </div>
          <div className="absolute bg-gray-800 rounded-full flex items-center justify-center shadow-md left-[55%] top-[60%] w-9 h-9">
            <GraduationCap className="text-white w-[18px] h-[18px]" />
          </div>
          <div className="absolute bg-gray-800 rounded-full flex items-center justify-center shadow-md left-[75%] top-[45%] w-9 h-9">
            <ShoppingBag className="text-white w-[18px] h-[18px]" />
          </div>

          <button className="absolute bg-[#e5e5e5] rounded-lg border-0 flex items-center justify-center shadow-sm hover:bg-gray-300 transition-colors cursor-pointer top-4 right-4 w-9 h-9 lg:w-12 lg:h-12 p-2">
            <Image 
              src="/assets/mapopen.svg" 
              alt="Expand map" 
              width={24} 
              height={24} 
              className="w-5 h-5 lg:w-6 lg:h-6" 
            />
          </button>
        </div>
      </div>

      <AddLocationModal 
        isOpen={isAddLocationModalOpen} 
        onClose={() => setIsAddLocationModalOpen(false)} 
      />
    </div>
  );
}
