"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, FileText, Shield, Scale, Home, LucideIcon } from "lucide-react";

interface PropertyIssuesModalProps {
  isOpen: boolean;
  onClose: () => void;
  towerName?: string;
}

interface Issue {
  title: string;
  description: string;
  status: "clear" | "issue";
  icon: LucideIcon;
}

const issues: Issue[] = [
  {
    title: "Commencement Certificate",
    description: "Confirms the project is legally approved to start construction as.",
    status: "clear",
    icon: FileText,
  },
  {
    title: "RERA Certificate",
    description: "Confirms the project is legally approved to start construction as.",
    status: "clear",
    icon: Shield,
  },
  {
    title: "Land Litigation",
    description: "Confirms the project is legally approved to start construction as.",
    status: "issue",
    icon: Scale,
  },
  {
    title: "Occupancy Certificate",
    description: "Confirms the project is legally approved to start construction as.",
    status: "issue",
    icon: Home,
  },
];

function IssueCard({ issue }: { issue: Issue }) {
  const isClear = issue.status === "clear";
  const bgColor = isClear ? "bg-[#DCF8E7]" : "bg-[#FFE4E6]";
  const iconColor = isClear ? "text-[#166534]" : "text-[#BE123C]";
  const Icon = issue.icon;

  return (
    <div className={`flex items-center gap-4 px-5 py-4 rounded-lg ${bgColor}`}>
      <Icon className={`w-6 h-6 ${iconColor} shrink-0`} />
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <h3 className="font-archivo font-[500] text-[#262626] text-base leading-[1.5] tracking-[0.25px]">
            {issue.title}
          </h3>
          <ExternalLink className="w-6 h-6 text-[#525252] cursor-pointer hover:text-[#262626] transition-colors shrink-0" />
        </div>
        <p className="font-manrope font-[500] text-[#525252] text-sm leading-[1.5]">
          {issue.description}
        </p>
      </div>
    </div>
  );
}

export default function PropertyIssuesModal({ 
  isOpen, 
  onClose, 
  towerName = "Assetz 63 Degree East - Tower A" 
}: PropertyIssuesModalProps) {
  if (!isOpen) return null;

  const clearIssues = issues.filter(i => i.status === "clear");
  const haveIssues = issues.filter(i => i.status === "issue");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 md:block hidden" 
            onClick={onClose} 
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="absolute right-0 top-0 bottom-0 w-full md:w-[483px] max-w-full bg-[#FAFAFA] shadow-2xl flex flex-col"
          >
            {/* Header - Mobile */}
            <div className="md:hidden flex flex-col border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2 px-4 py-3 h-16">
                <button
                  onClick={onClose}
                  className="shrink-0"
                >
                  <ArrowLeft className="w-6 h-6 text-[#262626]" />
                </button>
                <h2 className="flex-1 font-archivo font-[500] text-[#262626] text-lg leading-[1.5]">
                  {towerName}
                </h2>
              </div>
            </div>

            {/* Header - Desktop */}
            <div className="hidden md:flex flex-col border-b border-[#E5E5E5]">
              <div className="flex items-center justify-between px-6 py-5">
                <h2 className="font-archivo font-[500] text-[#262626] text-xl leading-[1.5]">
                  {towerName}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#E5E5E5] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-[18px] h-[18px] text-[#525252]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">
              {/* Filter Buttons */}
              <div className="flex gap-2.5">
                <button className="px-4 py-1.5 bg-[#DCF8E7] rounded-full">
                  <span className="font-manrope font-[600] text-[#262626] text-xs leading-[1.5]">Clear</span>
                </button>
                <button className="px-4 py-1.5 bg-[#FFE4E6] rounded-full">
                  <span className="font-manrope font-[600] text-[#262626] text-xs leading-[1.5]">Have Issues</span>
                </button>
              </div>

              {/* Issues List */}
              <div className="flex flex-col gap-[18px]">
                {clearIssues.map((issue, idx) => (
                  <IssueCard key={idx} issue={issue} />
                ))}
                {haveIssues.map((issue, idx) => (
                  <IssueCard key={idx} issue={issue} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

