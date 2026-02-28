# API 規格文件 (API Specification)
**專案:** AI 虛擬教師培訓平台
**狀態:** 草稿 (Draft)
**版本:** 1.1
**日期:** 2026-02-28

## 1. 共通規格 (Common Specifications)

*   **Base URL:** `https://api.example.com/api/v1`
*   **資料格式:** 請求與回應預設採用 `application/json`。
*   **授權機制 (Authentication):** 除非特別註明，所有 API 皆需要在 HTTP Header 中夾帶 JWT：`Authorization: Bearer <token>`
*   **速率限制 (Rate Limiting):** 為防止濫用，API 預設採用 Token Bucket 演算法，限制每 IP 每分鐘 100 次請求。
*   **標準錯誤回應 (RFC 7807 Problem Details 變體):**
    ```json
    {
      "error": {
        "code": "INVALID_REQUEST",
        "message": "無效的請求參數",
        "details": [
          {"field": "scenarioId", "issue": "欄位不可為空"}
        ]
      }
    }
    ```

---

## 2. 身份認證 (Auth)

### POST `/auth/login`
*   **描述:** 驗證使用者憑證並核發 JWT。
*   **Request:**
    ```json
    {
      "email": "teacher@school.edu",
      "password": "secure_password_string"
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "data": {
        "accessToken": "eyJhbG...",
        "expiresIn": 3600,
        "user": { "id": "uuid", "email": "teacher@school.edu" }
      }
    }
    ```
*   **Response (401 Unauthorized):** 憑證無效。

---

## 3. 會話管理 (Sessions)

### POST `/sessions/start`
*   **描述:** 初始化模擬情境，配置虛擬學生人設，並分配 WebSocket 房間。
*   **Request:**
    ```json
    {
      "scenarioId": "scenario-101",
      "studentPersona": "defiant" 
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "data": {
        "sessionId": "ses-abc-123",
        "websocketUrl": "wss://api.example.com/ws/v1/sessions/ses-abc-123/stream"
      }
    }
    ```

### POST `/sessions/{sessionId}/end`
*   **描述:** 終止會話，結算歷史紀錄，並非同步派發任務給 Evaluator Agent 進行評估。
*   **Response (202 Accepted):** 表示已接受請求，評估作業正在背景執行中。

---

## 4. 歷史與回饋 (History & Feedback)

### GET `/sessions`
*   **描述:** 取得使用者的歷史練習清單。支援分頁機制 (Pagination)。
*   **Query Parameters:**
    *   `page` (int, default: 1)
    *   `limit` (int, default: 20)
*   **Response (200 OK):**
    ```json
    {
      "data": [
        {
          "sessionId": "ses-abc-123",
          "scenarioName": "應對課堂干擾",
          "createdAt": "2026-02-28T10:00:00Z",
          "status": "completed",
          "overallScore": 82
        }
      ],
      "meta": { "totalItems": 45, "totalPages": 3, "currentPage": 1 }
    }
    ```

### GET `/sessions/{sessionId}/feedback`
*   **描述:** 取得單場會話的專家評估詳細報告。
*   **Response (200 OK):**
    ```json
    {
      "data": {
        "sessionId": "ses-abc-123",
        "transcript": [
          { "speaker": "teacher", "text": "請回到座位上。" },
          { "speaker": "student", "text": "我不要！" }
        ],
        "metrics": {
          "empathy": 7.5,
          "firmness": 8.0,
          "satirCongruence": 6.5
        },
        "qualitative": {
          "summary": "教師展現了良好的界線，但同理心可再加強。",
          "actionableAdvice": ["嘗試先說出學生的感受，例如：『我知道你現在很生氣』。"]
        }
      }
    }
    ```
*   **Response (404 Not Found):** 會話不存在或尚未完成評估。
*   **Response (403 Forbidden):** 試圖存取非本人的會話報告。