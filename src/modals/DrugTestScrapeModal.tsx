import { useState, useEffect, useRef } from "react";
import {
  BaseModal,
  LogPanel,
  StepIndicator,
  StepNavButtons,
} from "../components";
import { useLogOutput } from "../hooks";
import {
  nmpaScrapingSteps,
  nmpaApprovalRows,
  nmpaDeviceRows,
  nmpaRecallRows,
  nmpaRegRows,
} from "../mockData";

// ─── 工具函数 ─────────────────────────────────────────────

const downloadCsv = (headers: string[], rows: string[][], filename: string) => {
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    ),
  ].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ─── 公共小组件 ───────────────────────────────────────────

const ProgressBar = ({
  label,
  current,
  total,
}: {
  label: string;
  current: number;
  total: number;
}) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs text-gray-500 mb-1">
      <span>{label}</span>
      <span>
        {current} / {total} 个品种
      </span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-indigo-600 rounded-full transition-all duration-700"
        style={{ width: `${Math.round((current / total) * 100)}%` }}
      />
    </div>
  </div>
);

// const HintBox = ({
//   children,
//   variant = "indigo",
// }: {
//   children: React.ReactNode;
//   variant?: "indigo" | "red";
// }) => {
//   const styles = {
//     indigo: "bg-indigo-50 border border-indigo-200 text-indigo-800",
//     red: "bg-red-50 border border-red-200 text-red-800",
//   };
//   return (
//     <div
//       className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${styles[variant]}`}
//     >
//       {children}
//     </div>
//   );
// };

const StatusBadge = ({ value }: { value: string }) => {
  const colorMap: Record<string, string> = {
    有效: "bg-green-100 text-green-700",
    一类: "bg-gray-100 text-gray-600",
    二类: "bg-blue-100 text-blue-700",
    三类: "bg-purple-100 text-purple-700",
    高影响: "bg-red-100 text-red-700",
    中影响: "bg-yellow-100 text-yellow-700",
    低影响: "bg-blue-100 text-blue-700",
  };
  const color = colorMap[value] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {value}
    </span>
  );
};

// ─── 步骤子组件 ───────────────────────────────────────────

// Step 0 — 批准信息
const ApprovalTable = () => (
  <>
    <ProgressBar label="批准信息抓取进度" current={156} total={200} />
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {[
              "药品名称",
              "批准文号",
              "批准日期",
              "有效期至",
              "生产企业",
              "状态",
            ].map((h) => (
              <th
                key={h}
                className="px-3 py-2 text-left font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {nmpaApprovalRows.map((r, i) => {
            const diff = Math.floor(
              (new Date(r.expire).getTime() - Date.now()) / 86400000,
            );
            return (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {r.name}
                </td>
                <td className="px-3 py-2 font-mono text-gray-600">
                  {r.approval}
                </td>
                <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                  {r.date}
                </td>
                <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                  {r.expire}
                </td>
                <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                  {r.company}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {diff < 180 ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      ⚠ 临期{diff}天
                    </span>
                  ) : (
                    <StatusBadge value="有效" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    {/* <HintBox>
      💡 <b>临期预警：</b>
      自动识别180天内到期批文，标注「临期」并推送给注册部门，提前启动续期流程。
    </HintBox> */}
  </>
);

// Step 1 — 器械注册
const DeviceTable = () => (
  <>
    <ProgressBar label="器械注册证抓取进度" current={89} total={120} />
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {[
              "产品名称",
              "注册证号",
              "注册人",
              "有效期至",
              "管理类别",
              "状态",
            ].map((h) => (
              <th
                key={h}
                className="px-3 py-2 text-left font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {nmpaDeviceRows.map((r, i) => {
            const diff = Math.floor(
              (new Date(r.expire).getTime() - Date.now()) / 86400000,
            );
            const threshold = r.type === "三类" ? 360 : 180;
            return (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {r.name}
                </td>
                <td className="px-3 py-2 font-mono text-gray-600">{r.reg}</td>
                <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                  {r.holder}
                </td>
                <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                  {r.expire}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <StatusBadge value={r.type} />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {diff < threshold ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      ⚠ 临期{diff}天
                    </span>
                  ) : (
                    <StatusBadge value="有效" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    {/* <HintBox>
      💡 <b>分类管控：</b>
      三类器械自动设置360天预警窗口（较二类更长），重要证件到期前分级推送给注册专员和部门负责人。
    </HintBox> */}
  </>
);

// Step 2 — 召回公告
const RecallTable = () => {
  const levelColor: Record<string, string> = {
    一级: "bg-red-100 text-red-700",
    二级: "bg-yellow-100 text-yellow-700",
    三级: "bg-blue-100 text-blue-700",
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {[
                "公告日期",
                "药品名称",
                "召回批号",
                "召回原因",
                "召回级别",
                "是否命中",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {nmpaRecallRows.map((r, i) => (
              <tr
                key={i}
                className={r.hit ? "bg-red-50/50" : "hover:bg-gray-50"}
              >
                <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                  {r.date}
                </td>
                <td
                  className={`px-3 py-2 whitespace-nowrap ${r.hit ? "font-semibold text-red-700" : "text-gray-900"}`}
                >
                  {r.drug}
                </td>
                <td className="px-3 py-2 font-mono text-gray-600 whitespace-nowrap">
                  {r.batch}
                </td>
                <td className="px-3 py-2 text-gray-600">{r.reason}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColor[r.level]}`}
                  >
                    {r.level}召回
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {r.hit ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      🚨 命中
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      未命中
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <HintBox variant="red">
        🚨 <b>预警触发：</b>发现2条召回公告命中本企业品种库（阿莫西林颗粒 /
        维生素C注射液），已自动推送至质量部负责人和合规团队，请立即核查。
      </HintBox> */}
    </>
  );
};

// Step 3 — 法规监测
const RegTable = () => (
  <>
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {["发布日期", "标题", "类型", "影响程度", "关键词"].map((h) => (
              <th
                key={h}
                className="px-3 py-2 text-left font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {nmpaRegRows.map((r, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                {r.date}
              </td>
              <td
                className="px-3 py-2 font-medium text-gray-900 max-w-[180px] truncate"
                title={r.title}
              >
                {r.title}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                  {r.type}
                </span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <StatusBadge value={r.impact} />
              </td>
              <td
                className="px-3 py-2 text-gray-500 max-w-[120px] truncate"
                title={r.keywords}
              >
                {r.keywords}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <HintBox>
      💡 <b>AI关联分析：</b>
      AI自动将法规关键词与企业品种库、在研项目比对，高影响法规自动生成「影响摘要」推送给注册部门，无需人工逐篇阅读。
    </HintBox> */}
  </>
);

// Step 4 — 汇总下载
const DownloadStep = () => {
  const files = [
    {
      label: "批准信息",
      // desc: `共 ${nmpaApprovalRows.length} 条`,
      icon: "📋",
      onDownload: () =>
        downloadCsv(
          ["药品名称", "批准文号", "批准日期", "有效期至", "生产企业"],
          nmpaApprovalRows.map((r) => [
            r.name,
            r.approval,
            r.date,
            r.expire,
            r.company,
          ]),
          `批准信息_${new Date().toLocaleDateString()}.csv`,
        ),
    },
    {
      label: "器械注册证",
      // desc: `共 ${nmpaDeviceRows.length} 条`,
      icon: "🔬",
      onDownload: () =>
        downloadCsv(
          ["产品名称", "注册证号", "注册人", "有效期至", "管理类别"],
          nmpaDeviceRows.map((r) => [
            r.name,
            r.reg,
            r.holder,
            r.expire,
            r.type,
          ]),
          `器械注册证_${new Date().toLocaleDateString()}.csv`,
        ),
    },
    {
      label: "召回公告",
      // desc: `共 ${nmpaRecallRows.length} 条，命中 ${nmpaRecallRows.filter((r) => r.hit).length} 条`,
      icon: "🚨",
      onDownload: () =>
        downloadCsv(
          [
            "公告日期",
            "药品名称",
            "召回批号",
            "召回原因",
            "召回级别",
            "是否命中",
          ],
          nmpaRecallRows.map((r) => [
            r.date,
            r.drug,
            r.batch,
            r.reason,
            r.level,
            r.hit ? "命中" : "未命中",
          ]),
          `召回公告_${new Date().toLocaleDateString()}.csv`,
        ),
    },
    {
      label: "法规监测",
      // desc: `共 ${nmpaRegRows.length} 条`,
      icon: "📜",
      onDownload: () =>
        downloadCsv(
          ["发布日期", "标题", "类型", "影响程度", "关键词"],
          nmpaRegRows.map((r) => [
            r.date,
            r.title,
            r.type,
            r.impact,
            r.keywords,
          ]),
          `法规监测_${new Date().toLocaleDateString()}.csv`,
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {files.map((f, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{f.icon}</span>
            <div>
              <div className="text-sm font-medium text-gray-900">{f.label}</div>
              {/* <div className="text-xs text-gray-400 mt-0.5">{f.desc}</div> */}
            </div>
          </div>
          <button
            onClick={f.onDownload}
            className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            下载 CSV
          </button>
        </div>
      ))}
    </div>
  );
};

// ─── 主 Modal ────────────────────────────────────────────

export const DrugTestScrapeModal = ({
  isOpen,
  onClose,
  onComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (summary: { successCount: number }) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { logs, addLog, clearLogs } = useLogOutput();
  const isPrintingRef = useRef(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const totalSteps = nmpaScrapingSteps.length;

  // 日志逐条打印
  useEffect(() => {
    if (!isOpen) {
      clearLogs();
      setCurrentStep(0);
      setIsManualMode(false);
      return;
    }

    const stepLogs = nmpaScrapingSteps[currentStep].logs;
    if (!stepLogs || stepLogs.length === 0) return;

    let logIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isPrintingRef.current) return;
    isPrintingRef.current = true;

    const printNext = () => {
      if (logIndex < stepLogs.length) {
        const logContent = stepLogs[logIndex];
        addLog(logContent);
        logIndex++;
        timeoutId = setTimeout(printNext, 500 + Math.random() * 300);
      } else {
        isPrintingRef.current = false;
      }
    };

    timeoutId = setTimeout(() => {
      printNext();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      isPrintingRef.current = false;
    };
  }, [isOpen, currentStep]);

  // 自动步进
  useEffect(() => {
    if (!isOpen || isManualMode) return;

    const allLogsCount = nmpaScrapingSteps
      .slice(0, currentStep + 1)
      .reduce((acc, step) => acc + step.logs.length, 0);

    const timeout = setTimeout(() => {
      if (logs.length >= allLogsCount && currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isOpen, currentStep, logs.length, isManualMode]);

  const prevStep = () => {
    setIsManualMode(true);
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const nextStep = () => {
    setIsManualMode(true);
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.({
        successCount:
          nmpaApprovalRows.length +
          nmpaDeviceRows.length +
          nmpaRecallRows.length +
          nmpaRegRows.length,
      });
      onClose();
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="🌐 NMPA信息抓取">
      {/* 步骤条 */}
      <div className="px-6 py-4 border-b border-gray-100">
        <StepIndicator steps={nmpaScrapingSteps} currentStep={currentStep} />
      </div>

      {/* 左右内容区 */}
      <div className="flex p-6 gap-6 h-[400px]">
        {/* 左侧日志 */}
        <div className="w-2/5">
          <LogPanel logs={logs} />
        </div>

        {/* 右侧内容 */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <h4 className="text-base font-medium text-gray-900 mb-1">
            Step {currentStep + 1}: {nmpaScrapingSteps[currentStep].title}
          </h4>
          <p className="text-sm text-gray-500 mb-4">
            {nmpaScrapingSteps[currentStep].desc}
          </p>
          {currentStep === 0 && <ApprovalTable />}
          {currentStep === 1 && <DeviceTable />}
          {currentStep === 2 && <RecallTable />}
          {currentStep === 3 && <RegTable />}
          {currentStep === 4 && <DownloadStep />}
        </div>
      </div>

      {/* 底部按钮 */}
      <StepNavButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrev={prevStep}
        onNext={nextStep}
      />
    </BaseModal>
  );
};
