import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const navigate = useNavigate();

  // Mock history data
  const historyItems = [
    { id: 1, date: "2026-02-01", topic: "數學課程" },
    { id: 2, date: "2026-01-30", topic: "物理課程" },
    { id: 3, date: "2026-01-28", topic: "化學課程" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-semibold mb-6">Homepage</h1>
      
      <div className="flex gap-6">
        {/* Left Sidebar - Action Buttons */}
        <div className="w-48 space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start h-12"
            onClick={() => navigate("/teaching")}
          >
            開始教課
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-12"
          >
            使用說明
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-12"
          >
            個人資料
          </Button>
        </div>

        {/* Right Content - History */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">History</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="space-y-2">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="py-2 border-b border-dashed border-border last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                  <span className="ml-4">{item.topic}</span>
                </div>
              ))}
              {/* Empty placeholder rows */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="py-2 border-b border-dashed border-border"
                >
                  <span className="text-muted-foreground/30">---</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
