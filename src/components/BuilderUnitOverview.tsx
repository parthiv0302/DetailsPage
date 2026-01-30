"use client";

import { AlertTriangle } from "lucide-react";

const phases = [
  {
    name: "Assetz 63 Degree East - Tower A",
    rera: "PRM/KA/RERA/1251/310/PR/281125/008282",
    tower: "Ready to Move",
    date: "Handover Date: Jan 2022",
    issues: 2,
  },
  {
    name: "Assetz 63 Degree East - Tower B",
    rera: "PRM/KA/RERA/1251/310/PR/281125/008282",
    tower: "Ready to Move",
    date: "Handover Date: Jul 2024",
    issues: 2,
  },
  {
    name: "Assetz 63 Degree East - Tower C",
    rera: "PRM/KA/RERA/1251/310/PR/281125/008282",
    tower: "Under Construction",
    date: "Dec 2024 → Jul 2029",
    issues: 2,
  },
  {
    name: "Assetz 63 Degree East - Tower D",
    rera: "Rera Awaited",
    tower: "Pre-Launch",
    date: "Exp. launch on Feb 2026 ",
    issues: 2,
  },
];

export default function BuilderUnitOverview({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col w-full gap-[24px] px-[12px] ${className || ""}`} {...props}>
      {/* Title */}
      <h2 
        className="font-archivo font-semibold text-[#262626] text-[24px] leading-[1.5]"
      >
        Phase Details
      </h2>

      {/* Table Container */}
      <div className="border border-[#E5E5E5] rounded-[12px] overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[764px]">
            <thead>
              <tr className="bg-[#E5E5E5]">
                <th className="text-left font-archivo font-medium text-[#737373] text-[14px] leading-[1.5] tracking-[0.25px] p-[10px_20px]">
                  Phase
                </th>
                <th className="text-left font-archivo font-medium text-[#737373] text-[14px] leading-[1.5] tracking-[0.25px] p-[10px_20px]">
                  Tower
                </th>
                <th className="text-left font-archivo font-medium text-[#737373] text-[14px] leading-[1.5] tracking-[0.25px] p-[10px_20px] w-[155px]">
                  Issues
                </th>
                <th className="text-left font-archivo font-medium text-[#737373] text-[14px] leading-[1.5] tracking-[0.25px] p-[10px_20px] w-[138px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {phases.map((phase, index) => (
                <tr key={index} className="bg-[#FAFAFA] border-b border-[#E5E5E5] last:border-b-0">
                  <td className="p-[12px_20px]">
                    <div className="flex flex-col gap-[2px]">
                      <p className="font-manrope font-semibold text-[#262626] text-[16px] leading-[1.5]">
                        {phase.name}
                      </p>
                      <p className="font-manrope font-normal text-[#525252] text-[14px] leading-[1.5]">
                        {phase.rera}
                      </p>
                    </div>
                  </td>
                  <td className="p-[12px_20px]">
                    <div className="flex flex-col gap-[2px]">
                      <p className="font-manrope font-semibold text-[#262626] text-[16px] leading-[1.5] whitespace-nowrap">
                        {phase.tower}
                      </p>
                      <p className="font-manrope font-normal text-[#525252] text-[14px] leading-[1.5] whitespace-nowrap">
                        {phase.date}
                      </p>
                    </div>
                  </td>
                  <td className="p-[12px_20px]">
                    <div className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[24px] bg-[#FFE4E6] w-fit">
                      <AlertTriangle className="w-[20px] h-[20px] text-[#BE123C] shrink-0" />
                      <span className="font-manrope font-medium text-[#BE123C] text-[14px] leading-[1.5] whitespace-nowrap">
                        {phase.issues} Issues
                      </span>
                    </div>
                  </td>
                  <td className="p-[12px_20px]">
                    <button className="font-manrope font-semibold text-[#7E22CE] text-[16px] leading-[1.5] hover:text-[#6b21a8] transition-colors cursor-pointer">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
