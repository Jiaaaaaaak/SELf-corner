import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const radarData = [
  { subject: "清晰度", value: 80 },
  { subject: "互動性", value: 65 },
  { subject: "內容", value: 90 },
  { subject: "節奏", value: 70 },
  { subject: "表達", value: 85 },
];

export default function Feedback() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  const handleChatWithExpert = () => {
    // TODO: Implement expert chat functionality
    console.log("Chat with expert:", userInput);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex gap-6 h-[calc(100vh-3rem)]">
        {/* Left Side - Radar Chart */}
        <div className="w-1/2 flex flex-col">
          <h1 className="text-2xl font-semibold mb-6">專家回饋</h1>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                />
                <Radar
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/chatroom")}
            >
              重試一次
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/home")}
            >
              回首頁
            </Button>
          </div>
        </div>

        {/* Right Side - Feedback Content */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Expert Feedback Display */}
          <div className="flex-1 border-2 border-dashed border-muted-foreground/30 rounded-lg p-4">
            <p className="text-muted-foreground">專家意見內容........</p>
            <p className="mt-4 text-sm text-muted-foreground/70">
              根據您的教學表現，建議可以在互動性方面加強。整體內容組織良好，表達清晰。
            </p>
          </div>

          {/* User Input Area */}
          <div className="border rounded-lg p-4 space-y-3">
            <Textarea
              placeholder="輸入文字..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleChatWithExpert}>
                與專家對話
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
