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
      className="md:hidden w-full rounded-lg overflow-hidden border border-gray-200 relative bg-[#F5F5F5] h-20 flex items-center justify-center gap-2 cursor-pointer mb-9 z-10"
    >
      <Image 
        src="/mapicon.svg" 
        alt="Map" 
        width={20} 
        height={20} 
        className="w-5 h-5 pointer-events-none" 
      />
      <span className="font-archivo font-[600] text-[#404040] leading-[1.2] text-sm tracking-[0.25px] pointer-events-none">View on Map</span>
    </button>
  );
}

