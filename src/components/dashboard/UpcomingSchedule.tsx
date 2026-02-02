import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, BookOpen, ChevronRight } from "lucide-react";

interface ScheduleItem {
  id: number;
  title: string;
  type: "class" | "assignment" | "meeting";
  time: string;
  date: string;
}

const scheduleItems: ScheduleItem[] = [
  {
    id: 1,
    title: "Advanced Machine Learning",
    type: "class",
    time: "10:00 AM",
    date: "Today",
  },
  {
    id: 2,
    title: "Submit Python Project",
    type: "assignment",
    time: "11:59 PM",
    date: "Today",
  },
  {
    id: 3,
    title: "Data Structures Review",
    type: "class",
    time: "2:00 PM",
    date: "Tomorrow",
  },
  {
    id: 4,
    title: "Study Group: Algorithms",
    type: "meeting",
    time: "4:00 PM",
    date: "Tomorrow",
  },
];

const typeIcons = {
  class: Video,
  assignment: BookOpen,
  meeting: Calendar,
};

const typeColors = {
  class: "bg-accent/10 text-accent",
  assignment: "bg-primary/10 text-primary",
  meeting: "bg-secondary text-secondary-foreground",
};

export function UpcomingSchedule() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">
          Upcoming Schedule
        </h3>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {scheduleItems.map((item) => {
          const Icon = typeIcons[item.type];
          return (
            <div
              key={item.id}
              className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${typeColors[item.type]}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-card-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.time} • {item.date}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
