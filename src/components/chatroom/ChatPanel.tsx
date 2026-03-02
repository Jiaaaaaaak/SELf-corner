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
    <div className="absolute bottom-0 left-0 right-0 flex flex-col bg-white/80 backdrop-blur-md border-t border-[#E5E2D9] z-30">
      {/* Chat messages area */}
      <ScrollArea className="h-[240px] px-8 py-6">
        <div className="flex flex-col gap-4 pb-4">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === "teacher" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              {msg.role === "student" && (
                <div className="w-8 h-8 rounded-full bg-[#F0EDE6] border border-[#E5E2D9] flex items-center justify-center shrink-0 mr-3 self-end shadow-sm">
                  <span className="text-[10px] font-bold text-[#706C61]">小明</span>
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === "teacher"
                    ? "bg-primary text-white rounded-[18px] rounded-tr-none shadow-primary/10"
                    : "bg-white border border-[#E5E2D9] text-[#3D3831] rounded-[18px] rounded-tl-none"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start animate-in fade-in duration-300">
               <div className="w-8 h-8 rounded-full bg-[#F0EDE6] border border-[#E5E2D9] flex items-center justify-center shrink-0 mr-3 self-end">
                  <Loader2 className="w-3 h-3 text-[#706C61] animate-spin" />
               </div>
               <div className="bg-[#FAF9F6] border border-[#E5E2D9] px-4 py-3 rounded-[18px] rounded-tl-none">
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 bg-[#A09C94] rounded-full animate-bounce [animation-delay:-0.3s]" />
                     <div className="w-1.5 h-1.5 bg-[#A09C94] rounded-full animate-bounce [animation-delay:-0.15s]" />
                     <div className="w-1.5 h-1.5 bg-[#A09C94] rounded-full animate-bounce" />
                  </div>
               </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Control bar */}
      <div className="px-8 py-4 border-t border-[#E5E2D9] bg-white">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          {/* Mic Button */}
          <button
            onClick={toggleRecording}
            disabled={isPaused}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-95 ${
              isRecording
                ? "bg-destructive text-white ring-4 ring-destructive/20 animate-pulse"
                : "bg-white border border-[#E5E2D9] text-[#3D3831] hover:border-primary hover:text-primary"
            } disabled:opacity-50`}
          >
            {isRecording ? <Disc2 className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <div className="flex-1 flex items-center h-12 px-5 bg-[#FAF9F6] border border-[#E5E2D9] rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary focus-within:bg-white transition-all group">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "正在聆聽您的聲音..." : "在此輸入您的回應內容..."}
              className="flex-1 text-[15px] bg-transparent outline-none placeholder:text-[#A09C94] text-[#3D3831] font-medium"
              disabled={isPaused || isRecording}
            />
            {inputText.trim() && (
              <button
                onClick={handleSend}
                className="ml-2 text-primary hover:scale-110 transition-transform active:scale-90"
              >
                <Send className="w-5 h-5 fill-current" />
              </button>
            )}
          </div>

          {/* Action Divider */}
          <div className="w-px h-8 bg-[#E5E2D9] mx-1" />

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePause}
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#E5E2D9] bg-white text-[#706C61] hover:bg-[#FAF9F6] hover:text-[#3D3831] transition-all shadow-sm"
              title={isPaused ? "繼續練習" : "暫停練習"}
            >
              {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={onEnd}
              className="px-5 h-12 rounded-xl flex items-center gap-2 border border-destructive/20 bg-destructive/5 text-destructive font-heading font-bold text-xs tracking-widest hover:bg-destructive hover:text-white transition-all shadow-sm group"
            >
              <SquareSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
              結束對話
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
