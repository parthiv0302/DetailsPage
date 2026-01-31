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
      <div className="flex flex-col w-full bg-white gap-5 md:gap-7">
        <div className="flex items-center justify-between gap-8">
          <h2 className="font-archivo font-[600] text-[#262626] text-xl md:text-2xl leading-[1.5]">
            Amenities
          </h2>
          <button 
            onClick={() => setShowAllAmenities(true)}
            className="hidden md:flex items-center justify-center bg-[#262626] text-[#FAFAFA] rounded-lg font-manrope font-[600] text-sm leading-[1.5] transition-colors cursor-pointer hover:bg-[#404040] py-2 px-3 gap-1.5"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {amenities.map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-2.5 min-w-0">
              <Image src={amenity.icon} alt="" width={24} height={24} className="shrink-0 w-6 h-6" />
              <span className="font-manrope font-[500] text-[#262626] text-base leading-[1.5] truncate">
                {amenity.label}
              </span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setShowAllAmenities(true)}
          className="md:hidden flex items-center justify-center w-32 bg-[#262626] text-[#FAFAFA] font-manrope font-[600] text-sm leading-[1.5] transition-colors cursor-pointer hover:bg-[#404040] py-1.5 px-2 gap-1.5 rounded-lg self-start"
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

