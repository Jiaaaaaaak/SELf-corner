import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user data
  const user = {
    name: "User",
    avatar: "",
    usageCount: 8,
  };

  // Mock history data
  const historyItems = [
    { id: 1, date: "2026-02-01", topic: "數學課程" },
    { id: 2, date: "2026-01-30", topic: "物理課程" },
    { id: 3, date: "2026-01-28", topic: "化學課程" },
  ];

  const filteredHistory = historyItems.filter(
    (item) => item.topic.toLowerCase().includes(searchQuery.toLowerCase()) || item.date.includes(searchQuery),
  );

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background p-6">
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
        <div className="text-center">
          <div className="text-sm text-muted-foreground">使用次數</div>
          <div className="text-2xl font-semibold">{user.usageCount}</div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Content - History */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">History</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋歷史紀錄..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="space-y-2">
              {filteredHistory.map((item) => (
                <div key={item.id} className="py-2 border-b border-dashed border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                  <span className="ml-4">{item.topic}</span>
                </div>
              ))}
              {filteredHistory.length === 0 && searchQuery && (
                <div className="py-2 text-muted-foreground text-sm">找不到符合的紀錄</div>
              )}
              {/* Empty placeholder rows */}
              {[...Array(Math.max(0, 5 - filteredHistory.length))].map((_, i) => (
                <div key={`empty-${i}`} className="py-2 border-b border-dashed border-border">
                  <span className="text-muted-foreground/30">---</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar - Action Buttons */}
        <div className="w-32 space-y-3 flex flex-col justify-center">
          <Button variant="outline" className="w-full justify-center h-12" onClick={() => navigate("/chatroom")}>
            開始對話
          </Button>
          <Button variant="outline" className="w-full justify-center h-12">
            使用說明
          </Button>
          <div className="flex-1" />
          <Button variant="outline" className="w-full justify-center h-12" onClick={handleLogout}>
            離開
          </Button>
        </div>
      </div>
    </div>
  );
}
