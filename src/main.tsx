import React from "react";
import ReactDOM from "react-dom/client";
import IndexPage from "./index.tsx";
import "./index.css"; // 必须引入这个文件，Tailwind 样式才会生效

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IndexPage />
  </React.StrictMode>,
);
