"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/assets/image_grid_1.jpg",
  "/assets/image_grid_2.jpg",
  "/assets/image_grid_3.jpg",
  "/assets/image_grid_4.jpg",
  "/assets/image_grid_5.jpg",
];

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  galleryImages?: string[];
}

export default function ImageGalleryModal({ isOpen, onClose, initialIndex = 0, galleryImages }: ImageGalleryModalProps) {
  const currentImages = galleryImages || images;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#333] flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-8 py-[18px]">
        <div 
          className="flex items-center gap-2" 
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="p-0 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6 text-gray-50" />
          </button>
          <p className="font-archivo font-medium text-lg text-gray-50 leading-[1.5]">
            Sattva Vasanta Skye
          </p>
        </div>
        <div 
          className="flex items-center gap-2" 
          onClick={(e) => e.stopPropagation()}
        >
          <button className="bg-gray-200 border-0 p-2 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors w-[37px] h-[37px]">
            <Heart className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 md:px-12 py-2.5 w-full overflow-hidden gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="hidden md:flex bg-gray-200 border-0 p-3 rounded-lg items-center justify-center hover:bg-gray-300 transition-colors w-12 h-12 shrink-0 z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <div 
          className="flex-1 relative h-full w-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full max-h-[60vh] md:max-h-[75vh]">
            <Image
              src={currentImages[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-contain rounded-xl"
              priority
            />
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="hidden md:flex bg-gray-200 border-0 p-3 rounded-lg items-center justify-center hover:bg-gray-300 transition-colors w-12 h-12 shrink-0 z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="flex flex-col gap-6 pb-6">
        <div 
          className="flex gap-3.5 items-center justify-center overflow-x-auto px-8 scrollbar-hide w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {currentImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 rounded-xl overflow-hidden ${
                idx === currentIndex ? "border-2 border-gray-50" : ""
              } ${
                idx < 8 ? "w-[86px] h-20" : "w-[129px] h-[120px]"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 rounded-xl ${
                  idx === currentIndex ? "bg-black/10" : "bg-black/50"
                }`}
              />
            </button>
          ))}
        </div>

        <p 
          className="font-manrope font-semibold text-base text-white text-center leading-[1.5]"
          onClick={(e) => e.stopPropagation()}
        >
          {currentIndex + 1}/{currentImages.length}
        </p>
      </div>
    </div>
  );
}