import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shuffle } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import classroomBackground from "@/assets/classroom-background.png";

const scenarios = [
  { id: 1, title: "考場失利後的自責", tag: "自我覺察", emoji: "📝" },
  { id: 2, title: "分組被落單的窘迫", tag: "社交意識", emoji: "👥" },
  { id: 3, title: "被當眾誤解的憤怒", tag: "自我管理", emoji: "😤" },
  { id: 4, title: "好朋友吵架的糾結", tag: "人際技巧", emoji: "🤝" },
  { id: 5, title: "面對新環境的焦慮", tag: "適應能力", emoji: "🌱" },
  { id: 6, title: "承認作弊後的羞愧", tag: "負責決策", emoji: "💭" },
];

export default function Teaching() {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  const handleSelectScenario = (id: number) => {
    setSelectedScenario(id);
  };

  const handleRandomScenario = () => {
    const randomId = scenarios[Math.floor(Math.random() * scenarios.length)].id;
    setSelectedScenario(randomId);
  };

  const handleStart = () => {
    if (selectedScenario === null) return;
    setIsStarted(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleEnd = () => {
    setIsStarted(false);
    setIsPaused(false);
    setSelectedScenario(null);
    navigate("/feedback");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header with Hamburger Menu */}
      <div className="flex items-center gap-4 mb-4">
        <HamburgerMenu />
        <h1 className="text-xl font-semibold">對話空間</h1>
      </div>

      <div className="flex gap-6 h-[calc(100vh-7rem)]">
        {/* Main Content Area - Classroom Background */}
        <div className="flex-1 rounded-lg overflow-hidden relative">
          <img
            src={classroomBackground}
            alt="教室背景"
            className="w-full h-full object-cover"
          />

          {/* Scenario Selection Overlay (before start) */}
          {!isStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">選擇練習情境</h2>
              <p className="text-muted-foreground mb-6">請選擇一個你想練習的對話情境</p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl w-full mb-5">
                {scenarios.map((scenario) => (
                  <Card
                    key={scenario.id}
                    onClick={() => handleSelectScenario(scenario.id)}
                    className={`cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg border-2 ${
                      selectedScenario === scenario.id
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border/60 bg-card/80 backdrop-blur-md hover:border-primary/40"
                    }`}
                  >
                    <CardContent className="p-4 text-center space-y-2">
                      <span className="text-3xl">{scenario.emoji}</span>
                      <p className="font-medium text-foreground text-sm leading-tight">{scenario.title}</p>
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {scenario.tag}
                      </span>
                    </CardContent>
                  </Card>
                ))}

                {/* Random Scenario Card */}
                <Card
                  onClick={handleRandomScenario}
                  className={`cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg border-2 border-dashed border-border/60 bg-card/80 backdrop-blur-md hover:border-primary/40`}
                >
                  <CardContent className="p-4 text-center space-y-2 flex flex-col items-center justify-center">
                    <Shuffle className="h-7 w-7 text-muted-foreground" />
                    <p className="font-medium text-foreground text-sm leading-tight">隨機情境</p>
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      驚喜挑戰
                    </span>
                  </CardContent>
                </Card>
              </div>

              {selectedScenario !== null && (
                <p className="text-sm text-primary font-medium animate-in fade-in">
                  ✨ 已選擇：{scenarios.find((s) => s.id === selectedScenario)?.title}
                </p>
              )}
            </div>
          )}

          {/* In-session status overlay */}
          {isStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/30">
              <span className="text-foreground font-medium text-lg">
                {isPaused ? "已暫停" : "教學進行中..."}
              </span>
            </div>
          )}
        </div>

        {/* Right Sidebar - Control Buttons */}
        <div className="w-24 flex flex-col gap-3 justify-center">
          {!isStarted ? (
            <Button
              variant="outline"
              className="h-14"
              onClick={handleStart}
              disabled={selectedScenario === null}
            >
              開始
            </Button>
          ) : (
            <Button variant="outline" className="h-14" onClick={handlePause}>
              {isPaused ? "繼續" : "暫停"}
            </Button>
          )}

          <Button variant="outline" className="h-14">
            設定
          </Button>

          <Button variant="outline" className="h-14">
            說明
          </Button>

          <Button variant="outline" className="h-14" onClick={handleEnd} disabled={!isStarted}>
            結束
          </Button>
        </div>
      </div>
    </div>
  );
}
