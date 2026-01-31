import Image from "next/image";

const overviewItems = [
  { label: "Project Size", value: "2.5 Acres", icon: "/projectsize.svg" },
  { label: "Total Units", value: "500", icon: "/totalunits.svg" },
  { label: "Project Open Space", value: "60%(2 Acres)", icon: "/projectopenspace.svg" },
  { label: "Project Density", value: "11.25 Units/Acers", icon: "/projectdensity.svg" },
];

interface OverviewSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export default function OverviewSection({ className, title = "Overview", ...props }: OverviewSectionProps) {
  const handleTitleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`flex flex-col w-full ${className || ""}`} {...props}>
      <div className="hidden lg:flex flex-col gap-5">
        <h2 
          onClick={handleTitleClick}
          className="font-archivo font-[600] text-gray-800 leading-[1.5] text-2xl cursor-pointer hover:text-[#525252] transition-colors"
        >
          {title}
        </h2>
        
        <div className="flex flex-row w-full gap-5">
          {overviewItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start gap-1.5 flex-1 min-w-0">
              <p className="font-archivo font-[400] text-[#404040] leading-[150%] tracking-[0.25px] text-sm">
                {item.label}
              </p>
              <div className="flex items-center self-stretch gap-2">
                <Image src={item.icon} alt="" width={24} height={24} className="shrink-0 w-6 h-6" />
                <span className="font-manrope font-[600] text-gray-800 leading-[1.5] text-base">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:flex lg:hidden flex-col gap-5">
        <h2 className="font-archivo font-[600] text-gray-800 leading-[1.5] text-2xl">
          {title}
        </h2>
        
        <div className="flex flex-row w-full gap-3">
          {overviewItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start gap-1.5 flex-1 min-w-0">
              <p className="font-archivo font-[400] text-[#404040] leading-[150%] tracking-[0.25px] text-sm">
                {item.label}
              </p>
              <div className="flex items-center gap-2">
                <Image src={item.icon} alt="" width={24} height={24} className="shrink-0 w-6 h-6" />
                <span className="font-manrope font-[600] text-gray-800 leading-[1.5] text-base">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden flex flex-col gap-5">
        <h2 className="font-archivo font-[600] text-gray-800 leading-[1.5] text-left text-xl">
          {title}
        </h2>
        
        <div className="grid grid-cols-2 w-full gap-5">
          {overviewItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start gap-1.5 min-w-0">
              <p className="font-archivo font-[400] text-[#404040] leading-[150%] tracking-[0.25px] text-sm">
                {item.label}
              </p>
              <div className="flex items-center gap-2">
                <Image src={item.icon} alt="" width={24} height={24} className="shrink-0 w-6 h-6" />
                <span className="font-manrope font-[600] text-gray-800 leading-[1.5] text-base">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
