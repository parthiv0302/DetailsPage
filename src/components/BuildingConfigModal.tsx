"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface BuildingConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const towers = [
  {
    name: "Tower 1",
    totalFloors: "3B+G+12UF",
    units: "500",
    configuration: "1BHK, 2BHK, 3BHK & 4BHKs",
  },
  {
    name: "Tower 2",
    totalFloors: "3B+G+12UF",
    units: "500",
    configuration: "1BHK, 2BHK, 3BHK & 4BHKs",
  },
  {
    name: "Tower 3",
    totalFloors: "3B+G+12UF",
    units: "500",
    configuration: "1BHK, 2BHK, 3BHK & 4BHKs",
  },
];

export default function BuildingConfigModal({ isOpen, onClose }: BuildingConfigModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50" 
            onClick={onClose} 
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="absolute right-0 top-0 bottom-0 w-[483px] max-w-full bg-[#FAFAFA] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex flex-col border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between px-[24px] py-[20px]">
                <h2 className="font-archivo font-[500] text-[#262626] text-[20px] leading-[1.5]">
                  Building Configuratation
                </h2>
                <button
                  onClick={onClose}
                  className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-[#E5E5E5] hover:bg-[#D4D4D4] transition-colors cursor-pointer"
                >
                  <X className="w-[24px] h-[24px] text-[#262626]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-[24px] py-[24px] flex flex-col gap-[24px]">
              {towers.map((tower, idx) => (
                <div key={idx}>
                  <div className="flex flex-col gap-[12px]">
                    <h3 className="font-archivo font-[600] text-[#262626] text-[18px] leading-[1.5]">
                      {tower.name}
                    </h3>
                    <div className="flex gap-[12px]">
                      {/* Total Floors */}
                      <div className="flex-1 flex flex-col gap-[6px]">
                        <p className="font-archivo font-[400] text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                          Total Floors
                        </p>
                        <p className="font-manrope font-[600] text-[#262626] text-[16px] leading-[1.5]">
                          {tower.totalFloors}
                        </p>
                      </div>
                      {/* Units */}
                      <div className="flex-1 flex flex-col gap-[6px]">
                        <p className="font-archivo font-[400] text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                          Units
                        </p>
                        <p className="font-manrope font-[600] text-[#262626] text-[16px] leading-[1.5]">
                          {tower.units}
                        </p>
                      </div>
                      {/* Configuration */}
                      <div className="flex-1 flex flex-col gap-[6px]">
                        <p className="font-archivo font-[400] text-[#404040] text-[14px] leading-[1.5] tracking-[0.25px]">
                          Configuration
                        </p>
                        <p className="font-manrope font-[600] text-[#262626] text-[16px] leading-[1.5]">
                          {tower.configuration}
                        </p>
                      </div>
                    </div>
                  </div>
                  {idx < towers.length - 1 && <div className="h-[1px] bg-[#E5E5E5] mt-[24px]" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

