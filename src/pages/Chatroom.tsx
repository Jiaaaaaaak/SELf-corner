import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dices, RefreshCw, HelpCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HamburgerMenu from "@/components/HamburgerMenu";
import ScenarioCard from "@/components/chatroom/ScenarioCard";
import ScenarioDetail from "@/components/chatroom/ScenarioDetail";
import RandomConfirm from "@/components/chatroom/RandomConfirm";
import ChatPanel from "@/components/chatroom/ChatPanel";
import classroomBackground from "@/assets/classroom-background.png";

const allScenarios = [
  { id: 1, title: "考場失利後的自責", tag: "自我覺察", emoji: "📝", description: "學生在一次重要考試中表現不佳，感到極度自責和沮喪。他開始質疑自己的能力，甚至不想再上學。作為老師，你需要引導他認識情緒、接納失敗，並重建自信。" },
  { id: 2, title: "分組被落單的窘迫", tag: "社會覺察", emoji: "👥", description: "班上分組活動時，有一位學生總是最後一個被選或直接被遺漏。他表面上裝作無所謂，但內心其實很受傷。你需要幫助他理解社交動態，並找到融入團體的方式。" },
  { id: 3, title: "被當眾誤解的憤怒", tag: "自我管理", emoji: "😤", description: "學生在課堂上被同學誤解並當眾指責，他非常憤怒，差點失控動手。你需要在這個情緒高漲的時刻幫助他冷靜下來，學習如何管理憤怒情緒。" },
  { id: 4, title: "好朋友吵架的糾結", tag: "人際技巧", emoji: "🤝", description: "兩個好朋友因為一件小事吵架了，其中一位來找你傾訴。他既想和好，又覺得委屈。你需要引導他學習溝通技巧，修復友誼關係。" },
  { id: 5, title: "面對新環境的焦慮", tag: "自我覺察", emoji: "🌱", description: "學生剛轉學到新班級，對陌生的環境和同學感到極度焦慮。他不敢主動交朋友，午餐時間總是一個人。你需要幫助他建立安全感，逐步適應新環境。" },
  { id: 6, title: "承認作弊後的羞愧", tag: "負責決策", emoji: "💭", description: "學生在考試中作弊被發現，他感到非常羞愧，不知道如何面對老師和同學。你需要引導他理解誠實的重要性，並幫助他做出負責任的決定。" },
];

const DISPLAY_COUNT = 6;

function pickRandomScenarios(pool: typeof allScenarios, count: number) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Chatroom() {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [studentEmotion, setStudentEmotion] = useState<"neutral" | "angry" | "sad" | "thinking">("neutral");
  const [selectedScenarioId, setSelectedScenarioId] = useState<number | null>(null);
  const [showRandomConfirm, setShowRandomConfirm] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [displayedScenarios, setDisplayedScenarios] = useState(() =>
    pickRandomScenarios(allScenarios, DISPLAY_COUNT)
  );

  const selectedScenario = allScenarios.find((s) => s.id === selectedScenarioId) || null;

  const handleCardClick = (id: number) => {
    setSelectedScenarioId(id);
  };

  const handleRandomClick = () => {
    setShowRandomConfirm(true);
  };

  const handleRefresh = () => {
    setDisplayedScenarios(pickRandomScenarios(allScenarios, DISPLAY_COUNT));
  };

  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
    setSelectedScenarioId(null);
    setShowRandomConfirm(false);
  };

  const handleCloseDetail = () => {
    setSelectedScenarioId(null);
    setShowRandomConfirm(false);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleEnd = () => {
    navigate("/feedback");
  };

  const renderStudentAvatar = () => {
    if (isPaused) return "⏸️";
    switch (studentEmotion) {
      case "angry": return "😤";
      case "sad": return "🥺";
      case "thinking": return "🤔";
      default: return "🧑‍🎓";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <HamburgerMenu />
          <h1 className="text-xl font-semibold text-foreground">對話空間</h1>
          {isStarted && (
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPaused ? 'bg-muted-foreground' : 'bg-primary'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isPaused ? 'bg-muted-foreground' : 'bg-primary'}`}></span>
              </span>
              {isPaused ? "已暫停" : "對話進行中"}
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={() => setHelpOpen(true)} className="rounded-full">
          <HelpCircle className="h-4 w-4 mr-1" />
          使用說明
        </Button>
      </div>

      {/* Main Area */}
      <div className="flex-1 rounded-2xl overflow-hidden relative border border-border shadow-sm bg-card">
        {/* Replace with actual image later, using a warm solid fallback for now */}
        <div className={`absolute inset-0 bg-[#E9E5D9] transition-all duration-500 ${isPaused ? "opacity-60" : "opacity-100"}`}>
          <img
            src={classroomBackground}
            alt="教室背景"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>

        {/* Paused overlay */}
        {isStarted && isPaused && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 bg-card p-6 rounded-2xl shadow-lg border border-border">
              <AlertCircle className="h-12 w-12 text-muted-foreground" />
              <span className="text-foreground font-bold text-xl">對話已暫停</span>
              <p className="text-sm text-muted-foreground">深呼吸，整理一下思緒吧！</p>
            </div>
          </div>
        )}

        {/* Scenario Selection (before start) */}
        {!isStarted && !selectedScenario && !showRandomConfirm && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md p-8 overflow-y-auto">
            <div className="flex items-center gap-3 mb-2 animate-in slide-in-from-top-4">
              <h2 className="text-2xl font-bold text-foreground">選擇練習情境</h2>
              <Button variant="ghost" size="icon" onClick={handleRefresh} className="rounded-full text-muted-foreground hover:text-primary" title="換一批情境">
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-8">選擇一個你曾在課堂上遇到，或感到棘手的學生情緒事件。</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full mb-6">
              {displayedScenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} onClick={handleCardClick} />
              ))}
            </div>

            {/* Random card */}
            <Card
              onClick={handleRandomClick}
              className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-dashed border-primary/40 bg-card/80 backdrop-blur-md hover:border-primary hover:bg-primary/5 max-w-4xl w-full mt-2"
            >
              <CardContent className="p-6 text-center space-y-3 flex flex-col items-center justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Dices className="h-8 w-8 text-primary" />
                </div>
                <p className="font-bold text-lg text-foreground">隨機情境挑戰</p>
                <p className="text-sm text-muted-foreground">不知道從何開始？讓系統為你挑選一個挑戰吧！</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Flipped scenario detail */}
        {!isStarted && selectedScenario && (
          <ScenarioDetail scenario={selectedScenario} onClose={handleCloseDetail} onStart={handleStart} />
        )}

        {/* Random confirm */}
        {!isStarted && showRandomConfirm && (
          <RandomConfirm onClose={handleCloseDetail} onStart={handleStart} />
        )}

        {/* Virtual student during session */}
        {isStarted && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] flex flex-col items-center z-0 transition-transform duration-500 hover:scale-105">
              <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center text-7xl shadow-xl bg-card transition-colors duration-300 ${isPaused ? 'border-muted' : 'border-primary/50 bg-background'}`}>
                {renderStudentAvatar()}
              </div>
              <div className="mt-4 flex flex-col items-center gap-1 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-border">
                <span className="text-sm font-bold text-foreground">
                  虛擬學生
                </span>
                <span className="text-xs text-muted-foreground">
                  {studentEmotion === "thinking" ? "思考中..." : "聆聽中"}
                </span>
              </div>
            </div>

            {/* Chat Panel */}
            <ChatPanel 
              isPaused={isPaused} 
              onTogglePause={handleTogglePause} 
              onEnd={handleEnd}
              onEmotionChange={(emo) => setStudentEmotion(emo as any)} 
            />
          </>
        )}
      </div>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>對話空間使用說明</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>歡迎來到安全的練習角落！這裡是你與虛擬學生互動的沙盒：</p>
            <ul className="space-y-3">
              <li className="flex gap-2"><span className="text-primary font-bold">1.</span> 選擇一個情境卡片，或點擊隨機挑戰。</li>
              <li className="flex gap-2"><span className="text-primary font-bold">2.</span> 對話開始後，你可以點擊麥克風講話，或輸入文字。</li>
              <li className="flex gap-2"><span className="text-primary font-bold">3.</span> 觀察學生的表情變化（平靜、生氣、難過等），試著用同理心回應。</li>
              <li className="flex gap-2"><span className="text-primary font-bold">4.</span> 隨時可以按「暫停」休息，準備好再繼續。</li>
              <li className="flex gap-2"><span className="text-primary font-bold">5.</span> 結束後，系統會提供 Satir 與 SEL 的專家回饋。</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
