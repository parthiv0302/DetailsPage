"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
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
      />
      
      <div className="flex flex-col items-start gap-[32px] w-fit shrink-0 border border-[#E5E5E5] rounded-[12px] p-[24px] bg-white shadow-sm max-w-full">
        {/* Text Content Box */}
        <div className="flex flex-col items-start gap-[12px] w-full max-w-[338px]">
          <div className="flex items-baseline gap-[8px] self-stretch">
            <span className="font-archivo font-semibold text-[#262626] text-[20px] leading-[1.5]">
              {unit.price}
            </span>
            <span className="font-manrope font-medium text-[#404040] text-[14px] leading-[1.5]">
              {unit.pricePerSqft}
            </span>
          </div>

          <div className="flex w-full gap-[12px]">
            <div className="flex flex-col items-start gap-[4px] flex-[1_0_0]">
              <p className="font-archivo font-normal text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                SBUA
              </p>
              <p className="font-manrope font-semibold text-[#262626] text-[16px] leading-[1.5] truncate w-full">
                {unit.sbua}
              </p>
            </div>
            <div className="flex flex-col items-start gap-[4px] flex-[1_0_0]">
              <p className="font-archivo font-normal text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                Carpet Area
              </p>
              <p className="font-manrope font-semibold text-[#262626] text-[16px] leading-[1.5] truncate w-full">
                {unit.carpetArea}
              </p>
            </div>
            <div className="flex flex-col items-start gap-[4px] flex-[1_0_0]">
              <p className="font-archivo font-normal text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                Parking
              </p>
              <p className="font-manrope font-semibold text-[#262626] text-[16px] leading-[1.5] truncate w-full">
                {unit.parking}
              </p>
            </div>
          </div>
        </div>

        {/* Image Section Wrapper */}
        <div className="flex flex-col gap-[12px] w-full max-w-[338px]">
          {/* Image Box */}
          <div className="w-full aspect-[338/358] shrink-0 rounded-[8px] border-[1.5px] border-[#F5F5F5] relative overflow-hidden bg-[#F5F5F5]">
            <div className="absolute inset-0 z-0">
               <Image
                src={images[activeImage]}
                alt="Floor plan"
                fill
                className="object-contain p-4 mix-blend-multiply"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.05)] to-[rgba(0,0,0,0.05)] pointer-events-none" />
            </div>

            {/* Open Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute right-[8px] top-[8px] flex justify-center items-center w-[30px] h-[30px] p-[8px] gap-[6px] rounded-[8px] bg-[#F5F5F5] cursor-pointer z-10 hover:bg-[#e5e5e5] transition-colors"
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

          {/* Sub Images (Thumbnails - Now Outside) */}
          <div className="flex gap-[8px]">
            {images.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-[53px] h-[56px] rounded-[8px] border-[1.5px] relative overflow-hidden cursor-pointer transition-all ${
                  activeImage === idx ? "border-black bg-white" : "border-[#E5E5E5] bg-[#F5F5F5]"
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
