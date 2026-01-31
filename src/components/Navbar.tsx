"use client";

import { useState, useEffect } from "react";
import { Share2, Heart } from "lucide-react";

export interface NavItem {
  label: string;
  sectionId: string;
}

export default function Navbar({ viewType }: { viewType: string }) {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [activeSection, setActiveSection] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);

  // Discover sections dynamically from the DOM
  useEffect(() => {
    const discoverSections = () => {
      const sectionElements = document.querySelectorAll("[data-section]");
      const items: NavItem[] = Array.from(sectionElements).map((el) => ({
        label: el.getAttribute("data-nav-label") || el.id || "Section",
        sectionId: el.id,
      }));
      
      // Filter out duplicates (e.g. if multiple components share the same ID/sectionId)
      const uniqueItems = items.filter((item, index, self) => 
        index === self.findIndex((t) => t.sectionId === item.sectionId)
      );

      setNavItems(uniqueItems);
    };

    // Initial discovery
    discoverSections();

    // Re-scan after a short delay to account for component rendering/hydration
    const timer = setTimeout(discoverSections, 100);
    return () => clearTimeout(timer);
  }, [viewType]);

  useEffect(() => {
    const handleScroll = () => {
      if (navItems.length === 0) return;

      // Check if scrolled to bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setActiveSection(navItems[navItems.length - 1].sectionId);
        return;
      }

      const sections = navItems.map((item) => ({
        id: item.sectionId,
        element: document.getElementById(item.sectionId),
      }));

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
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "overview") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    
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
    <div className="fixed top-0 z-50 w-full bg-[#FAFAFA]">
      <div className="lg:hidden flex h-16 w-full items-center bg-[#FAFAFA] px-4 py-3 gap-2">
        <button className="shrink-0 w-6 h-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 19L5 12L12 5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12H5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h1 className="flex-1 font-archivo font-[500] text-[#262626] text-lg leading-[150%]">
          Sattva Vasanta Skye
        </h1>
        
        <div className="flex items-center shrink-0 gap-2">
          <button className="w-10 h-10 flex items-center justify-center bg-[#E5E5E5] rounded-lg p-2">
            <Share2 className="text-[#262626] w-6 h-6" />
          </button>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="w-10 h-10 flex items-center justify-center bg-[#E5E5E5] rounded-lg p-2 transition-colors"
          >
            <Heart 
              className={`w-6 h-6 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-[#262626]'}`} 
            />
          </button>
        </div>
      </div>

      <nav className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <div className="w-full h-14 flex items-center overflow-x-auto scrollbar-hide px-4 lg:px-12 gap-3 lg:gap-6">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={`flex h-14 shrink-0 items-center justify-center px-2.5 py-4 whitespace-nowrap transition-colors font-manrope text-base leading-[150%] ${
                activeSection === item.sectionId
                  ? "font-[700] text-[#6B21A8] border-b-2 border-[#6B21A8]"
                  : "font-[500] text-[#525252] hover:text-[#6B21A8]"
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
