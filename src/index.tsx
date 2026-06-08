import { RobotAccountBadge, SceneSummary } from "./components";
import { useState } from "react";
import {
  LiteratureSearchModal,
  SupervisionCodeModal,
  RunningModal,
  DrugTestScrapeModal,
} from "./modals";
import {
  departments,
  statsData,
  getRobotAccount,
  Department,
} from "./mockData";

const IndexPage = () => {
  const [departmentsState, setDepartmentsState] =
    useState<Department[]>(departments);
  const [modalOpen, setModalOpen] = useState(false);
  const [literatureModalOpen, setLiteratureModalOpen] = useState(false);
  const [supervisionCodeModalOpen, setSupervisionCodeModalOpen] =
    useState(false);
  const [drugTestScrapeModalOpen, setDrugTestScrapeModalOpen] = useState(false);
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

  const handleDrugTestScrapeComplete = (summary: { successCount: number }) => {
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
              if (scene.id === "drug-test-scrape") {
                return {
                  ...scene,
                  status: "completed",
                  lastRun,
                  summary: {
                    successCount: summary.successCount,
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

    if (sceneId === "drug-test-scrape") {
      setDrugTestScrapeModalOpen(true);
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

      <DrugTestScrapeModal
        isOpen={drugTestScrapeModalOpen}
        onClose={() => setDrugTestScrapeModalOpen(false)}
        onComplete={handleDrugTestScrapeComplete}
      />
    </div>
  );
};

export default IndexPage;
