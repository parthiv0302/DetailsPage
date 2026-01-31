"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import BuildingConfigModal from "./BuildingConfigModal";

const MAX_SCALE = 4;

export default function MasterPlanSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showBuildingConfig, setShowBuildingConfig] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const getPositionLimits = useCallback(() => {
    if (!containerRef.current) return { xLimit: 0, yLimit: 0 };
    const { offsetWidth, offsetHeight } = containerRef.current;
    return {
      xLimit: (offsetWidth * (scale - 1)) / 2,
      yLimit: (offsetHeight * (scale - 1)) / 2,
    };
  }, [scale]);

  const clampPosition = useCallback((x: number, y: number) => {
    const { xLimit, yLimit } = getPositionLimits();
    return {
      x: Math.max(-xLimit, Math.min(xLimit, x)),
      y: Math.max(-yLimit, Math.min(yLimit, y)),
    };
  }, [getPositionLimits]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      e.preventDefault();
      setPosition(clampPosition(e.clientX - dragStart.x, e.clientY - dragStart.y));
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale > 1 && e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      setPosition(clampPosition(touch.clientX - dragStart.x, touch.clientY - dragStart.y));
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (scale === 1) setPosition({ x: 0, y: 0 });
    else setPosition((prev) => clampPosition(prev.x, prev.y));
  }, [scale, clampPosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setScale((prev) => e.deltaY < 0 
          ? Math.min(prev + 0.1, MAX_SCALE) 
          : Math.max(prev - 0.1, 1)
        );
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const toggleZoom = () => {
    setScale((prev) => {
      const newScale = prev >= MAX_SCALE ? 1 : prev + 1;
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  return (
    <div className={className} {...props}>
      <div className="flex flex-col w-full gap-5 md:gap-7">
        <div className="flex items-center justify-between gap-8">
          <h2 className="font-archivo font-[600] text-[#262626] text-xl md:text-2xl leading-[1.5]">
            Master Plan
          </h2>
          <button 
            onClick={() => setShowBuildingConfig(true)}
            className="hidden md:flex items-center justify-center bg-[#262626] text-white rounded-lg font-manrope font-[600] text-sm leading-[1.5] hover:bg-[#404040] transition-colors cursor-pointer px-3 py-2 gap-1.5"
          >
            See Building Config.
          </button>
        </div>

        <div 
          ref={containerRef}
          className={`w-full bg-[#FAFAFA] relative overflow-hidden rounded-xl select-none
            aspect-[4/3] md:aspect-[2/1]
            ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: scale > 1 ? 'none' : 'auto' }}
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

          <button
            onClick={toggleZoom}
            className="absolute top-4 right-4 flex items-center bg-[#F5F5F5] border border-[#E5E5E5] rounded-md p-[6px_8px] gap-1.5 cursor-pointer hover:bg-[#E5E5E5] transition-colors z-10"
          >
            <span className="font-manrope font-[600] text-[#525252] text-xs lg:text-base leading-[1.5]">
              {Math.round(scale * 20)}%
            </span>
            <span className="font-manrope font-[600] text-[#525252] text-xs lg:text-base leading-[1.5]">
              Zoom
            </span>
          </button>
        </div>

        <button 
          onClick={() => setShowBuildingConfig(true)}
          className="md:hidden bg-[#262626] text-[#FAFAFA] font-manrope font-[600] text-sm leading-[1.5] hover:bg-[#404040] transition-colors cursor-pointer flex items-center justify-center w-52 py-2 px-3 rounded-lg gap-1.5"
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
