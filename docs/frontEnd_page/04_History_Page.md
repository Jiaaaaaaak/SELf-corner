# 歷史紀錄頁面 (History Page IA)

`/history` 頁面用於回溯用戶過去在平台上進行過的對話紀錄。

## 1. 頁面功能 (Functions)
- **紀錄列表**: 列出所有歷史練習的日期與主題。
- **搜尋過濾**: 透過主題關鍵字或日期快速查找。
- **詳情查閱**: (預留) 未來可點擊跳轉至該次對話的詳細回饋。

## 2. 頁面組件與布局 (IA Hierarchy)
- **標題區 (Header)**:
    - `HamburgerMenu`: 導航。
    - **標題**: "歷史紀錄" (text-2xl)。

- **內容卡片 (Card)**:
    - **卡片標題**: "所有紀錄"。
    - **搜尋欄**: `Input` + `Search` icon (pl-9 樣式)。
    - **列表區**:
        - 循環渲染 `div` (py-3, border-b)。
        - **左側**: 日期 (`text-muted-foreground`)。
        - **右側**: 對話主題。
    - **空狀態**: 當找不到符合項目的提示。

## 3. 交互邏輯 (User Flow & Interactions)
- **即時搜尋**: 使用 `filter` 函數對 Mock Data 進行即時過濾，響應 `searchQuery` 狀態的變化。
- **視覺交互**: 列表項目具備 `hover:bg-muted/50` 及 `cursor-pointer` 提示。

## 4. 數據需求 (Data Requirements)
- **State**:
    - `searchQuery`: 搜尋關鍵字字串。
- **Mock Data**: `historyItems` 陣列。
    - 欄位：`id`, `date`, `topic`。
