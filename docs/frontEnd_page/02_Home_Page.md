# 首頁 (Home Page IA)

`/home` 頁面作為入口大廳，旨在向用戶介紹 SELf-corner 的設計初衷與核心價值。

## 1. 頁面功能 (Functions)
- **品牌宣導**: 展示平台目標 (SEL 輔導練習)。
- **核心理念**: 解釋為何需要此平台 (CASEL 五大能力)。
- **導航導覽**: 提供全域選單入口。
- **歡迎訊息**: 顯示當前登入用戶資訊。

## 2. 頁面組件與布局 (IA Hierarchy)
- **頂部標題與用戶欄 (Header)**:
    - `HamburgerMenu`: 開啟側邊選單。
    - `Avatar`: 顯示用戶頭像或名稱縮寫。
    - `span`: "hi, {user.name}" (歡迎語)。

- **核心介紹區塊 (Main Section)**:
    - **標題**: "關於 SELf-corner" (text-3xl, font-bold)
    - **子標題**: "一個為教師設計的 SEL 對話練習平台" (text-muted-foreground)
    - `Separator`: 視覺分隔線。
    - **內容格子 (Cards/Divs)**:
        - **🎯 平台初衷**: 說明對話模擬的重要性。
        - **💡 我們相信**: 強調 AI 模擬與專家回饋的價值。
        - **🌱 五大 SEL 核心能力**: CASEL 標準列表 (自我覺察、自我管理、社交意識、人際技巧、負責決策)。
        - **🔧 如何運作**: 操作步驟簡述。

## 3. 交互邏輯 (User Flow & Interactions)
- 此頁面以 **資訊呈現 (Read-only)** 為主。
- **導航**: 用戶點選 `HamburgerMenu` 跳轉至其他核心功能 (如「對話空間」、「歷史紀錄」)。

## 4. 數據需求 (Data Requirements)
- **User Object**: 目前為 Mock Data (`{ name: "User", avatar: "" }`)，未來可與 Context/Redux 整合。
- **靜態內容**: 平台的文案內容硬編碼在組件中。
