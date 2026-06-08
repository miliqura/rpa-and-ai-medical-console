// src/components.tsx
import React from "react";

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative bg-white rounded-xl shadow-xl w-full mx-4 max-h-[90vh] flex flex-col ${className ?? "max-w-5xl"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export const LogPanel = ({
  logs,
  minHeight = 300,
}: {
  logs: string[];
  minHeight?: number;
}) => (
  <div
    className="bg-gray-900 rounded-lg p-4 h-full min-h-[300px] flex flex-col"
    style={{ minHeight }}
  >
    <div className="flex items-center gap-2 mb-3 shrink-0">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
      <span className="text-xs text-gray-400 ml-2">运行日志</span>
    </div>
    <div className="text-sm space-y-1 flex-1 overflow-y-scroll pr-2">
      {logs.map((log, i) => (
        <div key={i} className="text-gray-300 animate-fade-in">
          {log}
        </div>
      ))}
      {logs.length === 0 && (
        <div className="text-gray-500 italic">等待执行...</div>
      )}
    </div>
  </div>
);

export const RobotAccountBadge = ({
  account,
}: {
  account: { name: string; status: "idle" | "running" | "offline" };
}) => {
  const statusColor = {
    idle: "border border-green-300 text-green-600 bg-transparent",
    running: "border border-indigo-300 text-indigo-600 bg-transparent",
    offline: "border border-gray-300 text-gray-500 bg-transparent",
  };
  const statusText = {
    idle: "空闲",
    running: "运行中",
    offline: "离线",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[account.status]}`}
      title={`${account.name} - ${statusText[account.status]}`}
    >
      {account.name}
    </span>
  );
};

// components.tsx 新增
export const SceneSummary = ({
  summary,
  sceneId,
}: {
  summary: Record<string, number | string | undefined>;
  sceneId: string;
}) => {
  const fields =
    sceneId === "literature-search"
      ? [
          { label: "检索到的文献总篇数", key: "totalCount" },
          { label: "AI命中文献篇数", key: "aiHitCount" },
        ]
      : [
          { label: "成功条数", key: "successCount" },
          { label: "重复条数", key: "duplicateCount" },
          { label: "过滤条数", key: "filteredCount" },
          { label: "成功率", key: "successRate" },
        ];

  return (
    <div className="mt-2 p-2 bg-indigo-50 rounded-lg border border-indigo-200">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {fields.map(({ label, key }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-xs text-indigo-600">{label}</span>
            <span className="text-xs font-medium text-indigo-800">
              {typeof summary[key] === "number"
                ? summary[key]?.toLocaleString()
                : summary[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StepIndicator = ({
  steps,
  currentStep,
}: {
  steps: { label: string }[];
  currentStep: number;
}) => (
  <div className="flex items-center justify-center">
    {steps.map((step, index) => {
      const isCompleted = index < currentStep;
      const isActive = index === currentStep;
      return (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                isCompleted
                  ? "bg-indigo-600 text-white"
                  : isActive
                    ? "bg-indigo-600 text-white ring-2 ring-blue-200"
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              {isCompleted ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`mt-1 text-xs font-medium ${isCompleted || isActive ? "text-gray-900" : "text-gray-400"}`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-1 mx-2 rounded-full ${index < currentStep ? "bg-indigo-600" : "bg-gray-200"}`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export const StepNavButtons = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) => (
  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2">
    <button
      onClick={onPrev}
      disabled={currentStep === 0}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        currentStep === 0
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      上一步
    </button>
    <button
      onClick={onNext}
      disabled={nextDisabled}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        nextDisabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {nextLabel ?? (currentStep === totalSteps - 1 ? "✓ 完成" : "下一步")}
    </button>
  </div>
);
