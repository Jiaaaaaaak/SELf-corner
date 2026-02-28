# 全域架構與設計規範 (Global Architecture & Design IA)

本文件描述 SELf-corner 專案的整體前端架構、導航流程及共享組件設計。

## 1. 核心技術棧 (Tech Stack)
- **框架**: React (TypeScript)
- **建構工具**: Vite
- **路由**: react-router-dom (v6)
- **樣式**: Tailwind CSS + shadcn/ui
- **圖表**: Recharts
- **狀態管理**: React Hooks (useState, useEffect) + TanStack Query (QueryClient)

## 2. 導航結構 (Navigation Structure)

### 2.1 路由配置 (Route Map)
- `/login`: 登入與註冊入口 (預設導向路徑)
- `/home`: 專案介紹與入口主頁
- `/chatroom`: 核心功能：SEL 對話模擬空間
- `/history`: 過去練習紀錄列表
- `/info`: 個人帳號資訊管理
- `/feedback`: 對話結束後的專家分析與回饋

### 2.2 全域導航組件 (HamburgerMenu)
採用側邊抽屜式選單 (Sheet)，可在多數頁面中使用。
- **功能連結**:
    - 首頁
    - 歷史紀錄
    - 個人資料
    - 使用說明 (彈窗 Dialog)
    - 對話空間
    - 登出 (導向 /login)

## 3. 共享組件 (Shared Components)
- **UI 原件 (shadcn/ui)**: Button, Card, Input, Dialog, Sheet, Avatar, Tabs, ScrollArea, Separator, etc.
- **商業邏輯組件**:
    - `HamburgerMenu`: 跨頁面主要導航。
    - `NavLink`: (預留) 導航連結組件。

## 4. 設計語言 (Design Language)
- **背景**: `bg-background` (白/淺灰)
- **品牌色**: `primary` (shadcn 預設色調)
- **布局**: 多採用 `max-w-4xl` 或 `max-w-5xl` 置中布局，保持閱讀舒適度。
- **反饋**: 使用 `sonner` 或 `toast` 提供操作成功/失敗的即時通知。

## 5. 數據流向 (Data Flow)
- 目前主要以 Mock Data (模擬數據) 為主，定義在各頁面組件內部或組件上方。
- **對話數據**: 在 `Chatroom` 產生，完成後跳轉至 `Feedback` 顯示結果。
- **個人資料**: 在 `Info` 頁面進行狀態管理與模擬儲存。
