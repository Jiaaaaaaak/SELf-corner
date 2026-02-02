import { Layout } from "@/components/layout/Layout";
import { LiveClassCard } from "@/components/dashboard/LiveClassCard";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Clock } from "lucide-react";

const liveClasses = [
  {
    title: "Building Neural Networks from Scratch",
    instructor: "Dr. Sarah Chen",
    startTime: "Live Now",
    attendees: 234,
    isLive: true,
    topic: "Deep Learning",
  },
  {
    title: "React Advanced Patterns",
    instructor: "Alex Johnson",
    startTime: "In 2 hours",
    attendees: 156,
    isLive: false,
    topic: "Frontend",
  },
  {
    title: "Introduction to Kubernetes",
    instructor: "James Miller",
    startTime: "Today, 4:00 PM",
    attendees: 89,
    isLive: false,
    topic: "DevOps",
  },
  {
    title: "Python Data Visualization",
    instructor: "Emily Watson",
    startTime: "Today, 6:00 PM",
    attendees: 124,
    isLive: false,
    topic: "Data Science",
  },
  {
    title: "UI Animation with Framer Motion",
    instructor: "David Kim",
    startTime: "Tomorrow, 10:00 AM",
    attendees: 67,
    isLive: false,
    topic: "Design",
  },
  {
    title: "AWS Lambda Deep Dive",
    instructor: "James Miller",
    startTime: "Tomorrow, 2:00 PM",
    attendees: 98,
    isLive: false,
    topic: "Cloud",
  },
];

const LiveClasses = () => {
  const liveNow = liveClasses.filter((c) => c.isLive);
  const upcoming = liveClasses.filter((c) => !c.isLive);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Live Classes
            </h1>
            <p className="text-muted-foreground">
              Join interactive sessions with expert instructors
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              My Schedule
            </Button>
            <Button variant="hero">
              <Video className="mr-2 h-4 w-4" />
              Start Teaching
            </Button>
          </div>
        </div>

        {/* Live Now Section */}
        {liveNow.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive" />
              </span>
              <h2 className="text-xl font-bold text-foreground">
                Happening Now
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liveNow.map((liveClass, index) => (
                <LiveClassCard key={index} {...liveClass} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Section */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold text-foreground">
              Upcoming Classes
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((liveClass, index) => (
              <LiveClassCard key={index} {...liveClass} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LiveClasses;
