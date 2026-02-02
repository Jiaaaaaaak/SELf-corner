import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-24">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-secondary/80" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="container relative mx-auto">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm text-primary-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary">AI-Powered Learning</span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight text-secondary-foreground md:text-5xl lg:text-6xl">
              Learn Smarter with{" "}
              <span className="text-primary">AI Assistance</span>
            </h1>
            
            <p className="max-w-lg text-lg text-muted-foreground">
              Experience the future of education with personalized AI tutoring, 
              interactive live classes, and a supportive learning community.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl">
                <Play className="h-5 w-5" />
                Start Learning
              </Button>
              <Button variant="glass" size="xl">
                Explore Courses
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-secondary-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-secondary-foreground">200+</p>
                <p className="text-sm text-muted-foreground">Expert Courses</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-secondary-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>
          
          {/* Right content - Illustration */}
          <div className="relative hidden md:block">
            <div className="relative mx-auto aspect-square max-w-md">
              {/* Main circle */}
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-primary/30" />
              <div className="absolute inset-12 rounded-full border-2 border-primary/20" />
              
              {/* Floating cards */}
              <div className="absolute left-0 top-1/4 animate-pulse rounded-xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">AI Tutor</p>
                    <p className="text-xs text-muted-foreground">Ready to help</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 right-0 animate-pulse rounded-xl bg-card p-4 shadow-lg" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                    <Play className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Live Class</p>
                    <p className="text-xs text-muted-foreground">Starting soon</p>
                  </div>
                </div>
              </div>
              
              {/* Center logo */}
              <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
