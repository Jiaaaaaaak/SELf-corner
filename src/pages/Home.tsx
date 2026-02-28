import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HamburgerMenu from "@/components/HamburgerMenu";
import { Heart, Activity, Users, MessageCircle, ShieldCheck } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const user = {
    name: "Sarah 老師",
    avatar: "",
  };

  return (
    <div className="min-h-screen bg-background p-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <HamburgerMenu />
          <h1 className="text-2xl font-bold text-foreground">SELf-corner</h1>
        </div>
        <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-full shadow-sm border border-border">
          <span className="text-sm font-medium text-muted-foreground">你好，{user.name}</span>
          <Avatar className="h-8 w-8 border border-primary/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mb-12 text-center space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
          打造<span className="text-primary">溫暖</span>的教育角落
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          AI 虛擬學生互動沙盒。在這裡，你可以隨時練習薩提爾 (Satir) 溝通模式與 SEL 技巧，從容面對真實教室中的每一份情緒。
        </p>
        <div className="pt-4">
          <Button size="lg" className="rounded-full px-8 text-lg" onClick={() => navigate("/chatroom")}>
            開始練習
          </Button>
        </div>
      </section>

      <Separator className="my-10" />

      {/* Core Concepts */}
      <section className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Satir Model */}
        <Card className="border-border/60 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">薩提爾冰山理論 (Satir Model)</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              我們不只看見行為，更看見感受。透過系統的回饋，學習覺察學生行為（冰山上的事件）背後的感受、觀點與渴望（冰山下的真實），並練習一致性的溝通姿態。
            </p>
          </CardContent>
        </Card>

        {/* SEL Framework */}
        <Card className="border-border/60 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">社會情緒學習 (SEL)</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              基於 CASEL 架構，我們陪伴你引導學生發展五大核心能力：自我覺察、自我管理、社會覺察、人際技巧與負責任的決策。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How it works */}
      <section className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
        <h3 className="text-2xl font-bold mb-6 text-center">如何開始？</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center text-accent-foreground">
              <Users className="h-6 w-6" />
            </div>
            <h4 className="font-semibold">1. 選擇情境</h4>
            <p className="text-sm text-muted-foreground">挑選一個你曾在課堂上遇到，或感到棘手的學生情緒事件。</p>
          </div>
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h4 className="font-semibold">2. 語音模擬互動</h4>
            <p className="text-sm text-muted-foreground">打開麥克風，用平常說話的方式與 AI 虛擬學生對話。</p>
          </div>
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-semibold">3. 獲得專家回饋</h4>
            <p className="text-sm text-muted-foreground">對話結束後，查看量化雷達圖與具體的「換句話說」建議。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
