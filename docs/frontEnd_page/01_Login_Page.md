# 登入頁面 (Login Page IA)

`/login` 頁面提供用戶身份驗證與帳號建立的入口。

## 1. 頁面功能 (Functions)
- **登入**: 用戶使用帳號/密碼進行身份驗證。
- **Google 登入**: 第三方 OAuth 模擬 (預留)。
- **註冊**: 開放新用戶建立帳號 (含格式檢查)。
- **忘記密碼**: 發送密碼重設郵件模擬。

## 2. 頁面組件與布局 (IA Hierarchy)
- **容器 (Container)**: `div` (min-h-screen, bg-background, flex-center)
    - **登入卡片 (Card)**:
        - **標題 (CardHeader)**: "登入" (text-2xl)
        - **內容 (CardContent)**:
            - **表單 (form)**:
                - `Input`: 帳號 (account)
                - `Input`: 密碼 (password) + 顯示/隱藏切換 (Eye/EyeOff)
                - `Button`: 登入 (Submit)
                - **連結群組**: "註冊" | "忘記密碼" (Button/span)
                - `Separator` (視覺上): 或透過樣式區隔
                - `Button`: Login with Google (outline)

- **註冊彈窗 (Dialog: Register)**:
    - **標題**: "註冊"
    - **表單內容**:
        - `Input`: 用戶名 (regUsername)
        - `Input`: 姓 (regLastName)
        - `Input`: 名 (regFirstName)
        - `Input`: 電子信箱 (regEmail)
        - `Input`: 密碼 (regPassword) + 顯示/隱藏切換
        - `Input`: 確認密碼 (regConfirmPassword) + 顯示/隱藏切換
    - **頁腳**: `Button`: 註冊

- **忘記密碼彈窗 (Dialog: Forgot Password)**:
    - **標題**: "忘記密碼"
    - **描述**: 引導文字 (請輸入電子信箱...)
    - **內容**: `Input`: 電子信箱
    - **頁腳**: `Button`: 發送驗證信

## 3. 交互邏輯 (User Flow & Interactions)
- **成功登入**: 導向 `/home`。
- **密碼可視性切換**: 本地狀態 (`showLoginPassword`, `showRegPassword` 等)。
- **註冊驗證**: 
    - 檢查必填欄位。
    - 信箱格式驗證 (RegEx)。
    - 密碼強度驗證 (至少10字元且含英文字母)。
    - 密碼與確認密碼是否一致。
- **彈窗控制**: 本地狀態 (`registerOpen`, `forgotOpen`)。

## 4. 數據需求 (Data Requirements)
- **State**:
    - `account`, `password`: 登入欄位。
    - `regUsername`, `regLastName`, `regFirstName`, `regEmail`, `regPassword`, `regConfirmPassword`: 註冊欄位。
    - `forgotEmail`: 忘記密碼欄位。
    - `regErrors`: 註冊錯誤訊息集合。
