export default function Breadcrumb() {
  return (
    <div className="flex items-start justify-between w-full text-[#737373] leading-[1.5] font-manrope text-[12px] font-medium md:text-[14px] md:font-normal">
      {/* Full breadcrumb on desktop, shortened on mobile/tablet */}
      <p className="hidden lg:block">
        Home&gt;Property in Bangalore&gt;Project for sale in Devanhalli&gt;Satva Vasanta Skye{" "}
      </p>
      <p className="lg:hidden">
        Home&gt;...&gt;Satva Vasanta Skye{" "}
      </p>
      <p className="whitespace-nowrap">Updated on: 12 Jan 2025</p>
    </div>
  );
}
