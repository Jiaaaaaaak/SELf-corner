# 🚀 SELf-corner 專案啟動 SOP (Standard Operating Procedure)

本文件引導您從零開始啟動 **SELf-corner (AI 虛擬教師培訓平台)** 專案，包含環境準備、開發調試與生產佈署步驟。

---

## 1. 環境預備 (Prerequisites)
在開始之前，請確保您的開發環境已安裝以下工具：
*   **Runtime**: [Node.js](https://nodejs.org/) (建議 v18.0.0 以上) 或 [Bun](https://bun.sh/) (專案內含 `bun.lockb`)。
*   **Package Manager**: `npm` (隨 Node.js 安裝) 或 `bun`。
*   **IDE**: 建議使用 [VS Code](https://code.visualstudio.com/)，並安裝以下擴充功能：
    *   ESLint
    *   Prettier
    *   Tailwind CSS IntelliSense

---

## 2. 專案初始化 (Project Setup)

### Step 1: 複製專案
如果您是第一次取得原始碼，請執行：
```bash
git clone <repository-url>
cd SELf-corner
```

### Step 2: 安裝依賴套件
使用您偏好的套件管理器安裝必要的函式庫：
```bash
# 使用 npm
npm install

# 或使用 bun (推薦，速度較快)
bun install
```

---

## 3. 開發環境啟動 (Development)

### Step 1: 啟動開發伺服器
啟動 Vite 開發環境，這將開啟熱重載 (Hot Module Replacement) 功能：
```bash
npm run dev
# 或
bun dev
```

### Step 2: 瀏覽專案
開啟瀏覽器並造訪：
*   **URL**: `http://localhost:5173`
*   **預設入口**: 系統會自動導向 `/login` 頁面。

---

## 4. 核心功能驗證 (Core Features Validation)
啟動後，請依序檢查以下流程是否正常：
1.  **登入流程**: 於 `/login` 點擊「登入」按鈕，確認是否進入 `/home`。
2.  **練習路徑**: 於 `/home` 點擊「開始練習」➔ 進入 `/chatroom` ➔ 選擇一個情境。
3.  **對話模擬**: 在對話空間發送文字，確認 2 秒後是否有虛擬學生的模擬回應。
4.  **回饋報告**: 點擊對話空間右下角的「結束按鈕」，確認是否跳轉至 `/feedback` 並看到雷達圖。
5.  **歷史紀錄**: 透過側邊選單進入 `/history`，確認點擊清單項目可回看報告。

---

## 5. 代碼品質維護 (Quality Control)
在提交程式碼前，請執行以下指令確保符合專案規範：
*   **語法檢查 (Lint)**: `npm run lint`
*   **類型檢查 (Type Check)**: `npx tsc --noEmit`
*   **格式化 (Format)**: 使用 Prettier 進行全域格式化。

---

## 6. 生產環境佈署 (Build & Preview)

### Step 1: 專案打包
將 TypeScript 與 React 代碼編譯為優化的靜態檔案：
```bash
npm run build
```
編譯後的檔案將存放在 `/dist` 目錄中。

### Step 2: 本地預覽
在正式佈署前，預覽打包後的成果：
```bash
npm run preview
```

---

## 📂 相關文件索引
若需深入了解系統細節，請參閱以下位於 `/docs` 的文件：
*   **產品需求 (PRD)**: `01_Product_Requirements_Document.md`
*   **系統架構**: `02_System_Architecture.md`
*   **UI/UX 規範**: `frontEnd_page/08_UI_UX_Design_System.md`
*   **頁面架構 (IA)**: `frontEnd_page/` 資料夾下的各分頁文件。

---

**💡 提示**: 本專案目前前端採用 **Mock Data** 運行，若需介接後端 API，請參閱 `04_API_Specification.md` 進行環境變數設定。
