"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UnitCard from "./UnitCard";

const tabs = ["Apartments", "Plots", "Villas", "Row Houses", "Villaments"];

// BHK options based on property type
const bhkOptionsByTab: Record<string, string[]> = {
  "Apartments": ["Studio", "1 BHK", "2 BHK", "3 BHK"],
  "Villas": ["4 BHK", "5 BHK"],
  "Row Houses": ["4 BHK", "5 BHK"],
  "Plots": ["1200 Sqft", "1300 Sqft", "1400 Sqft"],
  "Villaments": ["4 BHK", "5 BHK"],
};

const units = [
  { bhk: "1 BHK", price: "₹85 Lac", pricePerSqft: "₹12,000 /Sqft", sbua: "800 Sqft", carpetArea: "400 Sqft", parking: "3" },
  { bhk: "1 BHK", price: "₹85 Lac", pricePerSqft: "₹12,000 /Sqft", sbua: "800 Sqft", carpetArea: "400 Sqft", parking: "3" },
  { bhk: "1 BHK", price: "₹85 Lac", pricePerSqft: "₹12,000 /Sqft", sbua: "800 Sqft", carpetArea: "400 Sqft", parking: "3" },
  { bhk: "2 BHK", price: "₹1.2 Cr", pricePerSqft: "₹12,000 /Sqft", sbua: "1,000 Sqft", carpetArea: "550 Sqft", parking: "2" },
  { bhk: "3 BHK", price: "₹1.8 Cr", pricePerSqft: "₹12,000 /Sqft", sbua: "1,500 Sqft", carpetArea: "850 Sqft", parking: "2" },
];

export default function UnitPlansSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [activeTab, setActiveTab] = useState("Apartments");
  const [activeBHK, setActiveBHK] = useState("1 BHK");
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get current BHK options based on active tab
  const currentBhkOptions = bhkOptionsByTab[activeTab] || [];

  // Update activeBHK when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newOptions = bhkOptionsByTab[tab] || [];
    if (newOptions.length > 0) {
      setActiveBHK(newOptions[0]);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;
      
      const gap = parseInt(window.getComputedStyle(container).gap || "0");
      const scrollAmount = firstCard.clientWidth + gap;
      
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.clientWidth;
      const gap = parseInt(window.getComputedStyle(container).gap || "0");
      const scrollLeft = container.scrollLeft;
      
      const page = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentPage(Math.min(Math.max(page, 0), units.length - 1));
    }
  };

  return (
    <div className={`w-full flex flex-col gap-5 md:gap-7 ${className || ""}`} {...props}>
      <h2 className="font-archivo font-[600] text-[#262626] text-xl md:text-2xl leading-[1.5] text-left">
        Unit Plans
      </h2>

      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-[1px]">
          <div className="w-full flex gap-6 overflow-x-auto scrollbar-hide border-b border-[#E5E5E5]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-4 px-2.5 gap-2.5 font-manrope leading-[1.5] whitespace-nowrap transition-colors text-base ${
                  activeTab === tab
                    ? "font-[700] text-[#262626] border-b-2 border-[#262626]"
                    : "font-[500] text-[#525252]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 bg-[#F3E8FF] rounded-[0_0_12px_12px] p-4 md:px-5">
            <div className="flex flex-wrap gap-3">
              {currentBhkOptions.map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => setActiveBHK(bhk)}
                  className={`px-3 py-2 rounded-lg font-manrope font-[600] leading-[1.5] whitespace-nowrap transition-all text-sm ${
                    activeBHK === bhk
                      ? "border border-[#262626] bg-[#F5F5F5] text-[#262626]"
                      : "border border-[#D4D4D4] bg-[#FAFAFA] text-[#525252]"
                  }`}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 text-[#525252] font-manrope font-[500] text-sm leading-[150%]">
            <span>24 Units</span>
            <div className="w-[1px] bg-[#D4D4D4] h-4" />
            <span>1,200-2,400 Sqft</span>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-[30px] h-[30px] p-2 bg-[#E5E5E5] border-0 rounded-lg flex items-center justify-center hover:bg-[#D4D4D4] transition-colors"
            >
              <ChevronLeft className="w-[14px] h-[14px] text-[#262626]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-[30px] h-[30px] p-2 bg-[#E5E5E5] border-0 rounded-lg flex items-center justify-center hover:bg-[#D4D4D4] transition-colors"
            >
              <ChevronRight className="w-[14px] h-[14px] text-[#262626]" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-5"
        >
          {units.map((unit, idx) => (
            <div key={idx} className="snap-start shrink-0">
              <UnitCard unit={unit} />
            </div>
          ))}
        </div>

        <div className="w-full flex lg:hidden items-center justify-center gap-1">
          {units.map((_, page) => (
            <button
              key={page}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const container = scrollContainerRef.current;
                  const firstCard = container.firstElementChild as HTMLElement;
                  if (firstCard) {
                     const cardWidth = firstCard.clientWidth;
                     const gap = parseInt(window.getComputedStyle(container).gap || "0");
                     const targetScroll = page * (cardWidth + gap);
                     container.scrollTo({
                       left: targetScroll,
                       behavior: "smooth"
                     });
                     setCurrentPage(page);
                  }
                }
              }}
              className={`h-1 rounded-full transition-all ${
                currentPage === page ? "bg-[#262626] w-6" : "bg-[#D4D4D4] w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

