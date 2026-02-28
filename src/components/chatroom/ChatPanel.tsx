import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, Pause, Play, SquareSquare, Disc2 } from "lucide-react";

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
    if (onEmotionChange) onEmotionChange("thinking");
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
    if (!isRecording && onEmotionChange) onEmotionChange("neutral");
  };

  return (
    <div className="flex flex-col bg-white/90 backdrop-blur-sm border-t border-[#E5E2D9] shrink-0">
      {/* Chat messages */}
      <ScrollArea className="h-[200px] px-6 py-4">
        <div className="space-y-3 pb-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "teacher" ? "justify-end" : "justify-start"}`}>
              {msg.role === "student" && (
                <div className="w-7 h-7 rounded-full bg-[#F0EDE6] flex items-center justify-center shrink-0 mr-2 self-end">
                  <span className="text-xs text-muted-foreground">小</span>
                </div>
              )}
              <div
                className={`max-w-[400px] px-3.5 py-2.5 text-sm ${
                  msg.role === "teacher"
                    ? "bg-primary text-white rounded-2xl rounded-br-sm"
                    : "bg-[#81B29A20] text-foreground rounded-2xl rounded-bl-sm"
                }`}
              >
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className="flex items-center gap-3 px-6 py-3 border-t border-[#E5E2D9]">
        <button
          onClick={toggleRecording}
          disabled={isPaused}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isRecording
              ? "bg-destructive text-white animate-pulse"
              : "bg-primary text-white hover:opacity-90"
          } disabled:opacity-50`}
          title={isRecording ? "停止錄音" : "點擊說話"}
        >
          {isRecording ? <Disc2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <div className="flex-1 flex items-center h-10 px-4 border border-[#E5E2D9] bg-[#FAF9F6] rounded-sm">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRecording ? "聆聽中..." : "輸入文字回應..."}
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-[#A09C94]"
            disabled={isPaused || isRecording}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!inputText.trim() || isPaused || isRecording}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-secondary text-white hover:opacity-90 transition-opacity disabled:opacity-30"
          title="傳送文字"
        >
          <Send className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-[#E5E2D9] mx-1" />

        <button
          onClick={onTogglePause}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#E5E2D9] hover:bg-muted/30 transition-colors"
          title={isPaused ? "繼續" : "暫停"}
        >
          {isPaused ? <Play className="w-4 h-4 text-primary" /> : <Pause className="w-4 h-4 text-muted-foreground" />}
        </button>

        <button
          onClick={onEnd}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#E5E2D9] hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
          title="結束對話並查看回饋"
        >
          <SquareSquare className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
