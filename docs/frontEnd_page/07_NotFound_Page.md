# 404 頁面 (Not Found Page IA)

`NotFound` 頁面在用戶訪問不存在的路由時顯示。

## 1. 頁面功能 (Functions)
- **錯誤提示**: 告知用戶頁面不存在。
- **導航導引**: 提供返回首頁的連結。

## 2. 頁面組件與布局 (IA Hierarchy)
- **容器 (Container)**: `div` (flex, min-h-screen, items-center, justify-center, bg-muted)。
- **內容區 (Content)**:
    - **標題**: "404" (text-4xl, font-bold)。
    - **描述**: "Oops! Page not found"。
    - **行動連結**: "Return to Home" (underline, hover effect)。

## 3. 交互邏輯 (User Flow & Interactions)
- **日誌記錄**: 當進入此頁面時，會在控制台輸出錯誤路徑 (用於除錯)。
- **跳轉**: 點擊連結返回根路徑 (`/`)，進而觸發重定向至 `/login` 或 `/home`。

## 4. 數據需求 (Data Requirements)
- **Hooks**: `useLocation` 用於獲取當前嘗試訪問的 path。
