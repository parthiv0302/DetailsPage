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
      <div className="hidden lg:flex flex-wrap gap-y-4 gap-x-7 items-center content-center w-full">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2.5 whitespace-nowrap">
            {feature.isCustom ? (
              <Image src={feature.icon as string} alt="" width={24} height={24} className="w-6 h-6" />
            ) : (
              <feature.icon className="w-6 h-6 text-gray-800" />
            )}
            <p className="text-lg font-[500] text-[#262626] leading-[1.5] font-manrope">
              {feature.label}
              {feature.hasAsterisk && <span className="text-rose-700">*</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden md:hidden lg:hidden" />

      <div className="md:hidden grid grid-cols-3 w-full gap-6 max-w-sm">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col gap-2 min-w-0">
            {feature.isCustom ? (
              <Image src={feature.icon as string} alt="" width={24} height={24} className="shrink-0 w-6 h-6" />
            ) : (
              <feature.icon className="text-gray-800 shrink-0 w-6 h-6" />
            )}
            <p className="font-manrope font-[500] text-[#262626] leading-[1.5] text-base">
              {feature.label}
              {feature.hasAsterisk && <span className="text-rose-700">*</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
