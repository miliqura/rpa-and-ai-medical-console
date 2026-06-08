import { useState, useEffect } from "react";
import {
  BaseModal,
  LogPanel,
  StepIndicator,
  StepNavButtons,
} from "../src/components";
import { useLogOutput } from "../hooks";
import {
  drugLiteratureData,
  searchFormulas,
  literatureData,
} from "../src/mockData";
import { exportCsv } from "../utils/exportCSV";

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

export const LiteratureSearchModal = ({
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
                    onClick={() =>
                      exportCsv(
                        [
                          "通用药品名",
                          "PMID",
                          "文献标题",
                          "文献摘要",
                          "是否包含不良反应",
                          "AI置信度",
                          "判断理由",
                          "检索式",
                        ],
                        searchResults.map((item) => [
                          item.drugName,
                          item.pmid,
                          item.title,
                          item.abstract,
                          item.hasAdverse,
                          item.confidence,
                          item.reason,
                          item.formula,
                        ]),
                        `文献检索结果_${new Date().toLocaleDateString()}.csv`,
                      )
                    }
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
