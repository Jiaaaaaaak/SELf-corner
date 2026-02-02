import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
}: StatsCardProps) {
  const changeColors = {
    positive: "text-green-600",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <div className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeColors[changeType]}`}>
            {change}
          </span>
        )}
      </div>
      <p className="mb-1 text-2xl font-bold text-card-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}
