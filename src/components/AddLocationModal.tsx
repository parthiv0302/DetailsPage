"use client";

import { useState } from "react";
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
    // In a real app, this would get the user's GPS coordinates
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
    // In a real app, this would save the location
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl px-8 py-7 w-[90vw] max-w-[500px] flex flex-col gap-6 animate-slide-in-center">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-800 font-archivo">
            Add Location
          </h2>
          <button
            onClick={handleClose}
            className="w-[30px] h-[30px] rounded-lg bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        {/* Search Input Container */}
        <div className="relative">
          <div className="flex items-center gap-3 px-4 py-4 border border-gray-300 rounded-lg bg-white">
            <Search className="w-[18px] h-[18px] text-gray-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder=""
              className="flex-1 font-manrope font-medium text-base text-gray-800 outline-none bg-transparent"
            />
            {searchQuery && (
              <button onClick={handleClearSearch} className="cursor-pointer">
                <X className="w-[18px] h-[18px] text-gray-600" />
              </button>
            )}
          </div>

          {/* Step 1: Show "Use my current location" */}
          {step === 1 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-10">
            <p className="text-xs font-medium text-gray-600 mb-2 font-archivo">
              Suggestive Searches
            </p>
            <button
              onClick={handleUseCurrentLocation}
              className="flex items-center gap-3 p-2 w-full hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Locate className="w-6 h-6 text-gray-600" />
              </div>
              <span className="font-semibold text-base text-gray-700 font-manrope">
                Use my current location
              </span>
            </button>
          </div>
          )}

          {/* Step 2: Show location suggestions */}
          {step === 2 && searchQuery && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-10 max-h-[300px] overflow-y-auto">
            <p className="text-xs font-medium text-gray-600 mb-2 font-archivo">
              Suggestive Searches
            </p>
            <div className="flex flex-col gap-1">
              <button
                onClick={handleUseCurrentLocation}
                className="flex items-center gap-3 p-2 w-full hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Locate className="w-6 h-6 text-gray-600" />
                </div>
                <span className="font-semibold text-base text-gray-700 font-manrope">
                  Use my current location
                </span>
              </button>
              {locationSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLocationSelect(suggestion.name)}
                  className="flex items-center gap-3 p-2 w-full hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    {suggestion.icon}
                  </div>
                  <span className="font-semibold text-base text-gray-700 font-manrope">
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
            <p className="text-lg font-medium text-gray-800 font-archivo">
              Save as<span className="text-rose-700">*</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-3 rounded-lg border-[1.5px] font-semibold text-base transition-all cursor-pointer font-manrope ${
                    selectedCategory === category
                      ? "bg-gray-100 border-gray-800 text-gray-800"
                      : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
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
            <p className="text-lg font-medium text-gray-800 font-archivo">
              Save as<span className="text-rose-700">*</span>
            </p>
            <div className="flex gap-2 flex-wrap mb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-4 py-3 rounded-lg border-[1.5px] font-semibold text-base transition-all cursor-pointer font-manrope ${
                    selectedCategory === category
                      ? "bg-gray-100 border-gray-800 text-gray-800"
                      : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Custom Name Input */}
            <div className="flex flex-col gap-1">
              <div className="border border-gray-400 rounded-lg px-4 py-3 h-[52px] flex items-center">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value.slice(0, 40))}
                  placeholder="Give it a name"
                  className="w-full font-archivo text-base text-gray-500 outline-none bg-transparent placeholder:text-gray-500"
                />
                <span className="text-rose-700 text-xs">*</span>
              </div>
              <div className="flex justify-between px-3 text-xs font-medium text-gray-600 font-manrope">
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
            className={`w-full px-4 py-3 rounded-lg font-semibold text-base transition-all cursor-pointer font-manrope ${
              step === 4 && !customName.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
