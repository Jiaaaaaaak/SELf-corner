import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classroomBg from "@/assets/classroom-background.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dices,
  RefreshCw,
  HelpCircle,
  AlertCircle,
  Menu,
  MessageCircle,
  Radar,
  CirclePause,
  CirclePlay,
  LogOut,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import ScenarioCard from "@/components/chatroom/ScenarioCard";
import ScenarioDetail from "@/components/chatroom/ScenarioDetail";
import RandomConfirm from "@/components/chatroom/RandomConfirm";
import ChatPanel from "@/components/chatroom/ChatPanel";

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
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [studentEmotion, setStudentEmotion] = useState<"neutral" | "angry" | "sad" | "thinking">("neutral");
  const [selectedScenarioId, setSelectedScenarioId] = useState<number | null>(null);
  const [showRandomConfirm, setShowRandomConfirm] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [displayedScenarios, setDisplayedScenarios] = useState(() =>
    pickRandomScenarios(allScenarios, DISPLAY_COUNT)
  );

  // Live timer
  useEffect(() => {
    if (!isStarted || isPaused) return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isStarted, isPaused]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const selectedScenario = allScenarios.find((s) => s.id === selectedScenarioId) || null;

  const handleCardClick = (id: number) => setSelectedScenarioId(id);
  const handleRandomClick = () => setShowRandomConfirm(true);
  const handleRefresh = () => setDisplayedScenarios(pickRandomScenarios(allScenarios, DISPLAY_COUNT));

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

  const handleTogglePause = () => setIsPaused(!isPaused);
  const handleEnd = () => navigate("/feedback");

  const renderStudentAvatar = () => {
    if (isPaused) return "⏸️";
    switch (studentEmotion) {
      case "angry": return "😤";
      case "sad": return "🥺";
      case "thinking": return "🤔";
      default: return "🧑‍🎓";
    }
  };

  const emotionLabel = () => {
    switch (studentEmotion) {
      case "angry": return "抗拒 · 防衛";
      case "sad": return "難過 · 退縮";
      case "thinking": return "思考中...";
      default: return "聆聽中";
    }
  };

  // Sidebar content for chatroom
  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex flex-col h-full w-[260px] bg-[#1E1D1B] text-[#FAF9F6] py-8 px-6">
      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-7 h-7 bg-primary rounded-sm shrink-0" />
        <span className="font-heading text-base font-bold tracking-wider">SELf-corner</span>
      </div>

      {/* Session info (only when started) */}
      {isStarted && (
        <div className="bg-[#2A2927] p-4 flex flex-col gap-2 mb-6">
          <span className="font-heading text-[10px] font-semibold tracking-widest text-primary">
            CURRENT SESSION
          </span>
          <span className="text-sm font-semibold">
            {selectedScenario?.title || "隨機情境挑戰"}
          </span>
          <span className="font-heading text-xl font-bold">{formatTime(elapsedSeconds)}</span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        <button
          className="flex items-center gap-3.5 px-3 py-2 text-[13px] font-heading font-medium bg-[#E07A5F15] text-primary border-l-4 border-primary -ml-px rounded-sm"
        >
          <MessageCircle className="w-5 h-5" />
          對話
        </button>
        <button
          className="flex items-center gap-3.5 px-3 py-2 text-[13px] font-heading font-medium text-[#A09C94] hover:text-[#FAF9F6] hover:bg-white/5 rounded-sm"
        >
          <Radar className="w-5 h-5" />
          即時分析
        </button>
      </nav>

      <div className="flex-1" />

      {/* Bottom actions */}
      <div className="flex flex-col gap-3">
        {isStarted && (
          <>
            <button
              onClick={() => { handleTogglePause(); onNavigate?.(); }}
              className="flex items-center gap-2 text-[13px] font-heading font-medium text-[#A09C94] hover:text-[#FAF9F6] transition-colors"
            >
              {isPaused ? <CirclePlay className="w-5 h-5" /> : <CirclePause className="w-5 h-5" />}
              {isPaused ? "繼續練習" : "暫停練習"}
            </button>
            <button
              onClick={() => { handleEnd(); onNavigate?.(); }}
              className="flex items-center gap-2 text-[13px] font-heading font-medium text-[#B54A4A] hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              結束對話
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:block shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <div className="md:hidden fixed top-0 left-0 z-40 p-3">
          <SheetTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1E1D1B] text-white shadow-md">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="p-0 w-[260px] bg-[#1E1D1B] border-none">
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <div className="h-14 bg-white border-b border-[#E5E2D9] flex items-center justify-between px-6 shrink-0">
          <span className="text-sm font-semibold text-foreground pl-12 md:pl-0">
            {isStarted
              ? `情境：${selectedScenario?.title || "隨機情境挑戰"}`
              : "選擇練習情境"}
          </span>
          <div className="flex items-center gap-3">
            {isStarted && (
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${isPaused ? "bg-muted-foreground" : "bg-secondary animate-pulse"}`} />
                <span className="text-xs text-muted-foreground">
                  {isPaused ? "已暫停" : "學生思考中..."}
                </span>
              </div>
            )}
            <button
              onClick={() => setHelpOpen(true)}
              className="w-9 h-9 border border-[#E5E2D9] flex items-center justify-center rounded-sm hover:bg-muted/30 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${classroomBg})` }}>
          {/* Paused overlay */}
          {isStarted && isPaused && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/40 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 bg-white p-6 border border-[#E5E2D9] shadow-lg">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
                <span className="font-heading text-xl font-bold text-foreground">對話已暫停</span>
                <p className="text-sm text-muted-foreground">深呼吸，整理一下思緒吧！</p>
              </div>
            </div>
          )}

          {/* Scenario selection */}
          {!isStarted && !selectedScenario && !showRandomConfirm && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md p-8 overflow-y-auto">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-heading text-2xl font-bold text-foreground">選擇練習情境</h2>
                <button
                  onClick={handleRefresh}
                  className="w-9 h-9 flex items-center justify-center rounded-sm text-muted-foreground hover:text-primary transition-colors"
                  title="換一批情境"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <p className="text-muted-foreground mb-8">選擇一個你曾在課堂上遇到，或感到棘手的學生情緒事件。</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full mb-6">
                {displayedScenarios.map((scenario) => (
                  <ScenarioCard key={scenario.id} scenario={scenario} onClick={handleCardClick} />
                ))}
              </div>

              <Card
                onClick={handleRandomClick}
                className="cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg border-2 border-dashed border-primary/40 bg-white hover:border-primary hover:bg-primary/5 max-w-4xl w-full mt-2"
              >
                <CardContent className="p-6 text-center flex flex-col items-center justify-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Dices className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-heading font-bold text-lg text-foreground">隨機情境挑戰</p>
                  <p className="text-sm text-muted-foreground">不知道從何開始？讓系統為你挑選一個挑戰吧！</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Scenario detail */}
          {!isStarted && selectedScenario && (
            <ScenarioDetail scenario={selectedScenario} onClose={handleCloseDetail} onStart={handleStart} />
          )}

          {/* Random confirm */}
          {!isStarted && showRandomConfirm && (
            <RandomConfirm onClose={handleCloseDetail} onStart={handleStart} />
          )}

          {/* Active session */}
          {isStarted && (
            <div className="absolute inset-0 flex flex-col">
              {/* Student info bar - top strip */}
              <div className="flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-md z-10">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-xl shadow-sm">
                  {renderStudentAvatar()}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white drop-shadow-sm">小明（國二）</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[11px] font-medium text-white/80">
                      {emotionLabel()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spacer - classroom background visible */}
              <div className="flex-1" />

              {/* Chat Panel - bottom portion */}
              <ChatPanel
                isPaused={isPaused}
                onTogglePause={handleTogglePause}
                onEnd={handleEnd}
                onEmotionChange={(emo) => setStudentEmotion(emo as any)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">對話空間使用說明</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>歡迎來到安全的練習角落！這裡是你與虛擬學生互動的沙盒：</p>
            <ul className="space-y-3">
              <li className="flex gap-2"><span className="text-primary font-bold">1.</span> 選擇一個情境卡片，或點擊隨機挑戰。</li>
              <li className="flex gap-2"><span className="text-primary font-bold">2.</span> 對話開始後，你可以點擊麥克風講話，或輸入文字。</li>
              <li className="flex gap-2"><span className="text-primary font-bold">3.</span> 觀察學生的表情變化，試著用同理心回應。</li>
              <li className="flex gap-2"><span className="text-primary font-bold">4.</span> 隨時可以按「暫停」休息，準備好再繼續。</li>
              <li className="flex gap-2"><span className="text-primary font-bold">5.</span> 結束後，系統會提供 Satir 與 SEL 的專家回饋。</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
