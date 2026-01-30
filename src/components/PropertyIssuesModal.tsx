"use client";

import { X, ExternalLink, FileText, Shield, Scale, Home } from "lucide-react";

interface PropertyIssuesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const issues = [
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

export default function PropertyIssuesModal({ isOpen, onClose }: PropertyIssuesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-[28vw] min-w-[320px] max-w-[450px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Assetz 63 Degree East - Tower A</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="px-6 pt-4 flex gap-2">
          <button className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-300">
            Clear
          </button>
          <button className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded-full border border-rose-300">
            Have Issues
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {issues.map((issue, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 p-4 rounded-lg border ${
                issue.status === "clear"
                  ? "bg-green-50 border-green-200"
                  : "bg-rose-50 border-rose-200"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                issue.status === "clear" ? "bg-green-100" : "bg-rose-100"
              }`}>
                <issue.icon className={`w-5 h-5 ${
                  issue.status === "clear" ? "text-green-700" : "text-rose-700"
                }`} />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{issue.title}</h3>
                  <ExternalLink className="w-4 h-4 text-gray-600 cursor-pointer" />
                </div>
                <p className="text-xs text-gray-600">{issue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
