import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Send, Pause, Play, LogOut } from "lucide-react";

interface ChatMessage {
  role: "teacher" | "student";
  content: string;
}

interface ChatPanelProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onEnd: () => void;
}

export default function ChatPanel({ isPaused, onTogglePause, onEnd }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "student", content: "老師......我有點不想說，但我今天心情真的很差。" },
  ]);
  const [inputText, setInputText] = useState("");
  const [micOn, setMicOn] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [...prev, { role: "teacher", content: inputText.trim() }]);
    setInputText("");
    // Mock student reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "student", content: "嗯......我知道了。讓我想一想。" },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-background/70 backdrop-blur-md border-t border-border/50 flex flex-col p-3 gap-2">
      {/* Chat messages */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "teacher" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "teacher"
                    ? "bg-primary/15 text-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <span className="text-xs text-muted-foreground font-medium">
                  {msg.role === "teacher" ? "👩‍🏫 老師" : "🧑‍🎓 學生"}
                </span>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input row */}
      <div className="flex items-center gap-2">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="輸入文字回應..."
          className="flex-1"
          disabled={isPaused}
        />

        {/* Mic toggle */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shrink-0"
          onClick={() => setMicOn(!micOn)}
          title={micOn ? "關閉麥克風" : "開啟麥克風"}
        >
          {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>

        {/* Send */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shrink-0"
          onClick={handleSend}
          disabled={!inputText.trim() || isPaused}
          title="傳送"
        >
          <Send className="h-4 w-4" />
        </Button>

        {/* Pause/Resume */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shrink-0"
          onClick={onTogglePause}
          title={isPaused ? "繼續" : "暫停"}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>

        {/* End */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shrink-0"
          onClick={onEnd}
          title="結束對話"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
