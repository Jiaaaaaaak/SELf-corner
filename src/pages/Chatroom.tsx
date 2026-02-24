import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shuffle, RefreshCw, Dices } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import classroomBackground from "@/assets/classroom-background.png";

// 模擬情境資料庫（未來由後端提供）
const allScenarios = [
  { id: 1, title: "考場失利後的自責", tag: "自我覺察", emoji: "📝" },
  { id: 2, title: "分組被落單的窘迫", tag: "社交意識", emoji: "👥" },
  { id: 3, title: "被當眾誤解的憤怒", tag: "自我管理", emoji: "😤" },
  { id: 4, title: "好朋友吵架的糾結", tag: "人際技巧", emoji: "🤝" },
  { id: 5, title: "面對新環境的焦慮", tag: "適應能力", emoji: "🌱" },
  { id: 6, title: "承認作弊後的羞愧", tag: "負責決策", emoji: "💭" },
  { id: 7, title: "被老師點名的緊張", tag: "自我管理", emoji: "😰" },
  { id: 8, title: "同學說謊的兩難", tag: "負責決策", emoji: "🤔" },
  { id: 9, title: "排擠他人的罪惡感", tag: "社交意識", emoji: "😔" },
  { id: 10, title: "比賽輸了的不甘心", tag: "自我覺察", emoji: "🏆" },
];

const DISPLAY_COUNT = 6;

function pickRandomScenarios(pool: typeof allScenarios, count: number) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Teaching() {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [displayedScenarios, setDisplayedScenarios] = useState(() =>
    pickRandomScenarios(allScenarios, DISPLAY_COUNT)
  );

  const handleSelectScenario = (id: number) => {
    setSelectedScenario(id);
    setIsRandomMode(false);
  };

  const handleRandomScenario = () => {
    setSelectedScenario(null);
    setIsRandomMode(true);
  };

  const handleRefreshScenarios = () => {
    setDisplayedScenarios(pickRandomScenarios(allScenarios, DISPLAY_COUNT));
    setSelectedScenario(null);
    setIsRandomMode(false);
  };

  const handleStart = () => {
    if (!isRandomMode && selectedScenario === null) return;
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
    setIsRandomMode(false);
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
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-background drop-shadow-md">選擇練習情境</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefreshScenarios}
                  title="換一批情境"
                  className="rounded-full"
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-muted-foreground mb-6">請選擇一個你想練習的對話情境</p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl w-full mb-4">
                {displayedScenarios.map((scenario) => (
                  <Card
                    key={scenario.id}
                    onClick={() => handleSelectScenario(scenario.id)}
                    className={`cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg border-2 ${
                      selectedScenario === scenario.id && !isRandomMode
                        ? "border-primary bg-card/15 backdrop-blur-md shadow-lg ring-2 ring-primary brightness-110"
                        : "border-border/60 bg-card/80 backdrop-blur-md hover:border-primary/40"
                    }`}
                  >
                    <CardContent className="p-4 text-center space-y-2">
                      <span className="text-3xl">{scenario.emoji}</span>
                      <p className={`font-medium text-sm leading-tight ${selectedScenario === scenario.id && !isRandomMode ? "text-foreground font-bold" : "text-foreground"}`}>{scenario.title}</p>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${selectedScenario === scenario.id && !isRandomMode ? "bg-primary/20 border-primary/50 text-foreground font-semibold" : "bg-muted border-border text-muted-foreground"}`}>
                        {scenario.tag}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Random Scenario Card - Centered */}
              <Card
                onClick={handleRandomScenario}
                className={`cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg border-2 border-dashed mb-5 max-w-2xl w-full ${
                  isRandomMode
                    ? "border-primary bg-card/15 backdrop-blur-md shadow-lg ring-2 ring-primary brightness-110"
                    : "border-border/60 bg-card/80 backdrop-blur-md hover:border-primary/40"
                }`}
              >
                <CardContent className="p-4 text-center space-y-2 flex flex-col items-center justify-center">
                  <Dices className={`h-7 w-7 ${isRandomMode ? "text-primary" : "text-muted-foreground"}`} />
                  <p className={`font-medium text-sm leading-tight ${isRandomMode ? "text-foreground font-bold" : "text-foreground"}`}>隨機情境</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${isRandomMode ? "bg-primary/20 border-primary/50 text-foreground font-semibold" : "bg-muted border-border text-muted-foreground"}`}>
                    驚喜挑戰
                  </span>
                </CardContent>
              </Card>

              {selectedScenario !== null && !isRandomMode && (
                <p className="text-sm text-primary font-medium animate-in fade-in">
                  ✨ 已選擇：{displayedScenarios.find((s) => s.id === selectedScenario)?.title}
                </p>
              )}
              {isRandomMode && (
                <p className="text-sm text-primary font-medium animate-in fade-in">
                  🎲 已選擇隨機情境
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
              disabled={selectedScenario === null && !isRandomMode}
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
