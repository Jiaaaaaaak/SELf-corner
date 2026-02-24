import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const radarData = [
  {
    subject: "負責任的決策",
    value: 85,
  },
  {
    subject: "自我管理",
    value: 75,
  },
  {
    subject: "社會覺察",
    value: 65,
  },
  {
    subject: "關係技巧",
    value: 80,
  },
  {
    subject: "自我覺察",
    value: 92,
  },
];
const defaultChatHistory = [
  {
    role: "assistant",
    content: "您好，我是您的教育顧問專家，對於剛剛的回顧有任何問題都歡迎問我~",
  },
];
const defaultExpertFeedback = `1. 從「生理覺察」切入，建立情緒儀表板
老師在第 5 句精準地捕捉了學生提到的「手心冒汗」。
建議：老師可以更進一步引導學生建立「情緒預警系統」。
具體作法：問學生：「除了手心冒汗，你的肩膀會緊繃嗎？還是肚子會緊緊的？」幫助學生在情緒爆炸的前 30 秒（黃金冷靜期）就透過身體訊號發現問題，而不僅是事後回顧。

2. 深化「我訊息（I-Message）」的層次
在第 9 句中，老師提議了「我訊息」。
建議：確保「我訊息」包含三個核心元素：情緒 + 行為 + 需求。
優化後的說法：「小明，我現在因為小考沒寫完感到很煩躁（情緒），如果你現在一直問我問題（行為），我會沒辦法冷靜，我需要五分鐘安靜一下（需求）。」
理由：清楚的需求表達能降低對方的防衛心，減少誤解。

3. 將「道歉」升級為「修復行為」
在第 11 句，學生主動提出道歉，這很棒。
建議：訓練家提醒老師，道歉不只是說對不起，而是「修補關係的裂痕」。
引導練習：老師可以多問一句：「你覺得除了道歉，明天幫小明拿個作業，或是主動跟他打個招呼，哪種方式能讓他感覺到你真的不在意剛才的事了？」這能培養學生的「社會覺察（Social Awareness）」，理解行為對他人的後續影響。`;
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
    content: "好，謝謝老師。跟我聯完之後，我覺得心裡沒那麼悶了，明天見。",
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
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-background p-6 max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6">專家回饋</h1>

        {/* Top Section: 3 columns - Radar | Feedback | Chat */}
        <div className="grid grid-cols-3 gap-6" style={{ height: "620px" }}>
          {/* Left - Radar Chart */}
          <div className="flex flex-col h-full overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">效能分析</h2>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: "hsl(var(--foreground))",
                      fontSize: 14,
                    }}
                  />
                  <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => navigate("/chatroom")}>
                重試一次
              </Button>
              <Button variant="outline" onClick={() => navigate("/home")}>
                回首頁
              </Button>
            </div>
          </div>

          {/* Middle - Expert Feedback */}
          <div className="flex flex-col h-full overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">回饋內容</h2>
            <ScrollArea className="flex-1">
              <p className="text-base text-foreground whitespace-pre-line leading-relaxed pr-3">
                {defaultExpertFeedback}
              </p>
            </ScrollArea>
          </div>

          {/* Right - AI Coach Chat (merged chat + input) */}
          <div className="flex flex-col h-full overflow-hidden border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">回顧討論</h2>
            <ScrollArea className="flex-1 mb-3">
              <div className="space-y-4">
                {defaultChatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
                    >
                      <p className="text-base">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-3 border-t pt-3">
              <Textarea
                placeholder="輸入文字..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[80px] resize-none text-base"
              />
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleChatWithExpert}>
                  與專家對話
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Transcript with toggle */}
        <div className="mt-8">
          <Tabs defaultValue="combined">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">對話紀錄</h2>
              <TabsList>
                <TabsTrigger value="combined">完整對話</TabsTrigger>
                <TabsTrigger value="separate">分開檢視</TabsTrigger>
              </TabsList>
            </div>

            {/* Combined view - back and forth */}
            <TabsContent value="combined">
              <div className="space-y-4 p-4">
                {defaultTranscript.map((entry, index) => (
                  <div key={index} className={`flex ${entry.role === "teacher" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-3 ${entry.role === "teacher" ? "bg-primary/10 text-foreground" : "bg-muted text-foreground"}`}
                    >
                      <p className="text-xs font-semibold mb-1 text-muted-foreground">
                        {entry.role === "teacher" ? "👩‍🏫 老師" : "🧑‍🎓 學生"}
                      </p>
                      <p className="text-base">{entry.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Separate view - teacher & student columns aligned row by row */}
            <TabsContent value="separate">
              <div className="grid grid-cols-2 gap-6 px-4 pb-2">
                <h3 className="text-lg font-semibold">【老師】對話紀錄</h3>
                <h3 className="text-lg font-semibold">【學生】對話紀錄</h3>
              </div>
              {Array.from({ length: Math.max(teacherTranscript.length, studentTranscript.length) }).map((_, index) => (
                <div key={index} className="grid grid-cols-2 gap-6">
                  <div className="px-4 py-3 border-b border-border min-h-[60px] flex items-start">
                    {teacherTranscript[index] && (
                      <p className="text-base text-foreground">{teacherTranscript[index].content}</p>
                    )}
                  </div>
                  <div className="px-4 py-3 border-b border-border min-h-[60px] flex items-start">
                    {studentTranscript[index] && (
                      <p className="text-base text-foreground">{studentTranscript[index].content}</p>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}
