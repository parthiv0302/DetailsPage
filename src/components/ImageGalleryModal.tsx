"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_IMAGES = [
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
  showLikeButton?: boolean;
}

// Constants
const MIN_SWIPE_DISTANCE = 50;
const MAX_SCALE = 4;
const DOUBLE_TAP_DELAY = 300;
const ANIMATION_DURATION = 300;

export default function ImageGalleryModal({ 
  isOpen, 
  onClose, 
  initialIndex = 0, 
  galleryImages,
  showLikeButton = true
}: ImageGalleryModalProps) {
  const currentImages = galleryImages || DEFAULT_IMAGES;
  
  // Navigation state
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [enterDirection, setEnterDirection] = useState<'from-left' | 'from-right' | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  
  // Swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  
  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Pinch zoom state
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState(1);
  
  // Refs
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<number>(0);

  // Calculate position limits to keep image within bounds
  const getPositionLimits = useCallback(() => {
    if (!imageContainerRef.current) return { xLimit: 0, yLimit: 0 };
    const { offsetWidth, offsetHeight } = imageContainerRef.current;
    return {
      xLimit: (offsetWidth * (scale - 1)) / 2,
      yLimit: (offsetHeight * (scale - 1)) / 2,
    };
  }, [scale]);

  // Clamp position within limits
  const clampPosition = useCallback((x: number, y: number) => {
    const { xLimit, yLimit } = getPositionLimits();
    return {
      x: Math.max(-xLimit, Math.min(xLimit, x)),
      y: Math.max(-yLimit, Math.min(yLimit, y)),
    };
  }, [getPositionLimits]);

  // Reset zoom to default
  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Reset all state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      resetZoom();
      setSwipeOffset(0);
      setIsAnimating(false);
      setSlideDirection(null);
      setEnterDirection(null);
      setIsDragging(false);
    }
  }, [isOpen, initialIndex, resetZoom]);

  // Prevent page zoom while modal is open
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";
    
    const preventGesture = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    const preventMultiTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) preventGesture(e);
    };

    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= DOUBLE_TAP_DELAY) e.preventDefault();
      lastTouchEnd = now;
    };

    const preventWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    
    // Store original viewport and set restrictive one
    const viewport = document.querySelector('meta[name="viewport"]');
    const originalContent = viewport?.getAttribute('content') || '';
    viewport?.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    document.addEventListener('touchstart', preventMultiTouch, { passive: false });
    document.addEventListener('touchmove', preventMultiTouch, { passive: false });
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);
    document.addEventListener('wheel', preventWheelZoom, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', preventMultiTouch);
      document.removeEventListener('touchmove', preventMultiTouch);
      document.removeEventListener('touchend', preventDoubleTapZoom);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
      document.removeEventListener('wheel', preventWheelZoom);
      document.body.style.overflow = "unset";
      viewport?.setAttribute('content', originalContent);
    };
  }, [isOpen]);

  // Reset zoom when changing images
  useEffect(() => {
    resetZoom();
  }, [currentIndex, resetZoom]);

  // Navigation with animation
  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (scale > 1 || isAnimating) return;
    
    const isNext = direction === 'next';
    setSlideDirection(isNext ? 'left' : 'right');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (isNext) return prev === currentImages.length - 1 ? 0 : prev + 1;
        return prev === 0 ? currentImages.length - 1 : prev - 1;
      });
      setSlideDirection(null);
      setEnterDirection(isNext ? 'from-right' : 'from-left');
      
      setTimeout(() => {
        setEnterDirection(null);
        setIsAnimating(false);
      }, ANIMATION_DURATION);
    }, ANIMATION_DURATION);
  }, [currentImages.length, scale, isAnimating]);

  const goToPrevious = useCallback(() => navigate('prev'), [navigate]);
  const goToNext = useCallback(() => navigate('next'), [navigate]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    else if (e.key === "ArrowRight") goToNext();
    else if (e.key === "Escape") onClose();
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    // Pinch zoom start
    if (e.touches.length === 2) {
      e.stopPropagation();
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialPinchDistance(distance);
      setInitialScale(scale);
      return;
    }
    
    // Pan start when zoomed
    if (scale > 1) {
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
      return;
    }
    
    // Swipe start
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Pinch zoom
    if (e.touches.length === 2 && initialPinchDistance) {
      e.stopPropagation();
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = Math.min(Math.max(initialScale * (distance / initialPinchDistance), 1), MAX_SCALE);
      setScale(newScale);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return;
    }
    
    // Pan when zoomed
    if (isDragging && scale > 1) {
      e.stopPropagation();
      const rawX = e.touches[0].clientX - dragStart.x;
      const rawY = e.touches[0].clientY - dragStart.y;
      setPosition(clampPosition(rawX, rawY));
      return;
    }
    
    // Swipe tracking
    if (!touchStart || scale > 1 || isAnimating) return;
    const currentTouch = e.touches[0].clientX;
    setTouchEnd(currentTouch);
    setSwipeOffset(currentTouch - touchStart);
  };

  const onTouchEnd = () => {
    setInitialPinchDistance(null);
    setIsDragging(false);
    
    if (!touchStart || !touchEnd || scale > 1 || isAnimating) {
      setSwipeOffset(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    
    if (isLeftSwipe || isRightSwipe) {
      setIsAnimating(true);
      setSwipeOffset(isLeftSwipe ? -window.innerWidth : window.innerWidth);
      
      setTimeout(() => {
        setCurrentIndex((prev) => {
          if (isLeftSwipe) return prev === currentImages.length - 1 ? 0 : prev + 1;
          return prev === 0 ? currentImages.length - 1 : prev - 1;
        });
        setSwipeOffset(isLeftSwipe ? window.innerWidth : -window.innerWidth);
        requestAnimationFrame(() => setSwipeOffset(0));
        setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
      }, ANIMATION_DURATION);
    } else {
      setSwipeOffset(0);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Double tap to zoom (touch)
  const handleDoubleTap = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return;
    
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      e.preventDefault();
      if (scale > 1) resetZoom();
      else setScale(2);
    }
    lastTapRef.current = now;
  };

  // Mouse handlers for desktop
  const onMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      e.preventDefault();
      e.stopPropagation();
      setPosition(clampPosition(e.clientX - dragStart.x, e.clientY - dragStart.y));
    }
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setScale((prev) => {
      const newScale = Math.min(Math.max(prev + delta, 1), MAX_SCALE);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      else setPosition((p) => clampPosition(p.x, p.y));
      return newScale;
    });
  };

  // Double click to zoom (desktop)
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (scale > 1) resetZoom();
    else setScale(2);
  };

  if (!isOpen) return null;

  // Calculate image transform
  const getImageTransform = () => {
    // Don't apply transform during enter animation, unless user is actively swiping
    if (enterDirection && swipeOffset === 0) return undefined;
    
    if (scale > 1) {
      return `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`;
    }
    if (slideDirection === 'left') return 'translateX(-100%)';
    if (slideDirection === 'right') return 'translateX(100%)';
    return `translateX(${swipeOffset}px)`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#333] flex flex-col touch-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 py-[18px]">
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="p-0 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-gray-50" />
          </button>
          <p className="font-archivo font-[500] text-lg text-gray-50 leading-[1.5]">
            Sattva Vasanta Skye
          </p>
        </div>
        {showLikeButton && (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="bg-gray-200 border-0 p-2 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors w-[37px] h-[37px] cursor-pointer"
            >
              <Heart className={`w-6 h-6 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-800'}`} />
            </button>
          </div>
        )}
      </div>

      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-12 py-2.5 w-full overflow-hidden gap-4">
        {/* Previous Button - Desktop */}
        <button
          onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
          className="hidden md:flex bg-gray-200 border-0 p-3 rounded-lg items-center justify-center hover:bg-gray-300 transition-colors w-12 h-12 shrink-0 z-10 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        {/* Image Container */}
        <div 
          ref={imageContainerRef}
          className={`flex-1 relative h-full w-full flex items-center justify-center overflow-hidden select-none ${
            scale > 1 ? 'cursor-grab' : ''
          } ${isDragging ? '!cursor-grabbing' : ''}`}
          style={{ touchAction: scale > 1 ? 'none' : 'pan-y' }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchStartCapture={handleDoubleTap}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onDoubleClick={handleDoubleClick}
          onWheel={handleWheel}
        >
          <motion.div 
            key={currentIndex}
            initial={{ 
              x: enterDirection === 'from-left' ? '-100%' : enterDirection === 'from-right' ? '100%' : 0 
            }}
            animate={{ 
              x: swipeOffset !== 0 ? swipeOffset : 0,
              scale: scale > 1 ? scale : 1,
              translateX: scale > 1 ? `${position.x / scale}px` : undefined,
              translateY: scale > 1 ? `${position.y / scale}px` : undefined,
            }}
            transition={{ 
              type: swipeOffset !== 0 ? 'spring' : 'tween',
              duration: swipeOffset !== 0 ? 0 : 0.3, 
              ease: 'easeOut',
              damping: swipeOffset !== 0 ? 50 : undefined,
              stiffness: swipeOffset !== 0 ? 300 : undefined,
            }}
            className="relative w-full h-full max-h-[60vh] md:max-h-[75vh]"
            style={{
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
          >
            <Image
              src={currentImages[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-contain rounded-xl select-none pointer-events-none"
              priority
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Next Button - Desktop */}
        <button
          onClick={(e) => { e.stopPropagation(); goToNext(); }}
          className="hidden md:flex bg-gray-200 border-0 p-3 rounded-lg items-center justify-center hover:bg-gray-300 transition-colors w-12 h-12 shrink-0 z-10 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex flex-col gap-6 pb-6">
        <div 
          className="flex gap-3.5 items-center justify-center overflow-x-auto px-4 md:px-8 scrollbar-hide w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {currentImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 rounded-xl overflow-hidden cursor-pointer ${
                idx === currentIndex ? "border-2 border-gray-50" : ""
              } ${idx < 8 ? "w-[86px] h-20" : "w-[129px] h-[120px]"}`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 rounded-xl ${
                idx === currentIndex ? "bg-black/10" : "bg-black/50"
              }`} />
            </button>
          ))}
        </div>

        <p 
          className="font-manrope font-[600] text-base text-white text-center leading-[1.5]"
          onClick={(e) => e.stopPropagation()}
        >
          {currentIndex + 1}/{currentImages.length}
        </p>
      </div>
    </div>
  );
}

