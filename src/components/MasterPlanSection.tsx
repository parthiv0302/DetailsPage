"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, Move } from "lucide-react";
import BuildingConfigModal from "./BuildingConfigModal";

export default function MasterPlanSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showBuildingConfig, setShowBuildingConfig] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 }); // Reset position on full zoom out
      }
      return newScale;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1 && containerRef.current) {
      e.preventDefault();
      const { offsetWidth, offsetHeight } = containerRef.current;
      
      const xLimit = (offsetWidth * (scale - 1)) / 2;
      const yLimit = (offsetHeight * (scale - 1)) / 2;
      
      const rawX = e.clientX - dragStart.x;
      const rawY = e.clientY - dragStart.y;
      
      setPosition({
        x: Math.max(-xLimit, Math.min(xLimit, rawX)),
        y: Math.max(-yLimit, Math.min(yLimit, rawY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Clamp position when scale changes
  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    } else if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      const xLimit = (offsetWidth * (scale - 1)) / 2;
      const yLimit = (offsetHeight * (scale - 1)) / 2;
      
      setPosition((prev) => ({
        x: Math.max(-xLimit, Math.min(xLimit, prev.x)),
        y: Math.max(-yLimit, Math.min(yLimit, prev.y)),
      }));
    }
  }, [scale]);

  // Add wheel support for zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          setScale((prev) => Math.min(prev + 0.1, 4));
        } else {
          setScale((prev) => Math.max(prev - 0.1, 1));
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className={className} {...props}>
      <div className="flex flex-col w-full gap-[28px]">
        <div className="flex items-center justify-between">
          <h2 className="font-archivo font-semibold text-[#262626] text-[24px] leading-[1.5]">
            Master Plan
          </h2>
          <button 
            onClick={() => setShowBuildingConfig(true)}
            className="hidden md:flex items-center justify-center bg-[#262626] text-white rounded-[8px] font-manrope font-semibold text-[14px] leading-[1.5] hover:bg-[#404040] transition-colors cursor-pointer px-[16px] py-[10px]"
          >
            See Building Config.
          </button>
        </div>

        <div 
          ref={containerRef}
          className="w-full aspect-[358/271] md:aspect-[889/446] bg-[#FAFAFA] border border-[#E5E5E5] relative overflow-hidden rounded-[12px] group cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="w-full h-full relative transition-transform duration-100 ease-out"
            style={{ 
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center center"
            }}
          >
            <Image
              src="/assets/master_plan.png"
              alt="Master Plan"
              fill
              className="object-cover pointer-events-none select-none"
              draggable={false}
            />
          </div>

          {/* Previous Zoom Button Restored */}
          <button
            onClick={() => {
              setScale((prev) => {
                const newScale = prev >= 5 ? 1 : prev + 1;
                if (newScale === 1) setPosition({ x: 0, y: 0 });
                return newScale;
              });
            }}
            className="absolute flex items-center bg-[#f5f5f5] border border-[#e5e5e5] rounded-[8px] p-[6px_8px] gap-[6px] top-[16px] right-[16px] cursor-pointer hover:bg-gray-200 transition-colors z-10"
          >
            <span className="font-manrope font-semibold text-[#525252] text-[12px] leading-[1.5]">
              {Math.round(scale * 20)}%
            </span>
            <span className="font-manrope font-semibold text-[#525252] text-[12px] leading-[1.5]">
              Zoom
            </span>
          </button>
        </div>

        <button 
          onClick={() => setShowBuildingConfig(true)}
          className="md:hidden bg-[#262626] text-[#fafafa] font-manrope font-semibold leading-[1.5] hover:bg-[#404040] transition-colors cursor-pointer flex items-center justify-center w-full p-[12px] rounded-[8px]"
        >
          See Building Config.
        </button>
      </div>
      
      <BuildingConfigModal 
        isOpen={showBuildingConfig}
        onClose={() => setShowBuildingConfig(false)}
      />
    </div>
  );
}