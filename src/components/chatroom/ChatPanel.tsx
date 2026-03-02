import { useState, useRef, useEffect } from "react";
import { Mic, Send, Pause, Play, SquareSquare, Disc2, Loader2 } from "lucide-react";

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
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || isThinking) return;
    
    const newMsg: ChatMessage = { role: "teacher", content: inputText.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsThinking(true);
    if (onEmotionChange) onEmotionChange("thinking");

    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { role: "student", content: "我覺得大家都針對我，反正我做什麼都不對！" },
      ]);
      if (onEmotionChange) onEmotionChange("angry");
    }, 2500);
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

  // Only show recent messages to preserve screen space
  const visibleMessages = messages.slice(-3);

  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col z-30">
      {/* Chat messages - transparent, minimal, only recent */}
      <div className="px-8 py-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {visibleMessages.map((msg, i) => (
            <div 
              key={messages.length - visibleMessages.length + i} 
              className={`flex ${msg.role === "teacher" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              {msg.role === "student" && (
                <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E2D9]/50 flex items-center justify-center shrink-0 mr-2.5 self-end shadow-sm">
                  <span className="text-[10px] font-bold text-[#706C61]">小</span>
                </div>
              )}
              <div
                className={`max-w-[65%] px-5 py-3 text-[15px] font-medium leading-relaxed shadow-lg ${
                  msg.role === "teacher"
                    ? "bg-primary/90 backdrop-blur-sm text-white rounded-[18px] rounded-tr-sm"
                    : "bg-white/85 backdrop-blur-sm text-[#3D3831] rounded-[18px] rounded-tl-sm border border-white/50"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5E2D9]/50 flex items-center justify-center shrink-0 mr-2.5 self-end shadow-sm">
                <Loader2 className="w-3.5 h-3.5 text-[#706C61] animate-spin" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 px-5 py-3 rounded-[18px] rounded-tl-sm shadow-lg">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-[#A09C94] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-[#A09C94] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-[#A09C94] rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {/* Text input - takes most space */}
          <div className="flex-1 flex items-center h-12 px-5 bg-white/80 backdrop-blur-md border border-white/50 rounded-full shadow-lg focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "正在聆聽您的聲音..." : "輸入文字回應..."}
              className="flex-1 text-[14px] bg-transparent outline-none placeholder:text-[#A09C94] text-[#3D3831] font-medium"
              disabled={isPaused || isRecording}
            />
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Mic button */}
            <button
              onClick={toggleRecording}
              disabled={isPaused}
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-all active:scale-95 ${
                isRecording
                  ? "bg-destructive text-white ring-4 ring-destructive/20 animate-pulse"
                  : "bg-primary text-white hover:bg-primary/90 hover:scale-105"
              } disabled:opacity-50`}
            >
              {isRecording ? <Disc2 className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isPaused}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm border border-white/50 text-[#3D3831] hover:text-primary hover:scale-105 transition-all shadow-lg disabled:opacity-40 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>

            {/* Pause button */}
            <button
              onClick={onTogglePause}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm border border-white/50 text-[#706C61] hover:text-primary transition-all shadow-lg hover:scale-105 active:scale-95"
              title={isPaused ? "繼續練習" : "暫停練習"}
            >
              {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5" />}
            </button>

            {/* End button */}
            <button
              onClick={onEnd}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm border border-white/50 text-[#706C61] hover:text-destructive transition-all shadow-lg hover:scale-105 active:scale-95"
              title="結束對話"
            >
              <SquareSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
