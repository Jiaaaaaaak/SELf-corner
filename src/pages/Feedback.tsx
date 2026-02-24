import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const radarData = [{
  subject: "清晰度",
  value: 80
}, {
  subject: "互動性",
  value: 65
}, {
  subject: "內容",
  value: 90
}, {
  subject: "節奏",
  value: 70
}, {
  subject: "表達",
  value: 85
}];
const defaultChatHistory = [{
  role: "assistant",
  content: "您好，我是您的教育顧問專家，對於剛剛的回顧有任何問題都歡迎問我~"
}];
const defaultExpertFeedback = `整體表現評估：

您在這次教學互動中展現了良好的教學技巧。以下是詳細的專家分析：

【優點】
• 內容組織清晰，由淺入深循序漸進
• 專業術語解釋準確，並能與生活實例連結
• 回應學生問題時態度親切有耐心
• 能夠根據學生的提問靈活調整解釋方式
• 使用了適當的教學鷹架，幫助學生建構知識

【改進建議】
• 可以多使用圖表或視覺化工具輔助說明
• 在解釋複雜概念時，可以先確認學生的先備知識
• 建議增加更多互動性問題，引導學生主動思考
• 可以在每個概念結束後進行簡短的理解檢核
• 嘗試使用類比或比喻來讓抽象概念更容易理解
• 建議在教學結束時提供總結或概念圖

【互動性評分說明】
互動性得分較低（65分）是因為對話較為單向，建議多提問來確認學生理解程度。可以嘗試使用蘇格拉底式提問法，透過一系列引導性問題，讓學生自己發現答案，而非直接給予完整解答。

【教學策略建議】
1. 開場時可以先用一個生活化的問題引起學生興趣
2. 在講解過程中穿插檢核問題，例如「你覺得為什麼會這樣？」
3. 結束時可以請學生用自己的話總結所學內容
4. 提供延伸閱讀或思考題目，促進深度學習

【總結】
整體教學品質優良，持續保持並加強互動性將使教學效果更佳。建議未來可以多嘗試不同的教學策略，找到最適合自己風格的互動方式。`;
const defaultTranscript = [{
  role: "teacher",
  content: "同學們好，今天我們要來學習光合作用。有沒有人知道什麼是光合作用？"
}, {
  role: "student",
  content: "老師好！是不是植物用陽光製造食物的過程？"
}, {
  role: "teacher",
  content: "說得很好！光合作用就是植物利用光能，將二氧化碳和水轉化為葡萄糖和氧氣的過程。那你們知道這個過程主要發生在植物的哪個部位嗎？"
}, {
  role: "student",
  content: "葉子？"
}, {
  role: "teacher",
  content: "對！更精確地說，是在葉子細胞中的葉綠體裡進行的。葉綠體含有葉綠素，這就是為什麼葉子是綠色的。"
}, {
  role: "student",
  content: "那光合作用的化學方程式是什麼？"
}, {
  role: "teacher",
  content: "光合作用的總反應方程式是：6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂。簡單來說，六分子的二氧化碳加上六分子的水，在光能的驅動下，產生一分子的葡萄糖和六分子的氧氣。"
}, {
  role: "student",
  content: "所以我們呼吸的氧氣都是植物製造的嗎？"
}, {
  role: "teacher",
  content: "大部分是的！地球上大約70%的氧氣來自海洋中的藻類和浮游植物，剩下的30%來自陸地上的植物。所以保護森林和海洋生態系統非常重要。"
}, {
  role: "student",
  content: "了解了！那光合作用分為哪些階段呢？"
}, {
  role: "teacher",
  content: "光合作用主要分為兩個階段：光反應和暗反應。光反應需要光照，發生在類囊體膜上；暗反應不需要直接光照，發生在葉綠體基質中。我們下次課再詳細討論這兩個階段。"
}];

export default function Feedback() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const handleChatWithExpert = () => {
    console.log("Chat with expert:", userInput);
  };
  const teacherTranscript = defaultTranscript.filter(e => e.role === "teacher");
  const studentTranscript = defaultTranscript.filter(e => e.role === "student");

  return <ScrollArea className="h-screen">
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
                  <PolarAngleAxis dataKey="subject" tick={{
                    fill: "hsl(var(--foreground))",
                    fontSize: 14
                  }} />
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
                {defaultChatHistory.map((message, index) => <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                      <p className="text-base">{message.content}</p>
                    </div>
                  </div>)}
              </div>
            </ScrollArea>
            <div className="space-y-3 border-t pt-3">
              <Textarea placeholder="輸入文字..." value={userInput} onChange={e => setUserInput(e.target.value)} className="min-h-[80px] resize-none text-base" />
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
                  <div key={index} className={`flex ${entry.role === "teacher" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[70%] rounded-lg px-4 py-3 ${entry.role === "teacher" ? "bg-primary/10 text-foreground" : "bg-muted text-foreground"}`}>
                      <p className="text-xs font-semibold mb-1 text-muted-foreground">
                        {entry.role === "teacher" ? "👩‍🏫 老師" : "🧑‍🎓 學生"}
                      </p>
                      <p className="text-base">{entry.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Separate view - teacher & student columns */}
            <TabsContent value="separate">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">【老師】對話紀錄</h3>
                  <div className="space-y-3">
                    {teacherTranscript.map((entry, index) => <div key={index}>
                        <p className="text-base text-foreground">{entry.content}</p>
                      </div>)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">【學生】對話紀錄</h3>
                  <div className="space-y-3">
                    {studentTranscript.map((entry, index) => <div key={index}>
                        <p className="text-base text-foreground">{entry.content}</p>
                      </div>)}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>;
}
