import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Search,
  TrendingUp,
  Award,
} from "lucide-react";

const discussions = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "SC",
    title: "Tips for understanding backpropagation in neural networks",
    content:
      "I've been struggling with the math behind backpropagation. Can anyone share some resources or explanations that helped them understand it better?",
    likes: 42,
    replies: 18,
    time: "2 hours ago",
    tag: "Deep Learning",
  },
  {
    id: 2,
    author: "Alex Johnson",
    avatar: "AJ",
    title: "Best practices for React state management in 2024",
    content:
      "With so many options available (Redux, Zustand, Jotai, etc.), what are your go-to solutions for state management in React projects?",
    likes: 67,
    replies: 34,
    time: "5 hours ago",
    tag: "React",
  },
  {
    id: 3,
    author: "Emily Watson",
    avatar: "EW",
    title: "Study group for AWS Solutions Architect certification",
    content:
      "Looking to form a study group for the AWS SAA-C03 exam. Anyone interested in joining? We can meet weekly on Zoom.",
    likes: 28,
    replies: 12,
    time: "1 day ago",
    tag: "Certification",
  },
];

const topContributors = [
  { name: "Dr. Sarah Chen", points: 2450, avatar: "SC" },
  { name: "Alex Johnson", points: 1890, avatar: "AJ" },
  { name: "Michael Lee", points: 1650, avatar: "ML" },
  { name: "Emily Watson", points: 1420, avatar: "EW" },
  { name: "David Kim", points: 1280, avatar: "DK" },
];

const Community = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Community
            </h1>
            <p className="text-muted-foreground">
              Connect, share, and learn together
            </p>
          </div>
          <Button variant="hero">
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search discussions..." className="pl-10" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Discussions */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trending Discussions
            </div>

            {discussions.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50"
              >
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-medium text-card-foreground">
                        {post.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.time}
                      </span>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {post.tag}
                    </span>
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {post.content}
                </p>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {post.replies}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-card-foreground">
                  Top Contributors
                </h3>
              </div>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.name}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center text-sm font-bold text-muted-foreground">
                      #{index + 1}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {contributor.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {contributor.name}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {contributor.points.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold text-card-foreground">
                Community Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">50K+</p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">1.2K</p>
                  <p className="text-xs text-muted-foreground">Discussions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">15K</p>
                  <p className="text-xs text-muted-foreground">Answers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-xs text-muted-foreground">Helpful</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
