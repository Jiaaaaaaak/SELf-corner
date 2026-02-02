import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Teaching() {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleEnd = () => {
    setIsStarted(false);
    setIsPaused(false);
    navigate("/feedback");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex gap-6 h-[calc(100vh-3rem)]">
        {/* Main Content Area - Video/Teaching Placeholder */}
        <div className="flex-1 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">
            {isStarted ? (isPaused ? "已暫停" : "教學進行中...") : "等待開始"}
          </span>
        </div>

        {/* Right Sidebar - Control Buttons */}
        <div className="w-24 flex flex-col gap-3 justify-center">
          <Button
            variant="default"
            className="h-14"
            onClick={handleStart}
            disabled={isStarted && !isPaused}
          >
            開始
          </Button>
          <Button
            variant="outline"
            className="h-14"
            onClick={handlePause}
            disabled={!isStarted}
          >
            暫停
          </Button>
          <Button
            variant="default"
            className="h-14"
            onClick={handleEnd}
            disabled={!isStarted}
          >
            結束
          </Button>
        </div>
      </div>
    </div>
  );
}
