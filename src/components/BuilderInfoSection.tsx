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
    <div className="flex flex-col w-full gap-5 md:gap-7">
      <h2 className="font-archivo font-[600] text-[#262626] leading-[1.5] text-xl md:text-2xl">
        About Sattva Group
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 w-full gap-3 md:gap-4">
        {builders.map((builder, index) => (
          <div key={index} className="flex flex-col gap-1">
            <p className="font-archivo font-[400] text-[#404040] leading-[1.5] tracking-[0.25px] text-xs md:text-sm whitespace-nowrap">
              {builder.label}
            </p>
            
            <div className="flex items-center w-full gap-2">
              <p className="flex-1 font-manrope font-[600] text-[#262626] leading-[1.5] overflow-hidden text-ellipsis whitespace-nowrap text-sm md:text-base">
                {builder.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

