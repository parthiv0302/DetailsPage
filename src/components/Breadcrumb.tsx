export default function Breadcrumb() {
  return (
    <div 
      className="flex items-start justify-between w-full text-[#737373] font-manrope leading-[150%] text-xs font-[500] md:text-sm md:font-[400]"
    >
      {/* Full breadcrumb on desktop/tablet */}
      <p className="hidden md:block">
        Home&gt;Property in Bangalore&gt;Project for sale in Devanhalli&gt;Satva Vasanta Skye
      </p>
      {/* Shortened breadcrumb on mobile */}
      <p className="md:hidden">
        Home&gt;...&gt;Satva Vasanta Skye
      </p>
      <p className="whitespace-nowrap">Updated on: 12 Jan 2025</p>
    </div>
  );
}

