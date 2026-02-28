import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Send, Pause, Play, SquareSquare, Disc2 } from "lucide-react";

interface ChatMessage {
  role: "teacher" | "student";
  content: string;
}

interface ChatPanelProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onEnd: () => void;
  onEmotionChange?: (emotion: string) => void;
}

export default function ChatPanel({ isPaused, onTogglePause, onEnd, onEmotionChange }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "student", content: "老師......我有點不想說，但我今天心情真的很差。" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [...prev, { role: "teacher", content: inputText.trim() }]);
    setInputText("");
    
    // Simulate AI thinking state
    if (onEmotionChange) onEmotionChange("thinking");

    // Mock student reply after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "student", content: "我覺得大家都針對我，反正我做什麼都不對！" },
      ]);
      if (onEmotionChange) onEmotionChange("angry");
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would trigger VAD or MediaRecorder
    if (!isRecording && onEmotionChange) {
      onEmotionChange("neutral"); // Reset student emotion while listening
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/3 min-h-[250px] bg-card/90 backdrop-blur-xl border-t border-border rounded-t-2xl flex flex-col p-4 gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      {/* Chat messages */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-4 pb-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "teacher" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.role === "teacher"
                    ? "bg-primary/10 border border-primary/20 text-foreground rounded-br-sm"
                    : "bg-muted border border-border text-foreground rounded-bl-sm"
                }`}
              >
                <div className="text-[10px] text-muted-foreground font-bold mb-1 tracking-wider uppercase">
                  {msg.role === "teacher" ? "👩‍🏫 老師" : "🧑‍🎓 學生"}
                </div>
                <p className="leading-relaxed text-base">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input row */}
      <div className="flex items-center gap-3 pt-2">
        
        {/* Voice Input (Primary action) */}
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="icon"
          className={`h-12 w-12 rounded-full shrink-0 shadow-md transition-all ${isRecording ? 'animate-pulse' : ''}`}
          onClick={toggleRecording}
          disabled={isPaused}
          title={isRecording ? "停止錄音" : "點擊說話"}
        >
          {isRecording ? <Disc2 className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isRecording ? "聆聽中..." : "輸入文字回應或點擊麥克風說話..."}
          className="flex-1 h-12 rounded-full px-5 bg-background border-border/60 focus-visible:ring-primary/50 text-base"
          disabled={isPaused || isRecording}
        />

        {/* Send */}
        <Button
          variant="secondary"
          size="icon"
          className="h-12 w-12 rounded-full shrink-0"
          onClick={handleSend}
          disabled={!inputText.trim() || isPaused || isRecording}
          title="傳送文字"
        >
          <Send className="h-5 w-5" />
        </Button>

        <div className="w-px h-8 bg-border mx-1"></div>

        {/* Pause/Resume */}
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shrink-0 border-border/60 hover:bg-muted"
          onClick={onTogglePause}
          title={isPaused ? "繼續" : "暫停"}
        >
          {isPaused ? <Play className="h-5 w-5 text-primary" /> : <Pause className="h-5 w-5 text-muted-foreground" />}
        </Button>

        {/* End */}
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shrink-0 border-border/60 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
          onClick={onEnd}
          title="結束對話並查看回饋"
        >
          <SquareSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
