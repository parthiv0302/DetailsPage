"use client";

import { useState } from "react";
import Image from "next/image";
import ImageGalleryModal from "./ImageGalleryModal";

interface UnitCardProps {
  unit: {
    bhk: string;
    price: string;
    pricePerSqft: string;
    sbua: string;
    carpetArea: string;
    parking: string;
  };
}

export default function UnitCard({ unit }: UnitCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = ["/assets/unit_plan.png", "/assets/unit_plan.png", "/assets/unit_plan.png"];

  return (
    <>
      <ImageGalleryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialIndex={activeImage}
        galleryImages={images}
        showLikeButton={false}
      />
      
      <div className="flex flex-col items-start shrink-0 border border-[#E5E5E5] bg-white 
        w-[292px] md:w-[386px] 
        p-[16px] md:p-[20px_24px] 
        gap-[24px] 
        rounded-[16px]">
        
        <div className="flex flex-col items-start w-full gap-[14px] md:gap-[12px]">
          <div className="flex items-baseline gap-[8px] w-full">
            <span className="font-archivo font-[600] text-[#262626] text-[18px] md:text-[20px] leading-[1.5]">
              {unit.price}
            </span>
            <span className="font-manrope font-[500] text-[#404040] text-[14px] leading-[1.5]">
              {unit.pricePerSqft}
            </span>
          </div>

          <div className="flex w-full gap-[8px]">
            <div className="flex flex-col items-start gap-[4px] flex-1">
              <p className="font-archivo font-[400] text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                SBUA
              </p>
              <p className="font-manrope font-[600] text-[#262626] text-[16px] leading-[1.5] truncate w-full">
                {unit.sbua}
              </p>
            </div>
            <div className="flex flex-col items-start gap-[4px] flex-1">
              <p className="font-archivo font-[400] text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                Carpet Area
              </p>
              <p className="font-manrope font-[600] text-[#262626] text-[16px] leading-[1.5] truncate w-full">
                {unit.carpetArea}
              </p>
            </div>
            <div className="flex flex-col items-start gap-[4px] flex-1">
              <p className="font-archivo font-[400] text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                Parking
              </p>
              <p className="font-manrope font-[600] text-[#262626] text-[16px] leading-[1.5] truncate w-full">
                {unit.parking}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[8px] w-full">
          <div className="w-full aspect-[260/275] md:aspect-[338/358] shrink-0 rounded-[8px] relative overflow-hidden bg-[#F5F5F5]">
            <div className="absolute inset-0 z-0">
              <Image
                src={images[activeImage]}
                alt="Floor plan"
                fill
                className="object-contain p-4 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.05)] to-[rgba(0,0,0,0.05)] pointer-events-none" />
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute right-[8px] top-[8px] flex justify-center items-center w-[30px] h-[30px] p-[8px] rounded-[8px] bg-[#F5F5F5] cursor-pointer z-10 hover:bg-[#E5E5E5] transition-colors"
            >
              <Image 
                src="/assets/openbuttonunitplan.svg" 
                alt="Open" 
                width={14} 
                height={14} 
                className="w-[14px] h-[14px]"
              />
            </button>
          </div>

          <div className="flex gap-[8px]">
            {images.slice(0, 2).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-[53px] h-[56px] rounded-[8px] border relative overflow-hidden cursor-pointer transition-all ${
                  activeImage === idx ? "border-[#262626] bg-white" : "border-[#E5E5E5] bg-[#F5F5F5]"
                }`}
              >
                <div className="relative w-full h-full p-1">
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-contain mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.10)] to-[rgba(0,0,0,0.10)] pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

