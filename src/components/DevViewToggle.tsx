"use client";

import React from "react";

type ViewType = "pre-launch" | "builder-unit" | "apartment";

interface DevViewToggleProps {
  viewType: ViewType;
  setViewType: (view: ViewType) => void;
}

export default function DevViewToggle({ viewType, setViewType }: DevViewToggleProps) {
  const cycleView = () => {
    if (viewType === "pre-launch") setViewType("builder-unit");
    else if (viewType === "builder-unit") setViewType("apartment");
    else setViewType("pre-launch");
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border-2 border-purple-700 rounded-lg shadow-lg p-4">
      <button 
        onClick={cycleView}
        className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-purple-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm">
          {viewType === "pre-launch" ? "Pre-Launch" : viewType === "builder-unit" ? "Builder Unit" : "Apartment"}
        </span>
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          viewType === "pre-launch" ? "bg-blue-100 text-blue-700" : 
          viewType === "builder-unit" ? "bg-purple-100 text-purple-700" : 
          "bg-green-100 text-green-700"
        }`}>
          {viewType === "pre-launch" ? "1/3" : viewType === "builder-unit" ? "2/3" : "3/3"}
        </div>
      </button>
    </div>
  );
}
