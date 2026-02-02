import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Sparkles, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export function AITutorWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI learning assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "I'd be happy to help you with that! Let me analyze your question and provide a detailed explanation...",
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-[500px] flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-secondary/50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">AI Tutor</h3>
          <p className="text-xs text-muted-foreground">
            Always ready to help you learn
          </p>
        </div>
        <div className="ml-auto flex h-2 w-2 rounded-full bg-accent" />
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.isBot ? "" : "flex-row-reverse"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                message.isBot ? "bg-primary/10" : "bg-accent/10"
              }`}
            >
              {message.isBot ? (
                <Bot className="h-4 w-4 text-primary" />
              ) : (
                <MessageSquare className="h-4 w-4 text-accent" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.isBot
                  ? "bg-muted text-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button variant="hero" size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
