"use client";

import React from "react";
import Image from "next/image";

export default function MobileMapButton() {
  const scrollToLocality = () => {
    console.log("Attempting to scroll to locality");
    const element = document.getElementById("locality");
    console.log("Element found:", element);
    
    if (element) {
      // Try scrollIntoView first as it's more robust
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.log("Locality element not found");
    }
  };

  return (
    <button 
      type="button"
      onClick={scrollToLocality}
      className="md:hidden w-full rounded-lg overflow-hidden border border-gray-200 relative bg-[#F5F5F5] h-[84px] flex items-center justify-center gap-[7px] cursor-pointer mb-[36px] z-10"
    >
      <Image 
        src="/mapicon.svg" 
        alt="Map" 
        width={20} 
        height={20} 
        className="w-[20px] h-[20px] pointer-events-none" 
      />
      <span className="font-archivo font-semibold text-[#404040] leading-[1.2] text-[14px] tracking-[0.25px] pointer-events-none">View on Map</span>
    </button>
  );
}
