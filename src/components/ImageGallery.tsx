"use client";

import { useState } from "react";
import Image from "next/image";
import ImageGalleryModal from "./ImageGalleryModal";

type LayoutType = "default" | "single" | "double" | "triple";

interface ImageGalleryProps {
  images?: string[];
  layout?: LayoutType;
}

const DEFAULT_IMAGES = [
  "/assets/image_grid_1.jpg",
  "/assets/image_grid_2.jpg",
  "/assets/image_grid_3.jpg",
  "/assets/image_grid_4.jpg",
  "/assets/image_grid_5.jpg",
];

export default function ImageGallery({ 
  images = DEFAULT_IMAGES,
  layout = "default"
}: ImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const imageCount = images.length;

  // Desktop Layout - Fixed 5-image grid (default)
  const renderDesktopDefault = () => (
    <div className="hidden lg:grid grid-cols-2 w-full gap-5">
      {/* Main Large Image - Left Side */}
      <div 
        className="relative rounded-lg overflow-hidden cursor-pointer aspect-[662/420]"
        onClick={() => openModal(0)}
      >
        <Image src={images[0]} alt="Property main image" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <MediaControls />
      </div>

      {/* Right Side - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-5">
        <div 
          className="relative rounded-lg overflow-hidden cursor-pointer aspect-[321/200]"
          onClick={() => openModal(1)}
        >
          <Image src={images[1] || images[0]} alt="Property image 2" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div 
          className="relative rounded-lg overflow-hidden cursor-pointer aspect-[321/200]"
          onClick={() => openModal(2)}
        >
          <Image src={images[2] || images[0]} alt="Property image 3" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div 
          className="relative rounded-lg overflow-hidden cursor-pointer aspect-[321/200]"
          onClick={() => openModal(3)}
        >
          <Image src={images[3] || images[0]} alt="Property image 4" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div 
          className="relative rounded-lg overflow-hidden cursor-pointer aspect-[321/200]"
          onClick={() => openModal(4)}
        >
          <Image src={images[4] || images[0]} alt="Property image 5" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <ShowAllButton onClick={() => openModal(0)} count={imageCount} isMobile={false} />
        </div>
      </div>
    </div>
  );

  // Single image layout
  const renderDesktopSingle = () => (
    <div className="hidden lg:flex w-full">
      <div 
        className="w-full relative rounded-lg overflow-hidden cursor-pointer aspect-[1344/420]"
        onClick={() => openModal(0)}
      >
        <Image src={images[0]} alt="Property image" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <MediaControls />
      </div>
    </div>
  );

  // Two images side by side
  const renderDesktopDouble = () => (
    <div className="hidden lg:grid grid-cols-2 w-full gap-5">
      <div 
        className="relative rounded-lg overflow-hidden cursor-pointer aspect-[662/420]"
        onClick={() => openModal(0)}
      >
        <Image src={images[0]} alt="Property image 1" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <MediaControls />
      </div>
      <div 
        className="relative rounded-lg overflow-hidden cursor-pointer aspect-[662/420]"
        onClick={() => openModal(1)}
      >
        <Image src={images[1] || images[0]} alt="Property image 2" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </div>
  );

  // Large left + 2 stacked right
  const renderDesktopTriple = () => (
    <div className="hidden lg:grid grid-cols-2 w-full gap-5">
      <div 
        className="relative rounded-lg overflow-hidden cursor-pointer aspect-[662/420]"
        onClick={() => openModal(0)}
      >
        <Image src={images[0]} alt="Property image 1" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <MediaControls />
      </div>
      <div className="flex flex-col gap-5">
        <div 
          className="flex-1 relative rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openModal(1)}
        >
          <Image src={images[1] || images[0]} alt="Property image 2" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div 
          className="flex-1 relative rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openModal(2)}
        >
          <Image src={images[2] || images[0]} alt="Property image 3" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>
    </div>
  );

  const renderDesktopLayout = () => {
    switch (layout) {
      case "single":
        return renderDesktopSingle();
      case "double":
        return renderDesktopDouble();
      case "triple":
        return renderDesktopTriple();
      default:
        return renderDesktopDefault();
    }
  };

  // Tablet Layout - Fixed layout
  const renderTabletLayout = () => (
    <div className="hidden md:grid lg:hidden grid-cols-3 w-full gap-5 items-start">
      <div 
        className="col-span-2 relative rounded-lg overflow-hidden cursor-pointer aspect-[403/302]"
        onClick={() => openModal(0)}
      >
        <Image src={images[0]} alt="Property main image" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <MediaControls />
      </div>

      <div className="col-span-1 flex flex-col gap-3">
        <div 
          className="relative rounded-lg overflow-hidden cursor-pointer aspect-[233/145]"
          onClick={() => openModal(1)}
        >
          <Image src={images[1] || images[0]} alt="Property image 2" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div 
          className="relative rounded-lg overflow-hidden cursor-pointer aspect-[233/145]"
          onClick={() => openModal(2)}
        >
          <Image src={images[2] || images[0]} alt="Property image 3" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          {imageCount > 3 && <ShowAllButton onClick={() => openModal(0)} count={imageCount} isMobile />}
        </div>
      </div>
    </div>
  );

  // Mobile Layout - Main image + 2 thumbnails below
  const renderMobileLayout = () => (
    <div className="md:hidden w-full flex flex-col gap-2.5">
      {/* Main Large Image */}
      <div 
        className="relative w-full rounded-[8px] overflow-hidden cursor-pointer aspect-[359/228]"
        onClick={() => openModal(0)}
      >
        <Image src={images[0]} alt="Property main image" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <MediaControls isVideo={true} />
      </div>

      {/* Two Thumbnails Below */}
      <div className="flex gap-2.5 w-full">
        <div 
          className="flex-1 relative rounded-[4px] overflow-hidden cursor-pointer aspect-[174/107]"
          onClick={() => openModal(1)}
        >
          <Image src={images[1] || images[0]} alt="Property image 2" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div 
          className="flex-1 relative rounded-[4px] overflow-hidden cursor-pointer aspect-[175/108]"
          onClick={() => openModal(2)}
        >
          <Image src={images[2] || images[0]} alt="Property image 3" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          {imageCount > 3 && <ShowAllButton onClick={() => openModal(0)} count={imageCount} isMobile />}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedImageIndex}
        galleryImages={images}
      />

      {renderDesktopLayout()}
      {renderTabletLayout()}
      {renderMobileLayout()}
    </>
  );
}

function MediaControls({ isVideo = false }: { isVideo?: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center gap-4 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.70)_100%)] rounded-b-lg">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
        <path d="M10 18.333C14.602 18.333 18.333 14.602 18.333 10C18.333 5.398 14.602 1.667 10 1.667C5.398 1.667 1.667 5.398 1.667 10C1.667 14.602 5.398 18.333 10 18.333Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.333 6.667L13.333 10L8.333 13.333V6.667Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <div className="flex items-center gap-2 flex-1">
        <div className="h-[2px] w-[54px] rounded bg-white/40 relative">
          <div className="h-full w-[80%] rounded bg-[#FAFAFA]" />
        </div>
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="h-[2px] flex-1 min-w-6 max-w-[54px] rounded bg-white/40" />
        ))}
      </div>

      {isVideo && (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path d="M9.167 3.919C9.167 3.803 9.132 3.689 9.068 3.593C9.003 3.496 8.911 3.421 8.804 3.377C8.697 3.332 8.579 3.321 8.465 3.343C8.351 3.366 8.247 3.422 8.164 3.504L5.344 6.323C5.236 6.432 5.106 6.519 4.964 6.578C4.821 6.637 4.668 6.667 4.514 6.667H2.5C2.279 6.667 2.067 6.755 1.911 6.911C1.755 7.067 1.667 7.279 1.667 7.5V12.5C1.667 12.721 1.755 12.933 1.911 13.089C2.067 13.246 2.279 13.333 2.5 13.333H4.514C4.668 13.333 4.821 13.363 4.964 13.422C5.106 13.482 5.236 13.568 5.344 13.678L8.164 16.498C8.246 16.58 8.351 16.636 8.465 16.659C8.579 16.682 8.697 16.67 8.804 16.626C8.912 16.581 9.004 16.506 9.068 16.409C9.133 16.312 9.167 16.198 9.167 16.082V3.919Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.333 7.5C13.874 8.221 14.166 9.098 14.166 10C14.166 10.902 13.874 11.779 13.333 12.5" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.137 15.304C16.833 14.608 17.386 13.781 17.763 12.871C18.14 11.961 18.333 10.986 18.333 10.001C18.333 9.016 18.14 8.04 17.763 7.13C17.386 6.221 16.833 5.394 16.137 4.697" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

function ShowAllButton({ onClick, count, isMobile = false }: { onClick: () => void; count: number; isMobile?: boolean }) {
  return (
    <div className={`absolute ${isMobile ? 'bottom-2.5 right-2.5' : 'bottom-4 right-4'}`} onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={onClick}
        className={`flex items-center justify-center bg-gray-50 rounded-[6px] shadow-sm hover:bg-gray-100 transition-colors cursor-pointer ${
          isMobile ? 'gap-1.5 px-2 py-1.5' : 'gap-1.5 px-4 py-3'
        }`}
      >
        <Image src="/showallphoto.svg" alt="Gallery" width={isMobile ? 18 : 24} height={isMobile ? 18 : 24} />
        <span className={`text-[#262626] font-[600] ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {count > 5 ? `+${count - 5} more` : "Show all photo"}
        </span>
      </button>
    </div>
  );
}

