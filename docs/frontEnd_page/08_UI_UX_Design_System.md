# UI/UX 設計系統與網站架構 (UI/UX Design System & Sitemap)

基於「AI 虛擬教師培訓平台 (SELf-corner)」的產品需求文件 (PRD) 與系統架構，本文件定義了平台的 UI/UX 設計風格、網站架構 (Sitemap) 以及核心使用流程。設計的核心目標是營造一個「安全、溫暖、具同理心」的沙盒環境，讓教師能安心練習薩提爾 (Satir) 與社會情緒學習 (SEL) 的對話技巧。

## 1. 網站架構 (Sitemap)

系統採單頁應用 (SPA) 設計，架構扁平以減少認知負擔。

```text
SELf-corner (AI Virtual Teacher Training Platform)
├── /login        (登入與註冊) - 溫暖的歡迎頁面，強調「安全的練習空間」
├── /home         (首頁/大廳) - 平台願景、SEL/Satir 核心理念、功能導覽
├── /chatroom     (對話空間) - 核心練習沙盒 (MVP P0)
│   ├── 情境選擇 (Scenario Selection) - 提供不同難度與學生人設的情境卡片
│   └── 模擬對話 (Active Session) - 包含 2D 虛擬學生表情、語音/文字輸入、會話控制(暫停/結束)
├── /feedback     (專家回饋) - 評估儀表板
│   ├── SEL/Satir 雷達圖 (Radar Chart) - 視覺化能力指標
│   ├── 專家建議 (Actionable Advice) - 質化回饋與「原本怎麼說更好」
│   └── 逐字稿與對話回顧 (Transcript)
├── /history      (歷史紀錄) - 過去練習的進步軌跡與分數 (MVP P0)
└── /info         (個人資料) - 教師帳號管理與練習統計
```

## 2. 設計語言與視覺風格 (Design Language)

### 2.1 核心概念：溫暖、和諧、安全感
教師在面對學生情緒或練習應對技巧時，往往帶有壓力。因此，UI 必須消除「冰冷科技感」，改以「自然、大地、柔和」的視覺元素為主。

*   **形狀 (Shapes):** 大量使用圓角 (Soft Corners, `radius: 0.75rem`) 與卡片式設計，避免銳利邊緣。
*   **陰影 (Shadows):** 採用柔和、擴散的陰影 (`shadow-lg` 與 `shadow-card`)，創造輕盈的層次感，而非生硬的框線。
*   **字體 (Typography):**
    *   標題 (Headings): 使用圓潤的無襯線體 (如 Roboto) 或帶有溫度感的字體。
    *   內文 (Body): 確保高對比度且易讀的字體大小，減輕視覺疲勞。

### 2.2 色彩計畫 (Color Palette - 溫暖大地色系)
捨棄傳統科技平台的冷藍色調，改用大地色系 (Earth Tones)。

*   **背景色 (Background):** `Warm Sand` (暖沙白 / #FAF9F6) - 提供柔和不刺眼的基底。
*   **主色調 (Primary):** `Terracotta` (陶土橘 / #E07A5F) - 象徵熱情、活力與同理心，用於主要按鈕 (CTA) 與重要提示。
*   **輔助色 (Secondary):** `Sage Green` (鼠尾草綠 / #81B29A) - 象徵成長、平靜與安穩，用於次要操作或成功提示。
*   **點綴色 (Accent):** `Soft Gold` (柔和金 / #F2CC8F) - 用於強調特定指標或高分回饋。
*   **文字與深色 (Foreground):** `Dark Espresso` (深咖 / #3D3831) - 取代純黑，使對比不那麼銳利，閱讀更舒適。

### 2.3 互動與動畫 (Micro-interactions)
*   **會話進行中:** 當 AI 正在生成回應或處理語音時，前端需提供「優雅降級」的「思考中」動畫 (如柔和的脈衝波動)，減緩等待的焦慮感 (對應 PRD NFR 可用性要求)。
*   **虛擬人設表情 (Avatar Emotion):** 2D 虛擬學生需根據 LLM 傳回的 `emotion` 標籤 (如：平靜、憤怒、沮喪) 進行平滑的表情切換過渡。
*   **語音輸入反饋 (VAD):** 當教師講話時，麥克風按鈕應有視覺上的音量波動反饋。

## 3. 核心頁面 UI/UX 改造重點

1.  **登入頁 (Login):** 增加一句溫暖的 Slogan：「每個老師，都需要一個能安心犯錯的角落。」
2.  **首頁 (Home):** 明確列出 Satir (薩提爾) 的冰山理論與 SEL 五大能力，讓使用者在練習前進入正確的心智模型。
3.  **對話空間 (Chatroom):**
    *   必須具備「開始/暫停/結束」的明顯控制區 (對應 PRD FR-2)。
    *   支援語音 (Mic) 與文字雙軌輸入 (對應 PRD FR-3)。
    *   視覺焦點應放在「學生狀態 (情緒)」與「對話流」上。
4.  **回饋頁 (Feedback):**
    *   將冰冷的數據轉化為具體的「成長建議」。
    *   雷達圖標示 Satir (一致性) 與 SEL 指標。
    *   提供「One-click 再練一次」按鈕 (對應 PRD FR-6)。
