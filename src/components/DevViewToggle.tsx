"use client";

import React from "react";

type ViewType = "pre-launch" | "builder-unit" | "apartment" | "unit-plan";

interface DevViewToggleProps {
  viewType: ViewType;
  setViewType: (view: ViewType) => void;
}

export default function DevViewToggle({ viewType, setViewType }: DevViewToggleProps) {
  const cycleView = () => {
    if (viewType === "pre-launch") setViewType("builder-unit");
    else if (viewType === "builder-unit") setViewType("apartment");
    else if (viewType === "apartment") setViewType("unit-plan");
    else setViewType("pre-launch");
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border-2 border-purple-700 rounded-lg shadow-lg p-4">
      <button 
        onClick={cycleView}
        className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-purple-50 transition-colors z-50"
      >
        <span className="font-[600] text-gray-800 text-sm">
          {viewType === "pre-launch" ? "Pre-Launch" : viewType === "builder-unit" ? "Builder Unit" : viewType === "apartment" ? "Apartment" : "Unit Plan"}
        </span>
        <div className={`px-2 py-1 rounded text-xs font-[500] ${
          viewType === "pre-launch" ? "bg-blue-100 text-blue-700" : 
          viewType === "builder-unit" ? "bg-purple-100 text-purple-700" : 
          viewType === "apartment" ? "bg-green-100 text-green-700" :
          "bg-orange-100 text-orange-700"
        }`}>
          {viewType === "pre-launch" ? "1/4" : viewType === "builder-unit" ? "2/4" : viewType === "apartment" ? "3/4" : "4/4"}
        </div>
      </button>
    </div>
  );
}

