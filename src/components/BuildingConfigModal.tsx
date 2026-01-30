"use client";

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
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-[28vw] min-w-[320px] max-w-[450px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Building Configuratation</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
          {towers.map((tower, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h3 className="text-base font-semibold text-gray-900">{tower.name}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-500">Total Floors</p>
                  <p className="text-sm font-medium text-gray-900">{tower.totalFloors}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-500">Units</p>
                  <p className="text-sm font-medium text-gray-900">{tower.units}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-500">Configuration</p>
                  <p className="text-sm font-medium text-gray-900">{tower.configuration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
