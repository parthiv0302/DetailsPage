"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, MapPin, Locate } from "lucide-react";

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LocationCategory = "Work" | "School" | "Friend Family" | "Other";

export default function AddLocationModal({ isOpen, onClose }: AddLocationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | null>(null);
  const [customName, setCustomName] = useState("");

  const locationSuggestions = [
    { name: "Koramangala", icon: <MapPin className="w-5 h-5" /> },
    { name: "IDC, Koramangala", icon: <MapPin className="w-5 h-5" /> },
    { name: "Koramangala 1st Block", icon: <MapPin className="w-5 h-5" /> },
    { name: "Koramangala 5th Block", icon: <MapPin className="w-5 h-5" /> },
  ];

  const categories: LocationCategory[] = ["Work", "School", "Friend Family", "Other"];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 0 && step === 1) {
      setStep(2);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setStep(1);
    setSelectedLocation("");
  };

  const handleUseCurrentLocation = () => {
    setSearchQuery("Current Location");
    setSelectedLocation("Current Location");
    setStep(3);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSearchQuery(location);
    setStep(3);
  };

  const handleCategorySelect = (category: LocationCategory) => {
    setSelectedCategory(category);
    if (category === "Other") {
      setStep(4);
    }
  };

  const handleSave = () => {
    console.log("Saving location:", {
      location: selectedLocation,
      category: selectedCategory,
      customName: selectedCategory === "Other" ? customName : selectedCategory,
    });
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setStep(1);
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedCategory(null);
    setCustomName("");
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80"
            onClick={handleClose}
          />

          {/* Modal - 470px width, padding 28px 32px, gap 24px, radius 16px */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
            className="relative bg-white rounded-2xl px-8 py-7 w-[90vw] max-w-[470px] flex flex-col gap-6"
          >
        {/* Header - gap between title and button spans full width */}
        <div className="flex items-center justify-between">
          {/* Title: 24px 500 Archivo */}
          <h2 className="text-2xl font-[500] text-[#262626] font-archivo leading-[1.5]">
            Add Location
          </h2>
          {/* Close button: 30x30, radius 8px */}
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-[#e5e5e5] flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <X className="w-[18px] h-[18px] text-[#262626]" />
          </button>
        </div>

        {/* Search Input Container - 406x56, padding 16px, gap 12px, radius 8px, stroke 1px */}
        <div className="relative">
          <div className="flex items-center gap-3 p-4 border border-[#a3a3a3] rounded-lg bg-white">
            <Search className="w-6 h-6 text-[#525252] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a location"
              className="flex-1 font-manrope font-[500] text-base text-[#262626] outline-none bg-transparent placeholder:text-[#a3a3a3]"
            />
            {searchQuery && (
              <button onClick={handleClearSearch} className="cursor-pointer shrink-0">
                <X className="w-[18px] h-[18px] text-[#525252]" />
              </button>
            )}
          </div>

          {/* Step 1: Show "Use my current location" */}
          {step === 1 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#d4d4d4] rounded-xl shadow-lg p-4 z-10">
              <button
                onClick={handleUseCurrentLocation}
                className="flex items-center gap-3 p-2 w-full hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#e5e5e5] rounded-lg flex items-center justify-center shrink-0">
                  <Locate className="w-6 h-6 text-[#525252]" />
                </div>
                <span className="font-[600] text-base text-[#525252] font-manrope">
                  Use my current location
                </span>
              </button>
            </div>
          )}

          {/* Step 2: Show location suggestions */}
          {step === 2 && searchQuery && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-[#d4d4d4] rounded-xl shadow-lg p-4 z-10 max-h-[300px] overflow-y-auto">
              <div className="flex flex-col gap-1">
                <button
                  onClick={handleUseCurrentLocation}
                  className="flex items-center gap-3 p-2 w-full hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#e5e5e5] rounded-lg flex items-center justify-center shrink-0">
                    <Locate className="w-6 h-6 text-[#525252]" />
                  </div>
                  <span className="font-[600] text-base text-[#525252] font-manrope">
                    Use my current location
                  </span>
                </button>
                {locationSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLocationSelect(suggestion.name)}
                    className="flex items-center gap-3 p-2 w-full hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-[#e5e5e5] rounded-lg flex items-center justify-center shrink-0">
                      {suggestion.icon}
                    </div>
                    <span className="font-[600] text-base text-[#525252] font-manrope">
                      {suggestion.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Show "Save as" category selection */}
        {step === 3 && (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-[500] text-[#262626] font-archivo">
              Save as<span className="text-rose-700">*</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-3 rounded-lg border-[1.5px] font-[600] text-sm transition-all cursor-pointer font-manrope ${
                    selectedCategory === category
                      ? "bg-[#f5f5f5] border-[#262626] text-[#262626]"
                      : "bg-white border-[#d4d4d4] text-[#525252] hover:border-gray-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Show custom name input when "Other" is selected */}
        {step === 4 && selectedCategory === "Other" && (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-[500] text-[#262626] font-archivo">
              Save as<span className="text-rose-700">*</span>
            </p>
            <div className="flex gap-2 flex-wrap mb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-3 rounded-lg border-[1.5px] font-[600] text-sm transition-all cursor-pointer font-manrope ${
                    selectedCategory === category
                      ? "bg-[#f5f5f5] border-[#262626] text-[#262626]"
                      : "bg-white border-[#d4d4d4] text-[#525252] hover:border-gray-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Custom Name Input */}
            <div className="flex flex-col gap-1">
              <div className="border border-[#a3a3a3] rounded-lg px-4 py-3 h-13 flex items-center">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value.slice(0, 40))}
                  placeholder="Give it a name"
                  className="w-full font-archivo text-base text-[#262626] outline-none bg-transparent placeholder:text-[#a3a3a3]"
                />
                <span className="text-rose-700 text-xs">*</span>
              </div>
              <div className="flex justify-between px-3 text-xs font-[500] text-[#525252] font-manrope">
                <span>40 Characters</span>
                <span>{customName.length}/40</span>
              </div>
            </div>
          </div>
        )}

        {/* Save Button - Only show in step 3 or step 4 */}
        {(step === 3 || step === 4) && (
          <button
            onClick={handleSave}
            disabled={step === 4 && !customName.trim()}
            className={`w-full px-4 py-3 rounded-lg font-[600] text-sm transition-all cursor-pointer font-manrope ${
              step === 4 && !customName.trim()
                ? "bg-[#d4d4d4] text-[#a3a3a3] cursor-not-allowed"
                : "bg-[#262626] text-white hover:bg-[#404040]"
            }`}
          >
            Save
          </button>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

