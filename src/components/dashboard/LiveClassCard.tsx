import { Button } from "@/components/ui/button";
import { Video, Users, Clock, Mic } from "lucide-react";

interface LiveClassCardProps {
  title: string;
  instructor: string;
  startTime: string;
  attendees: number;
  isLive?: boolean;
  topic: string;
}

export function LiveClassCard({
  title,
  instructor,
  startTime,
  attendees,
  isLive = false,
  topic,
}: LiveClassCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {/* Live indicator */}
      {isLive && (
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-destructive px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive-foreground opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive-foreground" />
          </span>
          <span className="text-xs font-medium text-destructive-foreground">
            LIVE
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
        <Video className="h-6 w-6 text-accent" />
      </div>

      {/* Content */}
      <div className="mb-4">
        <span className="mb-2 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {topic}
        </span>
        <h3 className="mb-1 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">with {instructor}</p>
      </div>

      {/* Stats */}
      <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {startTime}
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {attendees} joined
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button variant={isLive ? "hero" : "default"} className="flex-1">
          <Video className="h-4 w-4" />
          {isLive ? "Join Now" : "Set Reminder"}
        </Button>
        <Button variant="ghost" size="icon">
          <Mic className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
