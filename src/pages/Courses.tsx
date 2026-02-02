import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";

const allCourses = [
  {
    title: "Introduction to Machine Learning",
    instructor: "Dr. Sarah Chen",
    duration: "12 hours",
    students: 15420,
    rating: 4.9,
    category: "AI & ML",
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
  {
    title: "Python for Beginners",
    instructor: "Emily Watson",
    duration: "8 hours",
    students: 45230,
    rating: 4.9,
    category: "Programming",
  },
  {
    title: "UI/UX Design Masterclass",
    instructor: "David Kim",
    duration: "15 hours",
    students: 12450,
    rating: 4.6,
    category: "Design",
  },
  {
    title: "Cloud Computing with AWS",
    instructor: "James Miller",
    duration: "20 hours",
    students: 18920,
    rating: 4.8,
    category: "Cloud",
  },
];

const categories = [
  "All",
  "AI & ML",
  "Development",
  "Data Science",
  "Programming",
  "Design",
  "Cloud",
];

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Explore Courses
          </h1>
          <p className="text-muted-foreground">
            Discover over 200+ courses taught by industry experts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No courses found matching your criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Courses;
