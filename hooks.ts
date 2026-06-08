import { useState, useCallback } from "react";

export const useLogOutput = () => {
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
