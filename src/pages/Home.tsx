import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Home() {
  const navigate = useNavigate();
  const [instructionOpen, setInstructionOpen] = useState(false);

  // Mock user data
  const user = {
    name: "User",
    avatar: "",
    usageCount: 8,
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background p-6 max-w-5xl mx-auto">
      {/* Header with Hamburger Menu, Avatar, Greeting and Usage Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <HamburgerMenu />
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-lg">hi, {user.name}</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Content - Empty */}
        <Card className="flex-1">
          <CardContent className="p-6" />
        </Card>

        {/* Right Sidebar - Action Buttons */}
        <div className="w-32 space-y-3 flex flex-col justify-center">
          <Button variant="outline" className="w-full justify-center h-12" onClick={() => navigate("/chatroom")}>
            開始對話
          </Button>
          <Button variant="outline" className="w-full justify-center h-12" onClick={() => setInstructionOpen(true)}>
            使用說明
          </Button>
          <div className="text-center py-2">
            <div className="text-sm text-muted-foreground">使用次數</div>
            <div className="text-2xl font-semibold">{user.usageCount}</div>
          </div>
          <div className="flex-1" />
          <Button variant="outline" className="w-full justify-center h-12" onClick={handleLogout}>
            登出
          </Button>
        </div>
      </div>

      <Dialog open={instructionOpen} onOpenChange={setInstructionOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>使用說明</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>歡迎使用本系統！以下是基本操作說明：</p>
            <ul className="list-disc list-inside space-y-2">
              <li>首頁：查看您的使用紀錄和基本資訊</li>
              <li>歷史紀錄：瀏覽過去的對話記錄</li>
              <li>個人資料：管理您的帳戶設定</li>
              <li>對話空間：開始新的教學對話</li>
            </ul>
            <p>如有任何問題，請聯繫客服支援。</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
