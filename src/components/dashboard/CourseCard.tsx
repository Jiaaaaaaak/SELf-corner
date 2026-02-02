import { Button } from "@/components/ui/button";
import { Clock, Users, Star, BookOpen } from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  category: string;
  progress?: number;
  imageUrl?: string;
}

export function CourseCard({
  title,
  instructor,
  duration,
  students,
  rating,
  category,
  progress,
}: CourseCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      {/* Image placeholder with gradient */}
      <div className="relative h-40 bg-gradient-to-br from-secondary to-secondary/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-card-foreground backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-card/90 backdrop-blur-sm">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">by {instructor}</p>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {students.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            {rating.toFixed(1)}
          </div>
        </div>

        {/* Progress bar (if enrolled) */}
        {progress !== undefined && (
          <div className="mb-4">
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action button */}
        <Button
          variant={progress !== undefined ? "default" : "hero"}
          className="w-full"
        >
          {progress !== undefined ? "Continue Learning" : "Start Course"}
        </Button>
      </div>
    </div>
  );
}
