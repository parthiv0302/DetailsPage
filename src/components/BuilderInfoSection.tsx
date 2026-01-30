import { HardHat } from "lucide-react";

const builders = [
  { label: "Age of Developer", name: "12 Years" },
  { label: "Operated Cities", name: "5" },
  { label: "Total Project", name: "2000" },
  { label: "Project in RTM", name: "1500" },
  { label: "Ongoing Projects", name: "500" },
];

export default function BuilderInfoSection() {
  return (
    <div className="flex flex-col w-full gap-[clamp(1.125rem,3vw,1.75rem)]">
      {/* Title */}
      <h2 
        className="font-archivo font-semibold text-[#262626] leading-[1.5] text-[clamp(1.25rem,4vw,1.5rem)]"
      >
        About Sattva Group
      </h2>

      {/* Desktop/Tablet: 5 columns in one row | Mobile: 2 columns with row wrapping */}
      <div 
        className="grid grid-cols-2 md:grid-cols-5 w-full gap-[clamp(0.75rem,2vw,1rem)]"
      >
        {builders.map((builder, index) => (
          <div 
            key={index} 
            className="flex flex-col gap-1"
          >
            {/* Label */}
            <p 
              className="font-archivo font-normal text-[#404040] leading-[1.5] tracking-[0.25px] text-[clamp(0.7rem,1.5vw,0.813rem)] whitespace-nowrap"
            >
              {builder.label}
            </p>
            
            {/* Icon + Name */}
            <div 
              className="flex items-center w-full gap-2"
            >
              <p 
                className="flex-1 font-manrope font-semibold text-[#262626] leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.875rem,2.5vw,1rem)]"
              >
                {builder.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
