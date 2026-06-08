import { useState, useRef, useEffect } from "react";
import { useLogOutput } from "../hooks";
import { supervisionCodeSteps } from "../mockData";
import {
  BaseModal,
  LogPanel,
  StepIndicator,
  StepNavButtons,
  StatGrid,
} from "../components";

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
            <StatGrid
              stats={[
                {
                  label: "成功上传条数",
                  value: "2,146",
                  color: "text-indigo-600",
                },
                { label: "拦截重复条数", value: "89", color: "text-gray-900" },
                { label: "无效过滤条数", value: "47", color: "text-gray-900" },
                {
                  label: "整体成功率",
                  value: "91.5%",
                  color: "text-emerald-600",
                },
                {
                  label: "节省人工工时",
                  value: "2.0h",
                  color: "text-emerald-600",
                },
                { label: "同步平台", value: "1", color: "text-gray-900" },
              ]}
              hint="✅ 监管码已全部成功同步至国家药监局平台数据库，重复条目已自动拦截，无效数据已过滤。"
            />
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
