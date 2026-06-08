/** @type {import('tailwindcss').Config} */
export default {
  // 指定 Tailwind 需要扫描的文件路径，确保能提取到所有写在 className 里的样式
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 在你的代码中，日志输出使用了 animate-fade-in，这里补充定义该动画的关键帧
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(5px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [
    // 你的步骤内容渲染使用了 prose 类名，必须引入这个官方排版插件
    require("@tailwindcss/typography"),
  ],
};
