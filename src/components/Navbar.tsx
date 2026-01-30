"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Share2, Heart } from "lucide-react";

const navItems = [
  { label: "Overview", sectionId: "overview" },
  { label: "Unit Plans", sectionId: "unit-plans" },
  { label: "Master Plan", sectionId: "master-plan" },
  { label: "Locality", sectionId: "locality" },
  { label: "Amenities", sectionId: "amenities" },
  { label: "Similar Property", sectionId: "similar-property" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled to bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setActiveSection("similar-property");
        return;
      }

      const sections = navItems.map((item) => ({
        id: item.sectionId,
        element: document.getElementById(item.sectionId),
      }));

      // Dynamic offset: 56px for desktop, 120px for mobile/tablet + slight buffer
      const headerOffset = window.innerWidth >= 1024 ? 70 : 130;
      const scrollPosition = window.scrollY + headerOffset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const sectionTop = section.element.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollPosition) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = window.innerWidth >= 1024 ? 56 : 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-[#fafafa] shadow-sm transition-all duration-300">
      <div className="lg:hidden flex h-[64px] w-full items-center justify-between bg-[#FAFAFA] border-b border-[#D4D4D4] px-[clamp(1rem,5%,2rem)] py-3 gap-2">
        <div className="flex items-center gap-2 flex-1">
          <button className="shrink-0 w-6 h-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 19L5 12L12 5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="font-archivo font-medium text-[#262626] leading-[1.5] text-[clamp(1.125rem,1rem+0.5vw,1.25rem)]">
            Sattva Vasanta Skye
          </h1>
        </div>
        <div className="flex items-center shrink-0 gap-2">
          <button className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg p-2 aspect-square">
            <Share2 className="text-[#262626] w-6 h-6" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg p-2 aspect-square">
            <Heart className="text-[#262626] w-6 h-6" />
          </button>
        </div>
      </div>

      <nav className="bg-[#fafafa] border-b border-[#e5e5e5]">
        <div className="w-full flex items-center overflow-x-auto scrollbar-hide px-[clamp(1rem,5%,3rem)] gap-[clamp(0.75rem,2vw,1.5rem)]">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={`flex h-[56px] shrink-0 items-center justify-center px-[clamp(0.5rem,1vw,1rem)] py-4 whitespace-nowrap transition-colors font-manrope text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] font-normal leading-[1.5] ${
                activeSection === item.sectionId
                  ? "text-[#6B21A8] border-b-2 border-[#6B21A8]"
                  : "text-[#404040] hover:text-[#6B21A8]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}