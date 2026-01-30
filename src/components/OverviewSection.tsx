import Image from "next/image";

const overviewItems = [
  { label: "Project Size", value: "2.5 Acres", icon: "/projectsize.svg" },
  { label: "Total Units", value: "500", icon: "/totalunits.svg" },
  { label: "Project Open Space", value: "60%(2 Acres)", icon: "/projectopenspace.svg" },
  { label: "Project Density", value: "11.25 Units/Acers", icon: "/projectdensity.svg" },
];

export default function OverviewSection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col w-full gap-[20px] ${className || ""}`} {...props}>
      <h2 className="font-archivo font-semibold text-gray-800 leading-[1.5] md:text-left text-center text-[clamp(1.25rem,3vw,1.5rem)]">
        Overview
      </h2>
      
      <div className="grid grid-cols-2 md:flex md:flex-row w-full gap-[20px]">
        {overviewItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-start gap-[6px] md:flex-[1_0_0] min-w-0">
            <p className="font-archivo font-normal text-[#404040] leading-[150%] tracking-[0.25px] text-[14px]">
              {item.label}
            </p>
            <div className="flex items-center self-stretch gap-[8px]">
              <Image src={item.icon} alt="" width={24} height={24} className="shrink-0 w-[24px] h-[24px]" />
              <span className="font-manrope font-semibold text-gray-800 leading-[1.5] text-[16px]">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}