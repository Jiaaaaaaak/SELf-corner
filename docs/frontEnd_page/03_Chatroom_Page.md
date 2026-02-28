# 對話空間頁面 (Chatroom Page IA)

`/chatroom` 是專案的核心功能頁面，模擬真實教室場景與虛擬學生進行對話練習。

## 1. 頁面功能 (Functions)
- **情境選擇**: 從六組隨機挑選的情境卡片中選擇一個練習。
- **隨機挑戰**: 系統自動選取情境。
- **換一批**: 刷新顯示的情境列表。
- **對話模擬**: 與 AI 虛擬學生進行文字互動。
- **狀態控制**: 暫停/繼續對話、結束對話跳轉回饋。
- **使用說明**: 展示操作指引彈窗。

## 2. 頁面組件與布局 (IA Hierarchy)
- **頂部工具欄 (Header)**:
    - `HamburgerMenu`: 跨頁面導航。
    - **標題**: "對話空間"。
    - `Button`: 使用說明 (HelpCircle icon)。

- **主舞台 (Main Area - relative, overflow-hidden)**:
    - **背景圖**: 教室背景圖片。
    - **暫停遮罩**: 當 `isPaused` 為真時顯示的半透明層。
    - **場景選擇層 (Scenario Selection)**: (僅在未開始對話時顯示)
        - `RefreshCw` 按鈕: 換一批情境。
        - **情境卡片網格 (ScenarioCard Grid)**: 顯示 6 張卡片。
        - **隨機卡片**: 虛線邊框的特殊卡片。
    - **場景詳細層 (ScenarioDetail)**: (選中特定情境後顯示，覆蓋式彈窗)
        - Emoji, Title, Tag, Description。
        - `Button`: 開始對話。
    - **隨機確認層 (RandomConfirm)**: (點選隨機後顯示)。

- **對話進行層 (Session Active)**: (在開始對話後顯示)
    - **學生視覺像 (Student Avatar)**: 置中顯示圓形 Avatar 及其狀態 (😶/🧑‍🎓)。
    - **對話面板 (ChatPanel)**: (位於底部 1/4)
        - `ScrollArea`: 訊息對話框 (老師/學生兩側氣泡)。
        - **輸入行**:
            - `Input`: 文字輸入。
            - `Mic`: 語音切換模擬。
            - `Send`: 發送訊息。
            - `Pause/Play`: 切換暫停狀態。
            - `LogOut`: 結束對話。

## 3. 交互邏輯 (User Flow & Interactions)
- **流程**: 選擇情境 -> 檢視詳情 -> 開始對話 -> 對話進行 -> 結束對話 (導向 `/feedback`)。
- **Mock 回應**: 當老師發送訊息後，系統在 1.5 秒後自動產生學生的模擬回應。
- **暫停邏輯**: 當 `isPaused` 時，背景變暗且輸入框停用。

## 4. 數據需求 (Data Requirements)
- **全域情境庫**: `allScenarios` 數組。
- **State**:
    - `isStarted`: 是否已進入對話模式。
    - `isPaused`: 當前對話是否暫停。
    - `selectedScenarioId`: 當前選中的情境。
    - `displayedScenarios`: 當前畫面上顯示的 6 個情境 (由 `pickRandomScenarios` 產生)。
    - `messages`: 對話記錄陣列 (`role`, `content`)。
