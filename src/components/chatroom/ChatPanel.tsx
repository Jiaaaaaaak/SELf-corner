import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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

    // Simulate AI Student Response
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

  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col bg-transparent z-30">
      {/* Chat messages area - Fully Transparent with better shadowing for readability */}
      <ScrollArea className="h-[280px] px-8 py-6">
        <div className="flex flex-col gap-5 pb-4">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === "teacher" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              {msg.role === "student" && (
                <div className="w-9 h-9 rounded-full bg-white/90 border border-[#E5E2D9] flex items-center justify-center shrink-0 mr-3 self-end shadow-md">
                  <span className="text-[11px] font-bold text-[#706C61]">小明</span>
                </div>
              )}
              <div
                className={`max-w-[70%] px-5 py-3.5 text-[15px] font-medium leading-relaxed shadow-xl border backdrop-blur-sm ${
                  msg.role === "teacher"
                    ? "bg-primary text-white rounded-[22px] rounded-tr-none border-primary/20"
                    : "bg-white/90 text-[#3D3831] rounded-[22px] rounded-tl-none border-[#E5E2D9]"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start animate-in fade-in duration-300">
               <div className="w-9 h-9 rounded-full bg-white/90 border border-[#E5E2D9] flex items-center justify-center shrink-0 mr-3 self-end shadow-md">
                  <Loader2 className="w-4 h-4 text-[#706C61] animate-spin" />
               </div>
               <div className="bg-white/80 backdrop-blur-sm border border-[#E5E2D9] px-5 py-3.5 rounded-[22px] rounded-tl-none shadow-lg">
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
      </ScrollArea>

      {/* Control bar - Glassmorphism style */}
      <div className="px-8 py-6 bg-gradient-to-t from-black/20 to-transparent">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={toggleRecording}
            disabled={isPaused}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl transition-all active:scale-95 border-2 ${
              isRecording
                ? "bg-destructive text-white border-destructive/50 ring-4 ring-destructive/20 animate-pulse"
                : "bg-white/90 backdrop-blur-md border-white/50 text-[#3D3831] hover:text-primary hover:scale-105"
            } disabled:opacity-50`}
          >
            {isRecording ? <Disc2 className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <div className="flex-1 flex items-center h-14 px-6 bg-white/90 backdrop-blur-md border-2 border-white/50 rounded-2xl shadow-2xl focus-within:ring-4 focus-within:ring-primary/20 focus-within:border-primary transition-all group">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "正在聆聽您的聲音..." : "在這裡輸入您的回應..."}
              className="flex-1 text-[16px] bg-transparent outline-none placeholder:text-[#A09C94] text-[#3D3831] font-semibold"
              disabled={isPaused || isRecording}
            />
            {inputText.trim() && (
              <button
                onClick={handleSend}
                className="ml-3 text-primary hover:scale-125 transition-transform active:scale-90"
              >
                <Send className="w-6 h-6 fill-current" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePause}
              className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/90 backdrop-blur-md border-2 border-white/50 text-[#706C61] hover:text-primary transition-all shadow-2xl hover:scale-105 active:scale-95"
              title={isPaused ? "繼續練習" : "暫停練習"}
            >
              {isPaused ? <Play className="w-6 h-6 fill-current" /> : <Pause className="w-6 h-6 fill-current" />}
            </button>

            <button
              onClick={onEnd}
              className="px-6 h-14 rounded-2xl flex items-center gap-3 bg-destructive text-white font-heading font-bold text-sm tracking-widest hover:bg-[#B54A4A] transition-all shadow-2xl shadow-destructive/20 hover:scale-105 active:scale-95"
            >
              <SquareSquare className="w-5 h-5 fill-current" />
              結束
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
