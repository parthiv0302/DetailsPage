import { Home } from "lucide-react";
import Image from "next/image";

const features = [
  { icon: Home, label: "Apartment, Plot & Villa" },
  { icon: "/assets/Project Stage.svg", label: "Pre-Launch", hasAsterisk: true, isCustom: true },
  { icon: "/assets/calendar-clock.svg", label: "Exp. Launch by Oct 2032", hasAsterisk: true, isCustom: true },
];

export default function PropertyFeaturesRow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      <div className="hidden md:flex flex-wrap gap-y-[16px] gap-x-[28px] items-center content-center w-full">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-[0.625rem] whitespace-nowrap">
            {feature.isCustom ? (
              <Image src={feature.icon as string} alt="" width={24} height={24} className="w-[1.5rem] h-[1.5rem]" />
            ) : (
              <feature.icon className="w-[1.5rem] h-[1.5rem] text-gray-800" />
            )}
            <p className="text-[1.125rem] font-medium text-[#262626] leading-[1.5] font-manrope">
              {feature.label}
              {feature.hasAsterisk && <span className="text-rose-700">*</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="md:hidden grid grid-cols-3 w-full gap-[22px] max-w-[358px]">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col gap-[8px] min-w-0">
            {feature.isCustom ? (
              <Image src={feature.icon as string} alt="" width={24} height={24} className="shrink-0 w-[24px] h-[24px]" />
            ) : (
              <feature.icon className="text-gray-800 shrink-0 w-[24px] h-[24px]" />
            )}
            <p className="font-manrope font-medium text-[#262626] leading-[1.5] text-[16px]">
              {feature.label}
              {feature.hasAsterisk && <span className="text-rose-700">*</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}