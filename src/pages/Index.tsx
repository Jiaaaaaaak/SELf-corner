import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { LiveClassCard } from "@/components/dashboard/LiveClassCard";
import { AITutorWidget } from "@/components/dashboard/AITutorWidget";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UpcomingSchedule } from "@/components/dashboard/UpcomingSchedule";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  ChevronRight,
  Flame,
} from "lucide-react";

const featuredCourses = [
  {
    title: "Introduction to Machine Learning",
    instructor: "Dr. Sarah Chen",
    duration: "12 hours",
    students: 15420,
    rating: 4.9,
    category: "AI & ML",
    progress: 65,
  },
  {
    title: "Full-Stack Web Development",
    instructor: "Alex Johnson",
    duration: "24 hours",
    students: 28350,
    rating: 4.8,
    category: "Development",
  },
  {
    title: "Data Science Fundamentals",
    instructor: "Prof. Michael Lee",
    duration: "18 hours",
    students: 21890,
    rating: 4.7,
    category: "Data Science",
  },
];

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
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Courses Enrolled"
            value="12"
            change="+3 this month"
            changeType="positive"
            icon={BookOpen}
          />
          <StatsCard
            title="Hours Learned"
            value="156"
            change="+24 this week"
            changeType="positive"
            icon={Clock}
          />
          <StatsCard
            title="Achievements"
            value="28"
            change="+5 new"
            changeType="positive"
            icon={Trophy}
          />
          <StatsCard
            title="Learning Streak"
            value="14 days"
            icon={Flame}
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Courses & Classes */}
          <div className="space-y-8 lg:col-span-2">
            {/* Continue Learning */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Continue Learning
                </h2>
                <Button variant="ghost" className="text-primary">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {featuredCourses.slice(0, 2).map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </div>
            </div>

            {/* Live Classes */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Live Classes
                </h2>
                <Button variant="ghost" className="text-primary">
                  View Schedule
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {liveClasses.map((liveClass, index) => (
                  <LiveClassCard key={index} {...liveClass} />
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Recommended for You
                </h2>
                <Button variant="ghost" className="text-primary">
                  Explore More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredCourses.map((course, index) => (
                  <CourseCard key={index} {...course} progress={undefined} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - AI Tutor & Schedule */}
          <div className="space-y-8">
            <AITutorWidget />
            <UpcomingSchedule />
            
            {/* Learning Progress */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Weekly Goal
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    8 of 10 hours completed
                  </p>
                </div>
              </div>
              <div className="mb-2 h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: "80%" }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                2 more hours to reach your goal! 🎯
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
