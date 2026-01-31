"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import PropertyIssuesModal from "./PropertyIssuesModal";

const phases = [
  {
    name: "Assetz 63 Degree East - Tower A",
    rera: "PRM/KA/RERA/1251/310/PR/281125/008282",
    tower: "Ready to Move",
    date: "Handover Date: Jan 2022",
    issues: 0,
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
    issues: 0,
  },
  {
    name: "Assetz 63 Degree East - Tower D",
    rera: "Rera Awaited",
    tower: "Pre-Launch",
    date: "Exp. launch on Feb 2026",
    issues: 2,
  },
];

export default function BuilderUnitOverview({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTower, setSelectedTower] = useState("");

  const handleViewClick = (towerName: string) => {
    setSelectedTower(towerName);
    setIsModalOpen(true);
  };

  return (
    <div className={`flex flex-col w-full ${className || ""}`} {...props}>
      <div className="flex flex-col gap-5 md:gap-6">
        <h2 className="font-archivo font-[600] text-[#262626] text-xl md:text-2xl leading-[1.5]">
          Phase Details
        </h2>

        <div className="border border-[#E5E5E5] rounded-xl overflow-hidden w-full lg:max-w-[865px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#E5E5E5]">
                  <th className="text-left font-archivo font-[500] text-[#737373] text-sm leading-[1.5] tracking-[0.25px] px-5 py-2.5 w-[40%]">
                    Phase
                  </th>
                  <th className="text-left font-archivo font-[500] text-[#737373] text-sm leading-[1.5] tracking-[0.25px] px-5 py-2.5">
                    Tower
                  </th>
                  <th className="text-left font-archivo font-[500] text-[#737373] text-sm leading-[1.5] tracking-[0.25px] px-5 py-2.5 w-40">
                    Issues
                  </th>
                  <th className="text-left font-archivo font-[500] text-[#737373] text-sm leading-[1.5] tracking-[0.25px] px-5 py-2.5 w-32">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {phases.map((phase, index) => (
                  <tr key={index} className="bg-[#FAFAFA] border-b border-[#E5E5E5] last:border-b-0">
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-manrope font-[600] text-[#262626] text-base leading-[1.5]">
                          {phase.name}
                        </p>
                        <p className="font-manrope font-[400] text-[#525252] text-sm leading-[1.5]">
                          {phase.rera}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-manrope font-[600] text-[#262626] text-base leading-[1.5] whitespace-nowrap">
                          {phase.tower}
                        </p>
                        <p className="font-manrope font-[400] text-[#525252] text-sm leading-[1.5] whitespace-nowrap">
                          {phase.date}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {phase.issues > 0 ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFE4E6] w-fit">
                          <AlertTriangle className="w-[18px] h-[18px] text-[#BE123C] shrink-0" />
                          <span className="font-manrope font-[500] text-[#BE123C] text-sm leading-[1.5] whitespace-nowrap">
                            {phase.issues} Issues
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCFCE7] w-fit">
                          <CheckCircle className="w-[18px] h-[18px] text-[#166534] shrink-0" />
                          <span className="font-manrope font-[500] text-[#166534] text-sm leading-[1.5] whitespace-nowrap">
                            Clear
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <button 
                        onClick={() => handleViewClick(phase.name)}
                        className="font-manrope font-[600] text-[#7E22CE] text-base leading-[1.5] hover:text-[#6b21a8] transition-colors cursor-pointer"
                      >
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

      <PropertyIssuesModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        towerName={selectedTower}
      />
    </div>
  );
}

