import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import { MessageCircleHeart, Activity, ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const radarData = [
  { subject: "自我覺察 (SEL)", value: 92 },
  { subject: "一致性表達 (Satir)", value: 75 },
  { subject: "社會覺察 (SEL)", value: 65 },
  { subject: "同理心與連結 (Satir)", value: 80 },
  { subject: "情緒調節 (SEL)", value: 85 },
];

const defaultChatHistory = [
  {
    role: "assistant",
    content: "老師辛苦了！這是一場不容易的對話。關於剛剛的分析報告，或是針對小傑的情況，您有任何想進一步討論的嗎？",
  },
];

const defaultTranscript = [
  {
    role: "teacher",
    content:
      "小傑，我看你剛才收書包的時候動作有點快，臉色也不太好，還跟小明拌了兩句嘴。現在感覺還好嗎？想聊聊剛才發生了什麼事嗎？",
  },
  {
    role: "student",
    content: "沒什麼啦，就是覺得很煩。小明在那邊一直吵，問一些笨問題，我叫他閉嘴他還不理我。我覺得大家今天都在針對我。",
  },
  {
    role: "teacher",
    content:
      "聽起來你現在覺得很有壓力，甚至覺得有點委屈，對嗎？當你覺得『大家都在針對你』的時候，心裡面是什麼感覺？是生氣、挫折，還是覺得累了？",
    highlight: true,
    note: "很好的情緒指認！幫助學生進行自我覺察。",
  },
  {
    role: "student",
    content:
      "……都有吧。昨晚沒睡好，今天的數學小考我又沒寫完，然後小明又在那邊鬧，我那時候真的覺得快爆炸了，手心都在冒汗。",
  },
  {
    role: "teacher",
    content:
      "謝謝你跟我分享這些。你能感覺到『手心冒汗』是很棒的覺察，這通常是身體在提醒你：『我快要超載了』。既然現在我們知道情緒是從壓力累積起來的，你覺得剛才對小明大聲吼叫，有讓你心情變好一點，或是解決數學考試的問題嗎？",
  },
  {
    role: "student",
    content: "其實沒有。吼完他之後我反而覺得更煩，因為現在氣氛變得很尷尬，我也有點後悔，但我那時候就是控制不住自己。",
  },
  {
    role: "teacher",
    content:
      "這種『控制不住』的感覺每個人都會有。我們來試試看，如果下次你又感覺到手心冒汗、心跳加快時，在說話之前，我們可以先做一個什麼動作來給自己 5 秒鐘的緩衝？比如深呼吸，或是喝口水？",
  },
  {
    role: "student",
    content:
      "嗯……也許我可以先走去飲水機裝水？離開那個位置一下下可能比較好。但我還是不知道該怎麼跟小明說，我不想讓他覺得我很好欺負。",
  },
  {
    role: "teacher",
    content:
      "這是一個很好的策略！暫時離開現場能讓大腦冷靜下來。至於小明，你覺得如果用『我訊息』來表達會不會比較好？例如：『我現在心情不太好，需要安靜一下，等下再聊』，這樣既表達了你的邊界，又不會傷害到關係。你覺得他聽完會有什麼反應？",
    highlight: true,
    note: "引入了『我訊息』，但在薩提爾模式中，可以再更深入探討學生的『渴望』(被尊重)。",
  },
  {
    role: "student",
    content: "他應該會喔一聲就走開吧，總比我叫他閉嘴好。那我明天去跟他道個歉好了，畢竟剛才我真的太兇了。",
  },
  {
    role: "teacher",
    content:
      "小傑，我很欣賞你願意承擔責任並修補關係的勇氣。這不容易，但這會讓你的人際關係變得更穩固。今晚回去先早點休息，把睡眠補回來，好嗎？",
  },
  {
    role: "student",
    content: "好，謝謝老師。跟你聊完之後，我覺得心裡沒那麼悶了，明天見。",
  },
];

export default function Feedback() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const handleChatWithExpert = () => {
    console.log("Chat with expert:", userInput);
  };
  const teacherTranscript = defaultTranscript.filter((e) => e.role === "teacher");
  const studentTranscript = defaultTranscript.filter((e) => e.role === "student");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HamburgerMenu />
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              對話分析報告
            </h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full bg-card" onClick={() => navigate("/chatroom")}>
              再練習一次
            </Button>
            <Button className="rounded-full" onClick={() => navigate("/home")}>
              回首頁
            </Button>
          </div>
        </div>

        {/* Top Section: Radar & Actionable Advice */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Left - Radar Chart (Satir & SEL) */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                能力雷達圖 (SEL & 薩提爾模式)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 13, fontWeight: 600 }}
                    />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)' }} />
                    <Radar name="本次表現" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="hsl(var(--primary))" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Right - Actionable Advice */}
          <Card className="border-border/60 shadow-sm bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                專家建議：原本怎麼說更好？
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-6">
                  <div className="space-y-2 bg-card p-4 rounded-xl border border-border/50">
                    <h3 className="font-bold text-foreground">💡 1. 建立「情緒預警系統」</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      老師精準捕捉到了「手心冒汗」。建議進一步引導學生在情緒爆炸前 30 秒（黃金冷靜期）就發現問題。
                    </p>
                    <div className="bg-primary/10 p-3 rounded-lg flex items-start gap-2 mt-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">
                        換句話說：「除了手心冒汗，你的肩膀會緊繃嗎？下次如果肩膀又緊緊的，我們能做什麼？」
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 bg-card p-4 rounded-xl border border-border/50">
                    <h3 className="font-bold text-foreground">💡 2. 深化薩提爾的「渴望」層次</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      老師提議了「我訊息」，但學生提到「不想讓他覺得我好欺負」，這反映了冰山底層對「被尊重」的渴望。
                    </p>
                    <div className="bg-primary/10 p-3 rounded-lg flex items-start gap-2 mt-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">
                        換句話說：「聽起來你很在意他是否尊重你（渴望）。我們怎麼表達『我需要安靜』，同時也能展現你的力量？」
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section: Transcript & AI Coach */}
        <div className="grid lg:grid-cols-3 gap-6 h-[500px]">
          
          {/* Transcript */}
          <Card className="lg:col-span-2 border-border/60 shadow-sm flex flex-col h-full overflow-hidden">
            <CardHeader className="py-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">對話逐字稿回顧</CardTitle>
                <Tabs defaultValue="combined" className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-2 h-8">
                    <TabsTrigger value="combined" className="text-xs">完整</TabsTrigger>
                    <TabsTrigger value="separate" className="text-xs">對照</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden relative">
              {/* Overlay shadow for scrolling */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none"></div>
              <ScrollArea className="h-full px-6 py-4">
                <Tabs defaultValue="combined" className="w-full">
                  <TabsContent value="combined" className="m-0 space-y-4">
                    {defaultTranscript.map((entry, index) => (
                      <div key={index} className={`flex flex-col ${entry.role === "teacher" ? "items-end" : "items-start"}`}>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                            entry.role === "teacher" 
                              ? "bg-primary/10 border border-primary/20 rounded-br-sm" 
                              : "bg-muted border border-border rounded-bl-sm"
                          } ${entry.highlight ? 'ring-2 ring-accent ring-offset-2 ring-offset-card' : ''}`}
                        >
                          <p className="text-[10px] font-bold mb-1 uppercase tracking-wider text-muted-foreground">
                            {entry.role === "teacher" ? "👩‍🏫 老師" : "🧑‍🎓 學生"}
                          </p>
                          <p className="text-base text-foreground leading-relaxed">{entry.content}</p>
                        </div>
                        {entry.highlight && entry.note && (
                          <div className="mt-2 max-w-[75%] bg-accent/20 text-accent-foreground text-xs px-3 py-1.5 rounded-lg font-medium border border-accent/30 flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {entry.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="separate" className="m-0">
                    <div className="grid grid-cols-2 gap-4 pb-2 border-b border-border/50 sticky top-0 bg-card z-20">
                      <div className="font-bold text-center text-primary">👩‍🏫 老師</div>
                      <div className="font-bold text-center text-muted-foreground">🧑‍🎓 學生</div>
                    </div>
                    <div className="pt-4 space-y-4">
                      {Array.from({ length: Math.max(teacherTranscript.length, studentTranscript.length) }).map((_, index) => (
                        <div key={index} className="grid grid-cols-2 gap-6 relative">
                          {/* Connecting line */}
                          <div className="absolute left-1/2 top-4 bottom-[-1rem] w-px bg-border/50 -translate-x-1/2"></div>
                          
                          <div className="flex justify-end">
                            {teacherTranscript[index] && (
                              <div className={`bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm p-3 shadow-sm w-[90%] relative ${teacherTranscript[index].highlight ? 'ring-2 ring-accent' : ''}`}>
                                <p className="text-sm text-foreground">{teacherTranscript[index].content}</p>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-start">
                            {studentTranscript[index] && (
                              <div className="bg-muted border border-border rounded-2xl rounded-tl-sm p-3 shadow-sm w-[90%] relative">
                                <p className="text-sm text-foreground">{studentTranscript[index].content}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none"></div>
            </CardContent>
          </Card>

          {/* AI Coach */}
          <Card className="border-border/60 shadow-sm flex flex-col h-full overflow-hidden bg-secondary/5">
            <CardHeader className="py-4 border-b border-border/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircleHeart className="h-5 w-5 text-secondary" />
                與督導對話
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden gap-4">
              <ScrollArea className="flex-1 pr-2">
                <div className="space-y-4">
                  {defaultChatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                          message.role === "user" 
                            ? "bg-secondary text-secondary-foreground rounded-br-sm" 
                            : "bg-card border border-border text-foreground rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="pt-2">
                <Textarea
                  placeholder="問問督導：如果學生一直沈默怎麼辦..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[80px] resize-none text-sm rounded-xl border-border/60 bg-card mb-2"
                />
                <Button className="w-full rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={handleChatWithExpert}>
                  傳送訊息
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
