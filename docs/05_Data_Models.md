# 資料模型設計 (Data Models & Storage)
**專案:** AI 虛擬教師培訓平台
**狀態:** 草稿 (Draft)
**版本:** 1.1
**日期:** 2026-02-28

本文件定義了系統持久層與快取層的資料結構，以支援高效能查詢與未來的大數據分析擴展。

---

## 1. 關聯式資料庫 (PostgreSQL 15+)

主資料庫，負責儲存具備高關聯性與需要 ACID 交易保證的資料。

### 1.1 `users` 表 (使用者)
| 欄位 | 型態 | 約束/索引 | 描述 |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY` | 系統唯一識別碼 |
| `email` | `VARCHAR(255)` | `UNIQUE`, `NOT NULL`, `INDEX` | 登入帳號，需建 B-Tree 索引加速登入 |
| `password_hash`| `VARCHAR(255)` | `NOT NULL` | bcrypt 雜湊值 |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | 建立時間 |

### 1.2 `sessions` 表 (會話元資料)
| 欄位 | 型態 | 約束/索引 | 描述 |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY` | 會話唯一識別碼 |
| `user_id` | `UUID` | `FOREIGN KEY`, `INDEX` | 關聯使用者。需建索引加速歷史列表查詢 |
| `scenario_id` | `VARCHAR(100)` | `NOT NULL` | 情境範本 ID |
| `status` | `VARCHAR(20)` | `NOT NULL` | `active`, `evaluating`, `completed`, `failed` |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()`, `INDEX`| 用於排序歷史紀錄 |

### 1.3 `transcripts` 表 (對話逐字稿)
儲存原始對話，用於產生回饋與未來的模型微調。
| 欄位 | 型態 | 約束/索引 | 描述 |
|---|---|---|---|
| `id` | `BIGSERIAL` | `PRIMARY KEY` | 遞增 ID |
| `session_id` | `UUID` | `FOREIGN KEY`, `INDEX` | 關聯至 session。強依賴此索引進行回饋生成 |
| `turn_num` | `INTEGER` | `NOT NULL` | 對話輪次 (1, 2, 3...)，確保順序 |
| `speaker` | `VARCHAR(20)` | `NOT NULL` | `teacher` 或 `student` |
| `text_content` | `TEXT` | `NOT NULL` | 轉錄文字或 LLM 生成文字 |

### 1.4 `evaluations` 表 (回饋報告)
採用 `JSONB` 提供 Schema-less 的彈性，適應 AI 回饋格式可能的頻繁迭代。
| 欄位 | 型態 | 約束/索引 | 描述 |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY` | 報告 ID |
| `session_id` | `UUID` | `UNIQUE`, `FOREIGN KEY`| 一對一關聯至 session |
| `radar_metrics`| `JSONB` | `NOT NULL` | 量化分數，例如 `{"empathy": 8, "clarity": 7}` |
| `analysis` | `JSONB` | `NOT NULL` | 質化回饋與建議 |

---

## 2. 快取與狀態層 (Redis 7.x)

用於處理需極低延遲讀寫的暫時性 (Ephemeral) 資料，減輕 DB 負擔。

### 2.1 會話即時狀態 (Session State)
*   **Key 結構:** `session:{session_id}:state`
*   **資料結構:** `HASH`
*   **欄位:** 
    *   `status` (字串)
    *   `current_turn` (整數)
    *   `last_active_at` (Unix Timestamp，用於清理僵屍會話)
*   **TTL (Time-To-Live):** 2 小時 (超時自動銷毀未正常結束的會話)。

### 2.2 對話上下文緩衝區 (Context Buffer)
*   **Key 結構:** `session:{session_id}:context`
*   **資料結構:** `LIST` (Redis 雙向鏈表)
*   **應用機制:** 每次有新對話時，執行 `RPUSH`，並透過 `LTRIM` 始終保持列表長度在最新的 20 筆內。確保傳給 LLM 的 Context Window 受到嚴格控制，避免 Token 爆炸。

---

## 3. 向量資料庫 (Vector DB - RAG 應用)

選用 Chroma 或 Pinecone，用於儲存教育理論。

*   **Collection:** `educational_frameworks`
*   **Schema:**
    *   `id`: 唯一 Chunk ID。
    *   `embedding`: 1536 維向量 (對應 text-embedding-3-small)。
    *   `document`: 原始文本段落。
    *   `metadata`: `{"source": "Satir Model", "tags": ["congruence", "stances"]}` (用於過濾查詢)。

---

## 4. 容量規劃與資料保留策略 (Capacity & Retention)
*   **冷熱資料分離:** `transcripts` 表會快速膨脹。計畫實作排程任務，將超過 6 個月的舊會話與逐字稿從 PostgreSQL 搬移至廉價冷儲存 (如 AWS S3) 進行封存 (Archival)。
*   **音訊檔案:** 原始音訊檔案不進 DB，直接存入 S3/GCS，並設定 Bucket Lifecycle Rule 於 7 天後自動刪除，保障隱私。