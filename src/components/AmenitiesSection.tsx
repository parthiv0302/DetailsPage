"use client";

import { useState } from "react";
import Image from "next/image";
import AmenitiesModal from "./AmenitiesModal";

const amenities = [
  { icon: "/assets/clubhouse.svg", label: "Club House" },
  { icon: "/assets/securityguard.svg", label: "Security Guard" },
  { icon: "/assets/reserveparking.svg", label: "Reserved Parking" },
  { icon: "/assets/gymnasium.svg", label: "Gymnasium" },
  { icon: "/assets/powerbackup.svg", label: "Power Backup" },
  { icon: "/assets/foodcourt.svg", label: "Food Court" },
  { icon: "/assets/swimmingpool.svg", label: "Swimming Pool" },
  { icon: "/assets/park.svg", label: "Park" },
];

export default function AmenitiesSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  return (
    <div className={className} {...props}>
      <div className="flex flex-col w-full bg-white gap-[clamp(1rem,2.5vw,1.5rem)]">
        {/* Title - desktop only shows title + button side by side, mobile shows title only */}
        <div className="flex items-center justify-between md:flex-row">
          <h2 
            className="font-semibold text-[#262626] font-archivo text-[length:clamp(1.25rem,3vw,1.5rem)] leading-[1.5]"
          >
            Amenities
          </h2>
          {/* Desktop button */}
          <button 
            onClick={() => setShowAllAmenities(true)}
            className="hidden md:flex items-center justify-center bg-[#262626] text-[#fafafa] rounded-lg font-manrope font-semibold leading-[1.5] transition-colors cursor-pointer hover:bg-[#525252] p-[clamp(0.375rem,1vw,0.5rem)_clamp(0.75rem,2vw,1rem)] text-[length:clamp(0.75rem,1.6vw,0.875rem)] gap-[6px]"
          >
            See All
          </button>
        </div>

        {/* Amenities Grid - 2 columns mobile, 4 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-[clamp(1rem,2.5vw,1.125rem)]">
          {amenities.map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-[clamp(0.5rem,1.5vw,0.625rem)]">
              <Image 
                src={amenity.icon} 
                alt="" 
                width={24} 
                height={24} 
                className="shrink-0 w-[1.5rem] h-[1.5rem]" 
              />
              <span 
                className="font-medium text-[#262626] overflow-hidden text-ellipsis whitespace-nowrap font-manrope text-[length:clamp(0.875rem,2vw,1rem)] leading-[1.5]"
              >
                {amenity.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile button - full width */}
        <button 
          onClick={() => setShowAllAmenities(true)}
          className="md:hidden flex items-center justify-center bg-[#262626] text-[#fafafa] font-manrope font-semibold leading-[1.5] transition-colors cursor-pointer hover:bg-[#525252] w-[clamp(200px,55vw,207.25px)] p-[8px_12px] gap-[6px] rounded-[8px]"
        >
          See All
        </button>
      </div>

      <AmenitiesModal 
        isOpen={showAllAmenities}
        onClose={() => setShowAllAmenities(false)}
      />
    </div>
  );
}
