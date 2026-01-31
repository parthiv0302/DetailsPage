"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, CircleParking } from "lucide-react";

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const amenities = [
  { iconPath: "/assets/clubhouse.svg", label: "Club House" },
  { iconPath: "/assets/swimmingpool.svg", label: "Swimming Pool" },
  { iconPath: "/assets/securityguard.svg", label: "Security Guard" },
  { iconPath: "/assets/reserveparking.svg", label: "Reserved Parking" },
  { iconPath: "/assets/gymnasium.svg", label: "Gymnasium" },
  { iconPath: "/assets/park.svg", label: "Park" },
  { iconPath: "/assets/powerbackup.svg", label: "Power Backup" },
  { iconPath: "/assets/foodcourt.svg", label: "Food Court" },
  { iconPath: "/assets/firealarm.svg", label: "Fire Alarm System" },
  { iconPath: "/assets/party.svg", label: "Party Lawn" },
  { Icon: CircleParking, label: "Visitor Parking" },
  { iconPath: "/assets/lift.svg", label: "Lift" },
  { iconPath: "/assets/badminton.svg", label: "Badminton Court" },
  { iconPath: "/assets/yoga.svg", label: "Yoga Room" },
  { iconPath: "/assets/tennis.svg", label: "Tennis Court" },
];

export default function AmenitiesModal({ isOpen, onClose }: AmenitiesModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50" 
            onClick={onClose} 
          />
          
          {/* Sidebar */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="absolute right-0 top-0 bottom-0 w-[28vw] min-w-[20rem] max-w-md bg-white shadow-2xl flex flex-col"
          >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-[600] text-gray-900">Amenities</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {amenity.iconPath ? (
                  <Image 
                    src={amenity.iconPath} 
                    alt="" 
                    width={20} 
                    height={20} 
                    className="w-5 h-5 shrink-0" 
                  />
                ) : (
                  amenity.Icon && <amenity.Icon className="w-5 h-5 text-gray-800" />
                )}
                <span className="text-sm text-gray-900">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

