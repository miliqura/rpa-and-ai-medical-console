import { useState, useEffect, useCallback, useRef } from "react";
import {
  drugLiteratureData,
  getRobotAccount,
  departments,
  searchFormulas,
  literatureData,
  statsData,
  supervisionCodeSteps,
  Department,
} from "./mockData";
import {
  BaseModal,
  LogPanel,
  RobotAccountBadge,
  SceneSummary,
  StepIndicator,
  StepNavButtons,
} from "./components";

const useLogOutput = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const getCurrentTime = useCallback(() => {
    const now = new Date();
    return now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, []);

  const addLog = useCallback(
    (message: string) => {
      const timestamp = getCurrentTime();
      const logWithTime = `[${timestamp}] ${message}`;
      setLogs((prev) => {
        const hasDuplicate = prev.some((log) => log.includes(message));
        if (hasDuplicate) {
          return prev;
        }
        return [...prev, logWithTime];
      });
    },
    [getCurrentTime],
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return { logs, addLog, clearLogs };
};

const literatureSteps = [
  {
    step: 1,
    label: "选择药品",
    logs: [],
  },
  {
    step: 2,
    label: "PubMed检索式",
    logs: ["开始生成检索式", "已选择药品", "检索式生成完成"],
  },
  {
    step: 3,
    label: "检索文献中",
    logs: ["开始执行检索", "连接PubMed数据库", "检索完成"],
  },
  {
    step: 4,
    label: "查看结果",
    logs: [],
  },
];

const LiteratureSearchModal = ({
  isOpen,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (summary: {
    successCount?: number;
    duplicateCount?: number;
    filteredCount?: number;
    successRate?: string;
    totalCount?: number;
    aiHitCount?: number;
  }) => void;
}) => {
  const [selectedDrugs, setSelectedDrugs] = useState<number[]>([]);
  const [generatedFormulas, setGeneratedFormulas] = useState<
    { drugName: string; formula: string }[]
  >([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isManualMode, setIsManualMode] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const { logs: runLogs, addLog: addLogFn, clearLogs } = useLogOutput();
  const [searchResults, setSearchResults] = useState<
    {
      drugName: string;
      pmid: string;
      title: string;
      abstract: string;
      hasAdverse: string;
      confidence: string;
      reason: string;
      formula: string;
    }[]
  >([]);
  const [totalFoundCount, setTotalFoundCount] = useState(0);
  const [totalAiHitCount, setTotalAiHitCount] = useState(0);

  const totalSteps = literatureSteps.length;

  const toggleDrug = (id: number) => {
    setSelectedDrugs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const handleClose = () => {
    onClose();
    setSelectedDrugs([]);
    setGeneratedFormulas([]);
    setCurrentStep(0);
    setIsManualMode(false);
    clearLogs();
    setSearchResults([]);
  };

  const handleComplete = () => {
    onComplete?.({
      totalCount: totalFoundCount,
      aiHitCount: totalAiHitCount,
    });
    handleClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedDrugs([]);
      setGeneratedFormulas([]);
      setCurrentStep(0);
      setIsManualMode(false);
      clearLogs();
      setSearchResults([]);
      return;
    }

    let stepLogs: string[] = [];

    // 当进入"执行检索"步骤时，动态生成带有药品名称的日志
    if (currentStep === 2) {
      stepLogs.push("开始运行");
      let totalFound = 0;
      let totalAiHit = 0;
      selectedDrugs.forEach((id) => {
        const drug = drugLiteratureData.find((d) => d.id === id);
        if (drug) {
          // 找出当前药品实际命中的文献数量
          const hits = literatureData.filter(
            (item) => item.drugName === drug.genericName,
          );
          // 模拟一个比初筛命中数稍微大一点的总检索数
          const found = hits.length * 3 + Math.floor(Math.random() * 10);
          totalFound += found;
          totalAiHit += hits.length;

          stepLogs.push(`当前检索药品：【${drug.genericName}】`);
          stepLogs.push(`检索到【${found}】篇`);
          stepLogs.push(`AI 初筛中【${drug.genericName}】`);
          stepLogs.push(`初筛命中【${hits.length}】篇`);
          stepLogs.push(
            `提取【${drug.genericName}】相关文献标题、摘要、作者信息`,
          );
        }
      });
      setTotalFoundCount(totalFound);
      setTotalAiHitCount(totalAiHit);
      stepLogs.push("结束运行");
    } else {
      stepLogs = literatureSteps[currentStep]?.logs || [];
    }

    if (!stepLogs || stepLogs.length === 0) return;

    setIsLogging(true);

    let logIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const addStepLog = () => {
      if (logIndex >= stepLogs.length) {
        setIsLogging(false);
        return;
      }
      const logContent = stepLogs[logIndex];
      addLogFn(logContent);
      logIndex++;
      timeoutId = setTimeout(addStepLog, 500 + Math.random() * 300);
    };

    timeoutId = setTimeout(() => {
      addStepLog();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isOpen, currentStep, selectedDrugs]);

  useEffect(() => {
    if (!isOpen || isManualMode) return;

    // 重新计算动态生成的日志总数，确保自动跳转的时间点准确
    let expectedLogsCount = 0;
    for (let i = 0; i <= currentStep; i++) {
      if (i === 2) {
        expectedLogsCount += 2 + selectedDrugs.length * 5; // 开始和结束2条 + 每个药品5条
      } else {
        expectedLogsCount += literatureSteps[i].logs.length;
      }
    }

    const timeout = setTimeout(() => {
      if (runLogs.length >= expectedLogsCount && currentStep < totalSteps - 1) {
        if (currentStep === 0) return;
        if (currentStep === 1 && generatedFormulas.length === 0) {
          const formulas = selectedDrugs
            .map((id) => {
              const drug = drugLiteratureData.find((d) => d.id === id);
              if (drug && searchFormulas[drug.genericName]) {
                return {
                  drugName: drug.genericName,
                  formula: searchFormulas[drug.genericName],
                };
              }
              return null;
            })
            .filter(Boolean) as { drugName: string; formula: string }[];
          setGeneratedFormulas(formulas);
        }
        if (currentStep === 2 && searchResults.length === 0) {
          const selectedDrugNames = generatedFormulas.map((f) => f.drugName);
          const filteredResults = literatureData
            .filter((item) => selectedDrugNames.includes(item.drugName))
            .map((item) => {
              const formula = generatedFormulas.find(
                (f) => f.drugName === item.drugName,
              );
              return {
                ...item,
                formula: formula?.formula || "",
              };
            });
          setSearchResults(filteredResults);
        }
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, 500);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [
    isOpen,
    currentStep,
    runLogs.length,
    isManualMode,
    selectedDrugs.length,
    generatedFormulas.length,
  ]);

  const prevStep = () => {
    setIsManualMode(true);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const nextStep = () => {
    // 如果是在第一步点击“开始检索”，则不进入手动模式，让后续流程自动执行
    if (currentStep === 0) {
      if (selectedDrugs.length === 0) return;
      setIsManualMode(false);
    } else {
      // 如果是在后续步骤中点击“下一步”，则说明用户想要手动接管
      setIsManualMode(true);
    }

    // 如果从步骤3（执行检索）跳到步骤4（查看结果），需要先生成搜索结果
    if (currentStep === 2 && searchResults.length === 0) {
      const selectedDrugNames = generatedFormulas.map((f) => f.drugName);
      const filteredResults = literatureData
        .filter((item) => selectedDrugNames.includes(item.drugName))
        .map((item) => {
          const formula = generatedFormulas.find(
            (f) => f.drugName === item.drugName,
          );
          return {
            ...item,
            formula: formula?.formula || "",
          };
        });
      setSearchResults(filteredResults);
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title="📚 文献检索与初筛">
      {/* 步骤条 */}
      <div className="px-6 py-4 border-b border-gray-100">
        <StepIndicator steps={literatureSteps} currentStep={currentStep} />
      </div>

      {/* 内容区 */}
      <div className="flex-1 flex overflow-hidden p-6">
        {/* 只有在步骤2（索引1）和步骤3（索引2）时，才显示左侧的日志面板 */}
        {(currentStep === 1 || currentStep === 2) && (
          <div className="w-1/2 pr-6">
            <LogPanel logs={runLogs} minHeight={250} />
          </div>
        )}

        {/* 步骤1（索引0）和步骤4（索引3）时撑满全宽（w-full），其余步骤保持半宽并带左边框 */}
        <div
          className={
            currentStep === 0 || currentStep === 3
              ? "w-full"
              : "w-1/2 pl-6 border-l border-gray-200"
          }
        >
          {currentStep === 0 && (
            <div className="h-full flex flex-col">
              <h4 className="font-medium text-gray-900 mb-4">选择药品</h4>

              {/* 表格区域 */}
              <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="p-3 border-b border-gray-200 w-12 text-center">
                        <input
                          type="checkbox"
                          checked={
                            drugLiteratureData.length > 0 &&
                            selectedDrugs.length === drugLiteratureData.length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDrugs(
                                drugLiteratureData.map((d) => d.id),
                              );
                            } else {
                              setSelectedDrugs([]);
                            }
                          }}
                          className="w-4 h-4 text-indigo-600 rounded border-gray-300 cursor-pointer"
                        />
                      </th>
                      <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900 whitespace-nowrap">
                        品种通用名
                      </th>
                      <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900">
                        关键词
                      </th>
                      <th className="p-3 border-b border-gray-200 text-sm font-medium text-gray-900">
                        同义词
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {drugLiteratureData.map((drug) => {
                      const isSelected = selectedDrugs.includes(drug.id);
                      return (
                        <tr
                          key={drug.id}
                          onClick={() => toggleDrug(drug.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-indigo-50/50" : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleDrug(drug.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-4 h-4 text-indigo-600 rounded border-gray-300 cursor-pointer"
                            />
                          </td>
                          <td className="p-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {drug.genericName}
                          </td>
                          <td className="p-3 text-xs text-gray-600">
                            {drug.keywords}
                          </td>
                          <td className="p-3 text-xs text-gray-600">
                            {drug.synonyms}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div className="h-full">
              <h4 className="font-medium text-gray-900 mb-4">PubMed检索式</h4>
              <p className="text-sm text-gray-600 mb-4">
                根据选择的药品自动生成检索式
              </p>
              <div className="bg-gray-50 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                {generatedFormulas.length > 0 ? (
                  generatedFormulas.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="text-xs text-gray-500 mb-1">
                        {item.drugName}
                      </div>
                      <div className="text-sm text-gray-800 font-mono break-all">
                        {item.formula}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm">等待生成检索式...</div>
                )}
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="h-full flex flex-col gap-4">
              {/* 在步骤3下方保持显示检索式内容 */}
              <div className="flex-1 border-t border-gray-100 pt-3">
                <div className="text-xs font-medium text-gray-500 mb-2">
                  已生成的检索式：
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[280px] overflow-y-auto">
                  {generatedFormulas.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="text-xs text-gray-500 mb-1">
                        {item.drugName}
                      </div>
                      <div className="text-sm text-gray-800 font-mono break-all">
                        {item.formula}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="h-full">
              <h4 className="font-medium text-gray-900 mb-4">检索结果</h4>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  共命中 {searchResults.length} 篇文献
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const headers = [
                        "通用药品名",
                        "PMID",
                        "文献标题",
                        "文献摘要",
                        "是否包含不良反应",
                        "AI置信度",
                        "判断理由",
                        "检索式",
                      ];
                      const rows = searchResults.map((item) => [
                        item.drugName,
                        item.pmid,
                        item.title,
                        item.abstract,
                        item.hasAdverse,
                        item.confidence,
                        item.reason,
                        item.formula,
                      ]);
                      const csv = [
                        headers.join(","),
                        ...rows.map((row) =>
                          row
                            .map((cell) => `"${cell.replace(/"/g, '""')}"`)
                            .join(","),
                        ),
                      ].join("\n");
                      const blob = new Blob(["\uFEFF" + csv], {
                        type: "text/csv;charset=utf-8;",
                      });
                      const link = document.createElement("a");
                      const url = URL.createObjectURL(blob);
                      link.setAttribute("href", url);
                      link.setAttribute(
                        "download",
                        `文献检索结果_${new Date().toLocaleDateString()}.csv`,
                      );
                      link.style.visibility = "hidden";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    导出表格
                  </button>
                  <button
                    onClick={() => {
                      alert("已发送到群聊！");
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                  >
                    一键发送到群
                  </button>
                </div>
              </div>
              <div className="max-h-[320px] overflow-x-auto overflow-y-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">
                        通用药品名
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">
                        PMID
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">
                        文献标题
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">
                        文献摘要
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">
                        是否包含不良反应
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600 whitespace-nowrap">
                        AI置信度
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">
                        判断理由
                      </th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">
                        检索式
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {searchResults.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                          {item.drugName}
                        </td>
                        <td className="px-4 py-3 text-indigo-600 font-mono text-xs">
                          {item.pmid}
                        </td>
                        <td
                          className="px-4 py-3 text-gray-800 max-w-[180px] truncate"
                          title={item.title}
                        >
                          {item.title}
                        </td>
                        <td
                          className="px-4 py-3 text-gray-600 text-xs max-w-[180px] truncate"
                          title={item.abstract}
                        >
                          {item.abstract}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.hasAdverse === "是"
                                ? "bg-green-100 text-green-700"
                                : item.hasAdverse === "疑似"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.hasAdverse}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.confidence === "高"
                                ? "bg-green-100 text-green-700"
                                : item.confidence === "中"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.confidence}
                          </span>
                        </td>
                        <td
                          className="px-4 py-3 text-gray-600 text-xs max-w-[150px] truncate"
                          title={item.reason}
                        >
                          {item.reason}
                        </td>
                        <td
                          className="px-4 py-3 text-gray-600 text-xs font-mono max-w-[200px] truncate"
                          title={item.formula}
                        >
                          {item.formula}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部按钮 */}
      <StepNavButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrev={prevStep}
        onNext={nextStep}
        nextDisabled={
          (currentStep === 0 && selectedDrugs.length === 0) ||
          (currentStep === 2 && isLogging)
        }
        nextLabel={currentStep === 0 ? "开始检索" : undefined}
      />
    </BaseModal>
  );
};

const SupervisionCodeModal = ({
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

const RunningModal = ({
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

const IndexPage = () => {
  const [departmentsState, setDepartmentsState] =
    useState<Department[]>(departments);
  const [modalOpen, setModalOpen] = useState(false);
  const [literatureModalOpen, setLiteratureModalOpen] = useState(false);
  const [supervisionCodeModalOpen, setSupervisionCodeModalOpen] =
    useState(false);
  const [currentScene, setCurrentScene] = useState<{
    name: string;
    status: "running" | "completed" | "error";
    logs: { timestamp: string; message: string }[];
  }>({
    name: "",
    status: "running",
    logs: [],
  });

  const handleSupervisionCodeComplete = (summary: {
    successCount: number;
    duplicateCount: number;
    filteredCount: number;
    successRate: string;
  }) => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const lastRun = `${currentDate} ${currentTime}`;

    setDepartmentsState((prev) =>
      prev.map((dept) => {
        if (dept.id === "reg-compliance") {
          return {
            ...dept,
            scenes: dept.scenes.map((scene) => {
              if (scene.id === "reg-code-upload") {
                return {
                  ...scene,
                  status: "completed",
                  lastRun: lastRun,
                  summary: {
                    successCount: summary.successCount,
                    duplicateCount: summary.duplicateCount,
                    filteredCount: summary.filteredCount,
                    successRate: summary.successRate,
                  },
                };
              }
              return scene;
            }),
          };
        }
        return dept;
      }),
    );
  };

  const handleLiteratureComplete = (summary: {
    successCount?: number;
    duplicateCount?: number;
    filteredCount?: number;
    successRate?: string;
    totalCount?: number;
    aiHitCount?: number;
  }) => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const lastRun = `${currentDate} ${currentTime}`;

    setDepartmentsState((prev) =>
      prev.map((dept) => {
        if (dept.id === "rd-quality") {
          return {
            ...dept,
            scenes: dept.scenes.map((scene) => {
              if (scene.id === "literature-search") {
                return {
                  ...scene,
                  status: "completed",
                  lastRun: lastRun,
                  summary: {
                    totalCount: summary.totalCount,
                    aiHitCount: summary.aiHitCount,
                  },
                };
              }
              return scene;
            }),
          };
        }
        return dept;
      }),
    );
  };

  const handleRun = (deptId: string, sceneId: string) => {
    if (sceneId === "literature-search") {
      setLiteratureModalOpen(true);
      return;
    }

    if (sceneId === "reg-code-upload") {
      setSupervisionCodeModalOpen(true);
      return;
    }

    setDepartmentsState((prev) =>
      prev.map((dept) => {
        if (dept.id === deptId) {
          return {
            ...dept,
            scenes: dept.scenes.map((scene) => {
              if (scene.id === sceneId) {
                return { ...scene, isRunning: true, status: "running" };
              }
              return scene;
            }),
          };
        }
        return dept;
      }),
    );

    const dept = departmentsState.find((d) => d.id === deptId);
    const scene = dept?.scenes.find((s) => s.id === sceneId);
    if (scene) {
      const newLogs: { timestamp: string; message: string }[] = [];
      const addLog = (message: string) => {
        const now = new Date();
        const timestamp = now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        newLogs.push({ timestamp, message });
      };

      addLog("任务启动...");
      setCurrentScene({
        name: scene.name,
        status: "running",
        logs: [...newLogs],
      });
      setModalOpen(true);

      setTimeout(() => {
        addLog("正在处理数据...");
        setCurrentScene((prev) => ({ ...prev, logs: [...newLogs] }));
      }, 500);

      setTimeout(() => {
        addLog("执行核心逻辑...");
        setCurrentScene((prev) => ({ ...prev, logs: [...newLogs] }));
      }, 1000);

      setTimeout(() => {
        addLog("生成结果报告...");
        setCurrentScene((prev) => ({ ...prev, logs: [...newLogs] }));
      }, 1500);

      setTimeout(() => {
        const success = Math.random() > 0.1;
        if (success) {
          addLog("任务完成");
        } else {
          addLog("执行出错，请检查日志");
        }
        const finalStatus = success ? "completed" : "error";
        setCurrentScene((prev) => ({
          ...prev,
          status: finalStatus,
          logs: [...newLogs],
        }));
        setDepartmentsState((prev) =>
          prev.map((d) => {
            if (d.id === deptId) {
              return {
                ...d,
                scenes: d.scenes.map((s) => {
                  if (s.id === sceneId) {
                    return {
                      ...s,
                      isRunning: false,
                      status: finalStatus,
                      lastRun: new Date().toISOString().split("T")[0],
                    };
                  }
                  return s;
                }),
              };
            }
            return d;
          }),
        );
      }, 2000);
    }
  };

  const getStatusIndicator = (status?: string, hasButton?: boolean) => {
    switch (status) {
      case "running":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            运行中
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            已完成
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            失败
          </span>
        );
      default:
        if (hasButton) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              待执行
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            待完善
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">自动化中心</h1>
              <p className="text-sm text-gray-500 mt-1">
                医药企业数字运营中枢 - 自动化流程管理
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-medium text-emerald-700">
                  系统运行正常
                </span>
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {index === 0 && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    )}
                    {index === 1 && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    )}
                    {index === 2 && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                    {index === 3 && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    )}
                  </svg>
                </div>
              </div>
              {stat.trend && (
                <div className="mt-3 flex items-center gap-1">
                  <svg
                    className={`w-3 h-3 ${stat.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {stat.trend.startsWith("+") ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    )}
                  </svg>
                  <span
                    className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {stat.trend}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 mb-4">
          <span className="text-xs text-gray-500">机器人账号状态：</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            空闲
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
            运行中
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
            离线
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentsState.map((department) => (
            <div
              key={department.id}
              className="bg-gradient-to-b from-white to-gray-50/50 rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {department.name}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {department.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {department.scenes.map((scene) => (
                  <div
                    key={scene.id}
                    className="p-4 bg-gray-50/50 rounded-lg border border-gray-100 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">
                          {scene.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {scene.description}
                        </p>
                      </div>
                      {/* 传入 scene.hasButton 参数 */}
                      {getStatusIndicator(scene.status, scene.hasButton)}
                    </div>

                    {scene.hasButton && (
                      <div className="flex flex-col gap-2 mt-2">
                        <span className="text-xs text-gray-400">
                          上次执行: {scene.lastRun}
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-gray-500">
                            执行账号:
                          </span>
                          {scene.executorAccounts.map((accountId) => {
                            const account = getRobotAccount(accountId);
                            return account ? (
                              <RobotAccountBadge
                                key={accountId}
                                account={account}
                              />
                            ) : null;
                          })}
                        </div>

                        {scene.summary && (
                          <SceneSummary
                            summary={scene.summary}
                            sceneId={scene.id}
                          />
                        )}

                        <div className="flex items-center justify-end mt-2">
                          <button
                            onClick={() =>
                              !scene.isRunning &&
                              handleRun(department.id, scene.id)
                            }
                            disabled={scene.isRunning}
                            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              scene.isRunning
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
                            }`}
                          >
                            {scene.isRunning ? "执行中..." : "执行"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <LiteratureSearchModal
        isOpen={literatureModalOpen}
        onClose={() => setLiteratureModalOpen(false)}
        onComplete={handleLiteratureComplete}
      />

      <RunningModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sceneName={currentScene.name}
        status={currentScene.status}
        logs={currentScene.logs}
      />

      <SupervisionCodeModal
        isOpen={supervisionCodeModalOpen}
        onClose={() => setSupervisionCodeModalOpen(false)}
        onComplete={handleSupervisionCodeComplete}
      />
    </div>
  );
};

export default IndexPage;
