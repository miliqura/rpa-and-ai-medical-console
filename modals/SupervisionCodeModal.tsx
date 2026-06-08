import { useState, useRef, useEffect } from "react";
import { useLogOutput } from "../hooks";
import { supervisionCodeSteps } from "../src/mockData";
import {
  BaseModal,
  LogPanel,
  StepIndicator,
  StepNavButtons,
} from "../src/components";

export const SupervisionCodeModal = ({
  isOpen,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (summary: {
    successCount: number;
    duplicateCount: number;
    filteredCount: number;
    successRate: string;
  }) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  // const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const { logs: visibleLogs, addLog, clearLogs } = useLogOutput();
  const isPrintingRef = useRef(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const totalSteps = supervisionCodeSteps.length;

  const nextStep = () => {
    setIsManualMode(true);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.({
        successCount: 2146,
        duplicateCount: 89,
        filteredCount: 47,
        successRate: "91.5%",
      });
      onClose();
    }
  };

  const prevStep = () => {
    setIsManualMode(true);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // setVisibleLogs([]);
      clearLogs();
      setCurrentStep(0);
      setIsManualMode(false);
      return;
    }

    const stepLogs = supervisionCodeSteps[currentStep].logs;
    if (!stepLogs || stepLogs.length === 0) return;

    let logIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    // 增加锁判断
    if (isPrintingRef.current) return;
    isPrintingRef.current = true;

    const printNext = () => {
      if (logIndex < stepLogs.length) {
        const logContent = stepLogs[logIndex];

        addLog(logContent);
        logIndex++;
        timeoutId = setTimeout(printNext, 500 + Math.random() * 300);
      } else {
        isPrintingRef.current = false; // 打印完一组后解锁
      }
    };

    timeoutId = setTimeout(() => {
      // addLog();
      printNext();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      isPrintingRef.current = false; // 组件卸载或重绘时强制解锁
    };
  }, [isOpen, currentStep]);

  useEffect(() => {
    if (!isOpen || isManualMode) return;

    const allLogsCount = supervisionCodeSteps
      .slice(0, currentStep + 1)
      .reduce((acc, step) => acc + step.logs.length, 0);

    const timeout = setTimeout(() => {
      if (visibleLogs.length >= allLogsCount && currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isOpen, currentStep, visibleLogs.length, totalSteps]);

  const currentStepData = supervisionCodeSteps[currentStep];

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="🤖 监管码采集与上传">
      {/* 步骤条区域 */}
      <div className="px-6 py-4 border-b border-gray-100">
        <StepIndicator steps={supervisionCodeSteps} currentStep={currentStep} />
      </div>

      {/* 内容区域：左侧 LogPanel，右侧具体步骤 */}
      <div className="flex p-6 gap-6 h-[400px]">
        <div className="w-2/5">
          <LogPanel logs={visibleLogs} />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <h4 className="text-base font-medium text-gray-900 mb-2">
            Step {currentStep + 1}: {currentStepData.title}
          </h4>
          <p className="text-sm text-gray-500 mb-4">{currentStepData.desc}</p>

          {currentStep === totalSteps - 1 ? (
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 mt-2 animate-fade-in">
              {/* <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <div>
                  <h5 className="text-emerald-900 font-semibold text-sm">
                    数据处理与上传完成
                  </h5>

                  <p className="text-emerald-700/80 text-xs mt-1">
                    监管码已全部成功同步至国家药监局平台数据库
                  </p>
                </div>
              </div> */}

              <div className="grid grid-cols-2 gap-3 bg-white rounded-lg p-4 border border-emerald-50/60 shadow-sm">
                <div className="p-3 bg-gray-50/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1.5">
                    成功上传条数
                  </div>

                  <div className="text-xl font-bold text-gray-900">
                    2,146{" "}
                    <span className="text-xs text-gray-400 font-normal">
                      条
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-gray-50/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1.5">
                    拦截重复条数
                  </div>

                  <div className="text-xl font-bold text-gray-900">
                    89{" "}
                    <span className="text-xs text-gray-400 font-normal">
                      条
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1.5">
                    无效过滤条数
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    47{" "}
                    <span className="text-xs text-gray-400 font-normal">
                      条
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/30 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1.5">整体成功率</div>

                  <div className="text-xl font-bold text-emerald-600">
                    91.5%
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 前置步骤依然使用 prose 渲染，增加颜色限制使其更协调 */
            <div className="flex-1 overflow-y-auto pr-2">
              <div
                className="prose prose-sm max-w-none prose-indigo prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: currentStepData.content(),
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* 底部按钮栏 */}
      <StepNavButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrev={prevStep}
        onNext={nextStep}
      />
    </BaseModal>
  );
};
