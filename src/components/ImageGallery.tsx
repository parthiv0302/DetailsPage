"use client";

import { useState } from "react";
import Image from "next/image";
import { Grid2X2, LayoutGrid } from "lucide-react";
import ImageGalleryModal from "./ImageGalleryModal";

const images = [
  "/assets/image_grid_1.jpg",
  "/assets/image_grid_2.jpg",
  "/assets/image_grid_3.jpg",
  "/assets/image_grid_4.jpg",
  "/assets/image_grid_5.jpg",
];

export default function ImageGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedImageIndex}
      />

      {/* Desktop Layout (lg and up) */}
      <div className="hidden lg:flex w-full gap-[1.25rem]">
        {/* Main Large Image - Left Side */}
        <div 
          className="flex-1 relative rounded-lg overflow-hidden cursor-pointer aspect-[662/420]"
          onClick={() => openModal(0)}
        >
          <Image
            src={images[0]}
            alt="Property main image"
            fill
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)]" />

          {/* Media Controls Bar at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-[1.375rem] py-[0.75rem] flex items-center gap-[1rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.70)_100%)] rounded-br-lg rounded-bl-lg">
            {/* Play Button */}
            <div className="w-[1.25rem] h-[1.25rem] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_play)">
                  <path d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33301 6.66602L13.333 9.99935L8.33301 13.3327V6.66602Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_play">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Scroll/Progress Section */}
            <div className="flex items-center gap-[0.5rem] flex-1">
              <div className="shrink-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="2" viewBox="0 0 54 2" fill="none" className="w-[clamp(2.5rem,5vw,3.375rem)] h-[2px]">
                  <rect width="54" height="2" rx="1" fill="white" fillOpacity="0.4"/>
                  <rect width="43" height="2" rx="1" fill="#FAFAFA"/>
                </svg>
              </div>
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="h-[2px] flex-1 min-w-[1.5rem] max-w-[3.375rem] rounded-[17px] bg-white/40" />
              ))}
            </div>

            {/* Volume Control */}
            <div className="w-[1.25rem] h-[1.25rem] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
                <path d="M9.16699 3.91868C9.16682 3.80261 9.13228 3.68919 9.06771 3.59273C9.00314 3.49627 8.91145 3.4211 8.8042 3.3767C8.69696 3.33231 8.57896 3.32068 8.46511 3.34327C8.35126 3.36587 8.24665 3.42169 8.16449 3.50368L5.34449 6.32285C5.23566 6.43233 5.10619 6.51912 4.96357 6.5782C4.82095 6.63728 4.66803 6.66747 4.51366 6.66702H2.50033C2.27931 6.66702 2.06735 6.75481 1.91107 6.91109C1.75479 7.06737 1.66699 7.27934 1.66699 7.50035V12.5003C1.66699 12.7214 1.75479 12.9333 1.91107 13.0896C2.06735 13.2459 2.27931 13.3337 2.50033 13.3337H4.51366C4.66803 13.3332 4.82095 13.3634 4.96357 13.4225C5.10619 13.4816 5.23566 13.5684 5.34449 13.6778L8.16366 16.4978C8.24583 16.5802 8.35058 16.6363 8.46465 16.659C8.57872 16.6817 8.69698 16.6701 8.80443 16.6256C8.91188 16.581 9.0037 16.5056 9.06824 16.4088C9.13279 16.3121 9.16715 16.1983 9.16699 16.082V3.91868Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.333 7.5C13.8739 8.22123 14.1663 9.09846 14.1663 10C14.1663 10.9015 13.8739 11.7788 13.333 12.5" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.1367 15.3039C16.8332 14.6075 17.3856 13.7807 17.7625 12.8707C18.1395 11.9608 18.3335 10.9855 18.3335 10.0006C18.3335 9.01568 18.1395 8.0404 17.7625 7.13045C17.3856 6.2205 16.8332 5.39371 16.1367 4.69727" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - 2x2 Grid */}
        <div className="flex-1 grid grid-cols-2 gap-[1.25rem]">
          {/* Top Left Image */}
          <div 
            className="relative rounded-lg overflow-hidden cursor-pointer aspect-[321/200]"
            onClick={() => openModal(1)}
          >
            <Image
              src={images[1]}
              alt="Property image 2"
              fill
              className="object-cover"
            />
          </div>

          {/* Top Right Image */}
          <div 
            className="relative rounded-lg overflow-hidden cursor-pointer aspect-[321/200]"
            onClick={() => openModal(2)}
          >
            <Image
              src={images[2]}
              alt="Property image 3"
              fill
              className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10 rounded-lg" />
          </div>

          {/* Bottom Left Image */}
          <div 
            className="relative rounded-lg overflow-hidden cursor-pointer aspect-[321/200]"
            onClick={() => openModal(3)}
          >
            <Image
              src={images[3]}
              alt="Property image 4"
              fill
              className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10 rounded-lg" />
          </div>

          {/* Bottom Right Image with Show All Button */}
          <div 
            className="relative rounded-lg overflow-hidden cursor-pointer aspect-[321/200]"
            onClick={() => openModal(4)}
          >
            <Image
              src={images[4]}
              alt="Property image 5"
              fill
              className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10 rounded-lg" />
            
            {/* Show All Photo Button */}
            <div className="absolute bottom-4 right-4" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => openModal(0)}
                className="flex items-center gap-[0.375rem] bg-gray-50 px-[1rem] py-[0.75rem] rounded-md shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Image 
                  src="/showallphoto.svg" 
                  alt="Gallery" 
                  width={24} 
                  height={24} 
                  className="w-[1.5rem] h-[1.5rem]" 
                />
                <span className="text-gray-600 text-sm font-semibold">Show all photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout (md to lg) */}
      <div className="hidden md:flex lg:hidden w-full gap-[1.25rem] items-start">
        {/* Main Image - Left */}
        <div 
          className="flex-[404] relative rounded-lg overflow-hidden cursor-pointer aspect-[404/302.164]"
          onClick={() => openModal(0)}
        >
          <Image
            src={images[0]}
            alt="Property main image"
            fill
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)]" />

          {/* Media Controls Bar at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-[1.375rem] py-[0.75rem] flex items-center gap-[1rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.70)_100%)] rounded-br-lg rounded-bl-lg">
            {/* Play Button */}
            <div className="w-[1.25rem] h-[1.25rem] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_play_tablet)">
                  <path d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33301 6.66602L13.333 9.99935L8.33301 13.3327V6.66602Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_play_tablet">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Scroll/Progress Section */}
            <div className="flex items-center gap-[0.5rem] flex-1">
              <div className="shrink-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="2" viewBox="0 0 54 2" fill="none" className="w-[clamp(2.5rem,5vw,3.375rem)] h-[2px]">
                  <rect width="54" height="2" rx="1" fill="white" fillOpacity="0.4"/>
                  <rect width="43" height="2" rx="1" fill="#FAFAFA"/>
                </svg>
              </div>
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="h-[2px] flex-1 min-w-[1.5rem] max-w-[3.375rem] rounded-[17px] bg-white/40" />
              ))}
            </div>

            {/* Volume Control */}
            <div className="w-[1.25rem] h-[1.25rem] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
                <path d="M9.16699 3.91868C9.16682 3.80261 9.13228 3.68919 9.06771 3.59273C9.00314 3.49627 8.91145 3.4211 8.8042 3.3767C8.69696 3.33231 8.57896 3.32068 8.46511 3.34327C8.35126 3.36587 8.24665 3.42169 8.16449 3.50368L5.34449 6.32285C5.23566 6.43233 5.10619 6.51912 4.96357 6.5782C4.82095 6.63728 4.66803 6.66747 4.51366 6.66702H2.50033C2.27931 6.66702 2.06735 6.75481 1.91107 6.91109C1.75479 7.06737 1.66699 7.27934 1.66699 7.50035V12.5003C1.66699 12.7214 1.75479 12.9333 1.91107 13.0896C2.06735 13.2459 2.27931 13.3337 2.50033 13.3337H4.51366C4.66803 13.3332 4.82095 13.3634 4.96357 13.4225C5.10619 13.4816 5.23566 13.5684 5.34449 13.6778L8.16366 16.4978C8.24583 16.5802 8.35058 16.6363 8.46465 16.659C8.57872 16.6817 8.69698 16.6701 8.80443 16.6256C8.91188 16.581 9.0037 16.5056 9.06824 16.4088C9.13279 16.3121 9.16715 16.1983 9.16699 16.082V3.91868Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.333 7.5C13.8739 8.22123 14.1663 9.09846 14.1663 10C14.1663 10.9015 13.8739 11.7788 13.333 12.5" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.1367 15.3039C16.8332 14.6075 17.3856 13.7807 17.7625 12.8707C18.1395 11.9608 18.3335 10.9855 18.3335 10.0006C18.3335 9.01568 18.1395 8.0404 17.7625 7.13045C17.3856 6.2205 16.8332 5.39371 16.1367 4.69727" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Stacked Images */}
        <div className="flex-[233] flex flex-col gap-[1.25rem]">
          {/* Top Image */}
          <div 
            className="relative rounded-lg overflow-hidden cursor-pointer aspect-[233/145]"
            onClick={() => openModal(1)}
          >
            <Image
              src={images[1]}
              alt="Property image 2"
              fill
              className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)]" />
          </div>

          {/* Bottom Image with Show All Button */}
          <div 
            className="relative rounded-lg overflow-hidden cursor-pointer aspect-[233/145]"
            onClick={() => openModal(2)}
          >
            <Image
              src={images[2]}
              alt="Property image 3"
              fill
              className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)]" />
            
            {/* Show All Photo Button */}
            <div className="absolute bottom-3 right-3" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => openModal(0)}
                className="flex items-center gap-[0.375rem] bg-gray-50 px-[0.75rem] py-[0.5rem] rounded-md shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Image 
                  src="/showallphoto.svg" 
                  alt="Gallery" 
                  width={20} 
                  height={20} 
                  className="w-[1.25rem] h-[1.25rem]" 
                />
                <span className="text-gray-600 text-sm font-semibold whitespace-nowrap">Show all photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (below md) */}
      <div className="md:hidden w-full flex flex-col gap-[0.625rem]">
        {/* Main Large Image */}
        <div 
          className="relative rounded-lg overflow-hidden cursor-pointer aspect-[359/228] w-full"
          onClick={() => openModal(0)}
        >
          <Image
            src={images[0]}
            alt="Property main image"
            fill
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)]" />

          {/* Media Controls Bar at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-[clamp(1rem,6vw,1.375rem)] py-[0.75rem] flex items-center gap-[clamp(0.5rem,4vw,1rem)] bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.70)_100%)] rounded-br-lg rounded-bl-lg">
            {/* Play Button */}
            <div className="w-[1.125rem] h-[1.125rem] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_play_mobile)">
                  <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 6L12 9L7.5 12V6Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_play_mobile">
                    <rect width="18" height="18" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Scroll/Progress Section */}
            <div className="flex items-center gap-[0.375rem] flex-1">
              <div className="shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="2" viewBox="0 0 29 2" fill="none" className="w-[1.8125rem] h-[2px]">
                  <rect width="29" height="2" rx="1" fill="white" fillOpacity="0.4"/>
                  <rect width="18" height="2" rx="1" fill="#FAFAFA"/>
                </svg>
              </div>
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="h-[2px] flex-1 min-w-[1.25rem] rounded-[17px] bg-white/40" />
              ))}
            </div>

            {/* Volume Control */}
            <div className="w-[1.125rem] h-[1.125rem] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 18 18" fill="none">
                <path d="M8.25 3.52799C8.24985 3.42352 8.21876 3.32144 8.16065 3.23463C8.10254 3.14782 8.02001 3.08016 7.92349 3.04021C7.82697 3.00025 7.72077 2.98978 7.61831 3.01012C7.51584 3.03046 7.42169 3.08069 7.34775 3.15449L4.80975 5.69174C4.7118 5.79027 4.59528 5.86838 4.46692 5.92155C4.33856 5.97472 4.20093 6.00189 4.062 6.00149H2.25C2.05109 6.00149 1.86032 6.0805 1.71967 6.22116C1.57902 6.36181 1.5 6.55257 1.5 6.75149V11.2515C1.5 11.4504 1.57902 11.6412 1.71967 11.7818C1.86032 11.9225 2.05109 12.0015 2.25 12.0015H4.062C4.20093 12.0011 4.33856 12.0282 4.46692 12.0814C4.59528 12.1346 4.7118 12.2127 4.80975 12.3112L7.347 14.8492C7.42095 14.9233 7.51523 14.9738 7.61789 14.9943C7.72056 15.0147 7.82699 15.0043 7.92369 14.9642C8.0204 14.9241 8.10303 14.8562 8.16112 14.7691C8.21921 14.682 8.25015 14.5797 8.25 14.475V3.52799Z" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6.75C12.4868 7.39911 12.75 8.18861 12.75 9C12.75 9.81139 12.4868 10.6009 12 11.25" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.5234 13.7726C15.1502 13.1458 15.6475 12.4016 15.9867 11.5827C16.3259 10.7637 16.5005 9.88599 16.5005 8.99956C16.5005 8.11313 16.3259 10.7637 15.9867 11.5827C16.3259 10.7637 16.5005 9.88599 16.5005 8.99956C16.5005 8.11313 16.3259 7.23538 15.9867 6.41643C15.6475 5.59748 15.1502 4.85336 14.5234 4.22656" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Row - Two Images */}
        <div className="flex items-center w-full gap-[0.625rem]">
          {/* Left Image */}
          <div 
            className="flex-1 relative rounded-[4px] overflow-hidden cursor-pointer aspect-[174/107]"
            onClick={() => openModal(1)}
          >
            <Image
              src={images[1]}
              alt="Property image 2"
              fill
              className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)]" />
          </div>

          {/* Right Image with Show All Button */}
          <div 
            className="flex-1 relative rounded-[4px] overflow-hidden cursor-pointer aspect-[174/107]"
            onClick={() => openModal(2)}
          >
            <Image
              src={images[2]}
              alt="Property image 3"
              fill
              className="object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)]" />
            
            {/* Show All Photo Button */}
            <div className="absolute inset-0 flex flex-col items-end justify-end p-[0.375rem]" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => openModal(0)}
                className="flex items-center bg-[#FAFAFA] rounded-[6px] px-[0.5rem] py-[0.375rem] gap-[0.375rem] shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Image 
                  src="/showallphoto.svg" 
                  alt="Gallery" 
                  width={14} 
                  height={14} 
                  className="w-[0.875rem] h-[0.875rem]" 
                />
                <span className="text-[#262626] font-semibold text-[0.625rem] whitespace-nowrap">Show all photos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}