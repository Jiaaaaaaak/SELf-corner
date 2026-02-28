import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, CalendarDays, BarChart } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function History() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock history data with scores
  const historyItems = [
    { id: 1, date: "2026-02-01", topic: "考場失利後的自責", score: 85 },
    { id: 2, date: "2026-01-30", topic: "分組被落單的窘迫", score: 72 },
    { id: 3, date: "2026-01-28", topic: "被當眾誤解的憤怒", score: 88 },
    { id: 4, date: "2026-01-25", topic: "好朋友吵架的糾結", score: 91 },
    { id: 5, date: "2026-01-20", topic: "面對新環境的焦慮", score: 76 },
    { id: 6, date: "2026-02-10", topic: "承認作弊後的羞愧", score: 80 },
  ];

  const filteredHistory = historyItems.filter(
    (item) => item.topic.toLowerCase().includes(searchQuery.toLowerCase()) || item.date.includes(searchQuery),
  );

  const handleItemClick = (id: number) => {
    // In a real app, we would pass the ID to the feedback page
    navigate("/feedback");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Hamburger Menu */}
        <div className="flex items-center gap-4 mb-8">
          <HamburgerMenu />
          <h1 className="text-2xl font-bold text-foreground">歷史練習紀錄</h1>
        </div>

        <Card className="border-border/60 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="bg-card pb-4 border-b border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                過去的足跡
              </CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋情境或日期..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-full bg-background border-border/60 focus-visible:ring-primary/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <BarChart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-0.5">{item.topic}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${item.score >= 85 ? 'bg-accent/20 text-accent-foreground' : 'bg-secondary/10 text-secondary'}`}>
                      {item.score} 分
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      點擊查看報告
                    </span>
                  </div>
                </div>
              ))}
              {filteredHistory.length === 0 && (
                <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                  <Search className="h-8 w-8 opacity-20" />
                  <p>找不到符合的練習紀錄</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
