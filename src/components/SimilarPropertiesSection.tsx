"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";

const filters = ["Builder Unit", "Resale Units"];

const properties = [
  {
    name: "Brigade Eldorado",
    location: "Devanahalli, North Bangalore",
    price: "₹72L - ₹2.85 Cr",
    bhk: "1, 2, 3 BHK",
    area: "550 - 1,850 sq.ft",
    status: "Under Construction",
    rera: true,
    images: ["/assets/image_grid_1.jpg", "/assets/image_grid_2.jpg", "/assets/image_grid_3.jpg"],
  },
  {
    name: "Prestige Lakeside Habitat",
    location: "Whitefield, East Bangalore",
    price: "₹95L - ₹3.50 Cr",
    bhk: "2, 3, 4 BHK",
    area: "1,050 - 2,400 sq.ft",
    status: "Ready to Move",
    rera: true,
    images: ["/assets/image_grid_2.jpg", "/assets/image_grid_3.jpg", "/assets/image_grid_4.jpg"],
  },
  {
    name: "Sobha Dream Acres",
    location: "Panathur, East Bangalore",
    price: "₹68L - ₹1.95 Cr",
    bhk: "1, 2, 3 BHK",
    area: "600 - 1,550 sq.ft",
    status: "Under Construction",
    rera: true,
    images: ["/assets/image_grid_3.jpg", "/assets/image_grid_4.jpg", "/assets/image_grid_5.jpg"],
  },
  {
    name: "Godrej Splendour",
    location: "Whitefield, East Bangalore",
    price: "₹82L - ₹2.45 Cr",
    bhk: "1, 2, 3 BHK",
    area: "650 - 1,750 sq.ft",
    status: "Pre-Launch",
    rera: true,
    images: ["/assets/image_grid_4.jpg", "/assets/image_grid_5.jpg", "/assets/image_grid_1.jpg"],
  },
  {
    name: "Puravankara Zenium",
    location: "Devanahalli, North Bangalore",
    price: "₹75L - ₹2.20 Cr",
    bhk: "2, 3 BHK",
    area: "950 - 1,650 sq.ft",
    status: "Under Construction",
    rera: true,
    images: ["/assets/image_grid_5.jpg", "/assets/image_grid_1.jpg", "/assets/image_grid_2.jpg"],
  },
  {
    name: "Total Environment Windmills",
    location: "Whitefield, East Bangalore",
    price: "₹1.2 Cr - ₹4.5 Cr",
    bhk: "3, 4 BHK",
    area: "1,450 - 3,200 sq.ft",
    status: "Ready to Move",
    rera: true,
    images: ["/assets/image_grid_1.jpg", "/assets/image_grid_3.jpg", "/assets/image_grid_5.jpg"],
  },
];

export default function SimilarPropertiesSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [activeFilter, setActiveFilter] = useState("Builder Unit");
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const firstCard = container.firstElementChild as HTMLElement;
        if (!firstCard) return;

        const cardWidth = firstCard.clientWidth;
        const gap = parseInt(window.getComputedStyle(container).gap || "0");
        const scrollLeft = container.scrollLeft;
        
        const page = Math.round(scrollLeft / (cardWidth + gap));
        setCurrentPage(page);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const totalPages = properties.length;

  return (
    <div className={`flex flex-col w-full bg-white gap-4 md:gap-6 ${className || ""}`} {...props}>
      <div className="flex items-center justify-between">
        <h2 
          className="font-[600] text-[#262626] leading-[1.5] font-archivo text-xl md:text-2xl"
        >
          Similar properties
        </h2>
        
        <div className="hidden md:flex gap-4 items-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg font-[600] transition-all font-manrope text-base leading-[1.5] px-4 py-3 gap-2 ${
                activeFilter === filter
                  ? "bg-[#f5f5f5] border-[1.5px] border-[#262626] text-[#262626]"
                  : "border-[1.5px] border-[#d4d4d4] text-[#525252] hover:border-gray-400"
              }`}
            >
              {filter}
            </button>
          ))}
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex md:hidden items-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg font-[600] transition-all font-manrope text-sm leading-[1.5] px-3 py-2 gap-2 ${
              activeFilter === filter
                ? "bg-[#f5f5f5] border-[1.5px] border-[#262626] text-[#262626]"
                : "border-[1.5px] border-[#d4d4d4] text-[#525252]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory md:snap-none gap-4 md:gap-5"
      >
        {properties.map((property, idx) => (
          <div key={idx} className="snap-start md:snap-align-none h-full">
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      <div className="flex md:hidden items-center justify-center gap-0.5">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full transition-colors w-2 h-2 ${idx === currentPage ? 'bg-[#262626]' : 'bg-[#d4d4d4]'}`}
          />
        ))}
      </div>
    </div>
  );
}
