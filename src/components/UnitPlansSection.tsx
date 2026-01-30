"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UnitCard from "./UnitCard";

const tabs = ["Apartments", "Plots", "Villas", "Row Houses", "Villaments"];
const bhkOptions = ["Studio", "1 BHK", "2 BHK", "3 BHK"];

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

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = 350; // Approximate card width
      const gap = 20; // Gap between cards
      const page = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentPage(Math.min(Math.max(page, 0), 3));
    }
  };

  return (
    <div className={`w-full flex flex-col gap-[28px] ${className || ""}`} {...props}>
      <h2 className="font-archivo font-semibold text-[#262626] text-[24px] leading-[1.5] md:text-left text-center">
        Unit Plans
      </h2>

      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col items-start gap-[1px]">
          <div className="w-full flex gap-6 overflow-x-auto scrollbar-hide border-b border-[#e5e5e5]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-[16px] px-[10px] gap-[10px] font-manrope leading-[1.5] whitespace-nowrap transition-colors text-[16px] ${
                  activeTab === tab
                    ? "font-bold text-[#262626] border-b-2 border-[#262626]"
                    : "font-medium text-[#525252]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-[8px] bg-[#F3E8FF] rounded-[0_0_12px_12px] p-[16px_20px]">
          {bhkOptions.map((bhk) => (
            <button
              key={bhk}
              onClick={() => setActiveBHK(bhk)}
              className={`px-[12px] py-[8px] gap-[8px] rounded-[8px] font-manrope leading-[1.5] whitespace-nowrap transition-all text-[14px] ${
                activeBHK === bhk
                  ? "border-[1.5px] border-[#262626] bg-[#F5F5F5] font-semibold text-[#262626]"
                  : "border-[1.5px] border-[#D4D4D4] bg-[#FAFAFA] font-medium text-[#525252]"
              }`}
            >
              {bhk}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[12px] flex-1 text-[#525252] font-manrope font-medium text-[14px] leading-[150%]">
          <span>24 Units</span>
          <div className="w-[1px] bg-[#D4D4D4] h-[16px]" />
          <span>1,200-2,400 Sqft</span>
        </div>
        <div className="hidden md:flex gap-[clamp(0.5rem,1.5vw,1rem)]">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-200 border-0 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors w-[clamp(1.75rem,3.5vw,1.875rem)] h-[clamp(1.75rem,3.5vw,1.875rem)] p-[clamp(0.375rem,1vw,0.5rem)]"
          >
            <ChevronLeft className="w-[clamp(1rem,2.5vw,1.5rem)] h-[clamp(1rem,2.5vw,1.5rem)]" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-gray-200 border-0 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors w-[clamp(1.75rem,3.5vw,1.875rem)] h-[clamp(1.75rem,3.5vw,1.875rem)] p-[clamp(0.375rem,1vw,0.5rem)]"
          >
            <ChevronRight className="w-[clamp(1rem,2.5vw,1.5rem)] h-[clamp(1rem,2.5vw,1.5rem)]" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory gap-[32px]"
      >
        {units.map((unit, idx) => (
          <div key={idx} className="snap-start shrink-0">
            <UnitCard unit={unit} />
          </div>
        ))}
      </div>

      <div className="w-full flex md:hidden items-center justify-center gap-[clamp(0.125rem,0.3vw,0.15rem)]">
        {[0, 1, 2, 3, 4].map((page) => (
          <button
            key={page}
            onClick={() => {
              if (scrollContainerRef.current) {
                const cardWidth = 292;
                const gap = 18;
                const targetScroll = page * (cardWidth + gap);
                scrollContainerRef.current.scrollTo({
                  left: targetScroll,
                  behavior: "smooth"
                });
                setCurrentPage(page);
              }
            }}
            className={`rounded-full transition-all w-[clamp(0.45rem,1.2vw,0.5rem)] h-[clamp(0.45rem,1.2vw,0.5rem)] ${
              currentPage === page ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
