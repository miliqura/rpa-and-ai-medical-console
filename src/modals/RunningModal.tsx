import { BaseModal } from "../components";

export const RunningModal = ({
  isOpen,
  onClose,
  sceneName,
  status,
  logs,
}: {
  isOpen: boolean;
  onClose: () => void;
  sceneName: string;
  status: "running" | "completed" | "error";
  logs: { timestamp: string; message: string }[];
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        status === "running"
          ? "任务执行中"
          : status === "completed"
            ? "任务完成"
            : "任务失败"
      }
      className="max-w-lg"
    >
      {/* 场景名 + 状态图标 */}
      <div className="px-6 pt-4 flex items-center gap-3">
        {status === "running" && (
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-indigo-600 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        {status === "completed" && (
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-emerald-600"
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
          </div>
        )}
        {status === "error" && (
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-red-600"
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
          </div>
        )}
        <p className="text-xs text-gray-500">{sceneName}</p>
      </div>

      {/* 日志区域 */}
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 h-40 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-3 mb-2">
              <span className="text-xs text-gray-400 shrink-0">
                {log.timestamp}
              </span>
              <span className="text-xs text-gray-600">{log.message}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-8">
              等待执行...
            </p>
          )}
        </div>
      </div>

      {/* 底部按钮 */}
      {status !== "running" && (
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            确定
          </button>
        </div>
      )}
    </BaseModal>
  );
};
