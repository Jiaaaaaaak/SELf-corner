import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Sparkles,
  Bot,
  User,
  BookOpen,
  Code,
  Calculator,
  Lightbulb,
  History,
  Plus,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const quickPrompts = [
  { icon: BookOpen, label: "Explain a concept", prompt: "Explain the concept of..." },
  { icon: Code, label: "Debug code", prompt: "Help me debug this code..." },
  { icon: Calculator, label: "Solve problem", prompt: "Help me solve this problem..." },
  { icon: Lightbulb, label: "Project ideas", prompt: "Give me project ideas for..." },
];

const conversationHistory = [
  { id: 1, title: "Machine Learning basics", time: "Today" },
  { id: 2, title: "React hooks explanation", time: "Yesterday" },
  { id: 3, title: "Python debugging help", time: "2 days ago" },
];

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI learning assistant powered by advanced language models. I can help you understand complex concepts, debug code, solve problems, and guide your learning journey. What would you like to learn today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "That's a great question! Let me break this down for you step by step. First, let's understand the fundamental concepts involved, then we'll explore practical applications and examples that will help solidify your understanding.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto h-[calc(100vh-4rem)] px-4 py-8">
        <div className="grid h-full gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="hidden space-y-4 lg:block">
            <Button variant="hero" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              New Conversation
            </Button>

            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-card-foreground">
                  Recent Conversations
                </span>
              </div>
              <div className="space-y-2">
                {conversationHistory.map((conv) => (
                  <button
                    key={conv.id}
                    className="w-full rounded-lg p-2 text-left transition-colors hover:bg-muted"
                  >
                    <p className="truncate text-sm text-card-foreground">
                      {conv.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{conv.time}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="mb-2 text-sm font-medium text-card-foreground">
                Quick Actions
              </p>
              <div className="space-y-2">
                {quickPrompts.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <Button
                      key={prompt.label}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setInput(prompt.prompt)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {prompt.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card lg:col-span-3">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-secondary/30 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">
                  AI Learning Assistant
                </h2>
                <p className="text-sm text-muted-foreground">
                  Powered by advanced AI • Always here to help
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.isBot ? "" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      message.isBot ? "bg-primary/10" : "bg-accent/10"
                    }`}
                  >
                    {message.isBot ? (
                      <Bot className="h-5 w-5 text-primary" />
                    ) : (
                      <User className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`mt-2 text-xs ${
                        message.isBot
                          ? "text-muted-foreground"
                          : "text-primary-foreground/70"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Ask anything about your studies..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-background"
                />
                <Button variant="hero" size="lg" onClick={handleSend}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                AI may produce inaccurate information. Verify important facts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AITutor;
