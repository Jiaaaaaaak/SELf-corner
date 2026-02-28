# 專家回饋頁面 (Feedback Page IA)

`/feedback` 頁面在對話模擬結束後顯示，提供深度指標分析與後續練習建議。

## 1. 頁面功能 (Functions)
- **SEL 指標分析**: 以雷達圖展示五大 SEL 核心能力的得分。
- **專家回饋**: 提供針對該次對話的具體優化建議與實作方針。
- **回顧討論**: 用戶可針對回饋內容與 AI 教育顧問進行進一步詢問。
- **對話紀錄檢視**: 提供「完整對話」與「分開檢視 (老師/學生)」兩種視角。
- **後續動作**: 重試一次 (回對話空間) 或回首頁。

## 2. 頁面組件與布局 (IA Hierarchy)
- **頂部佈局 (Grid - 3 columns)**:
    - **左側 (Radar Chart)**:
        - `ResponsiveContainer` + `RadarChart`: 視覺化五力指標。
        - `Button` 組: "重試一次"、"回首頁"。
    - **中間 (Feedback Content)**:
        - `ScrollArea`: 渲染專家文案 (文字內容豐富)。
    - **右側 (AI Coach Chat)**:
        - 對話框樣式，上方訊息紀錄，下方 `Textarea` 輸入與 `Button`。

- **底部對話紀錄 (Bottom Section)**:
    - `Tabs`: 導覽列切換。
    - **完整對話 (combined)**: 氣泡式排列，老師置右、學生置左。
    - **分開檢視 (separate)**: 對等式的左右兩欄布局。

## 3. 交互邏輯 (User Flow & Interactions)
- **雷達圖渲染**: 依據 `radarData` 繪製 Recharts 圖表。
- **對話對話**: 用戶在輸入框輸入後，可模擬與專家進一步討論。
- **紀錄切換**: 使用 `Tabs` 組件流暢切換不同的顯示模式。
- **滾動控制**: 全頁面由 `ScrollArea` 包裹，確保各區塊在小螢幕下的閱讀性。

## 4. 數據需求 (Data Requirements)
- **radarData**: 雷達圖數據。
- **defaultTranscript**: 對話完整逐字稿。
- **defaultExpertFeedback**: 長篇 Markdown/String 文案。
- **defaultChatHistory**: 與 AI 顧問的對話紀錄。
- **State**: `userInput` (AI 顧問對話框用)。
