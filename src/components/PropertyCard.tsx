"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Eye, AlertTriangle, ShieldCheck, HardHat, Scale, Building } from "lucide-react";
import PropertyIssuesModal from "./PropertyIssuesModal";

interface PropertyCardProps {
  property: {
    name: string;
    location: string;
    price: string;
    bhk: string;
    area: string;
    status: string;
    rera: boolean;
    images: string[];
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showIssuesModal, setShowIssuesModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [property.images.length]);

  const handleIssuesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowIssuesModal(true);
  };

  return (
    <>
      <div className="w-72 md:w-80 flex-shrink-0 flex flex-col gap-2.5 cursor-pointer group bg-white h-full">
      <div className="w-full aspect-[4/3] rounded-lg relative overflow-hidden p-2 flex flex-col justify-between">
        <Image
          src={property.images[currentImageIndex]}
          alt={property.name}
          fill
          className="object-cover transition-transform"
        />
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-green-700 px-2 py-0.5 rounded-full">
              <div className="w-5 h-5 text-gray-50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <span className="text-xs font-[500] text-gray-50 whitespace-nowrap leading-[1.5]">80% Matched</span>
            </div>
            <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full">
              <Eye className="w-5 h-5 text-gray-50" />
              <span className="text-xs font-[500] text-gray-50 leading-[1.5]">Seen</span>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
            className="w-8 h-8 bg-black/40 rounded-md flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
          >
            <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-50'}`} />
          </button>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {false && (
              <div className="flex items-center gap-1 bg-gray-200 px-2 py-0.5 rounded-full">
                <HardHat className="w-5 h-5 text-gray-800" />
                <span className="text-xs font-[600] text-gray-800 leading-[1.5]">Builder Unit</span>
              </div>
            )}
            <button 
              onClick={handleIssuesClick}
              className="flex items-center gap-1 bg-rose-200 px-2 py-0.5 rounded-full backdrop-blur-sm cursor-pointer hover:bg-rose-300 transition-colors"
            >
              <AlertTriangle className="w-6 h-6 text-rose-800" />
              <span className="text-[10px] font-[700] text-rose-800 text-center leading-[1.5]">3 Issues</span>
            </button>
          </div>
          <div className="flex gap-1">
            {property.images.slice(0, 5).map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentImageIndex ? "bg-gray-50" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 flex-1 justify-between px-3 pb-3">
        <div>
          <div className="flex flex-col gap-0.5 mb-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-[700] text-gray-700 text-base truncate flex-1 leading-[1.5]">{property.name}</h3>
              {property.rera && (
                <div className="flex items-center gap-1 bg-blue-100 px-2 py-0.5 rounded-full ml-2">
                  <ShieldCheck className="w-4 h-4 text-blue-800" />
                  <span className="text-xs font-[600] text-blue-800 leading-[1.5]">RERA</span>
                </div>
              )}
            </div>
            <p className="text-sm font-[500] text-gray-700 truncate leading-[1.5] h-5">
              <span className="font-[700] text-gray-800">{property.bhk}</span>
              {" "}BHKs for sale in Devanhalli
            </p>
          </div>
          
          <p className="text-lg font-extrabold text-gray-800 truncate leading-[1.5]">{property.price}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between min-h-[2rem] gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Scale className="w-5 h-5 text-gray-500 shrink-0" />
              <span className="text-sm font-[500] text-gray-700 truncate leading-[1.5] whitespace-nowrap">{property.area}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0 justify-end">
              <Building className="w-5 h-5 text-gray-500 shrink-0" />
              <span className="text-sm font-[500] text-gray-700 leading-[1.5] whitespace-nowrap">{property.status}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs font-[400] text-gray-700 leading-[1.5]">
            <span className="whitespace-nowrap">Updated on: Dec 2025</span>
            <span className="text-right whitespace-nowrap">Possession by: Oct 2032</span>
          </div>
        </div>
      </div>
    </div>

    <PropertyIssuesModal 
      isOpen={showIssuesModal}
      onClose={() => setShowIssuesModal(false)}
    />
  </>
  );
}
