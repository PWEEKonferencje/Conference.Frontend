import type React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  FileText,
  Users,
  BarChart3,
  Award,
  Globe,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function RootPage() {
  // Featured conferences - would come from a database in a real app
  const featuredConferences = [
    {
      id: 1,
      name: "International AI & Machine Learning Summit",
      date: "June 15-18, 2025",
      location: "Amsterdam, Netherlands",
      papers: 342,
      attendees: 1200,
      deadline: "March 30, 2025",
      tags: ["AI", "Machine Learning", "Data Science"],
    },
    {
      id: 2,
      name: "Global Climate Change Conference",
      date: "September 5-9, 2025",
      location: "Barcelona, Spain",
      papers: 256,
      attendees: 850,
      deadline: "May 15, 2025",
      tags: ["Climate", "Sustainability", "Environment"],
    },
    {
      id: 3,
      name: "Medical Innovations Symposium",
      date: "October 22-25, 2025",
      location: "Boston, USA",
      papers: 189,
      attendees: 750,
      deadline: "July 1, 2025",
      tags: ["Healthcare", "Medicine", "Research"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-b from-background to-background/80 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="container px-4 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tight">
                conferenc<span className="text-primary">.EE</span>
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link to="/setup">
                <Button>Sign in</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Conference Management,{" "}
                  <span className="text-primary">Simplified</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  A unified platform for managing the full conference lifecycle,
                  from submissions to scheduling.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/setup">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/demo/chairman"></Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Conference Dashboard Preview"
                className="rounded-lg shadow-2xl border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Everything You Need in One Platform
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Streamline your conference management with our comprehensive suite
              of tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Paper Management"
              description="Easily submit, track, and manage papers. Get feedback and access previous versions."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Peer Review"
              description="Anonymous peer review made easy. Efficiently assign papers to reviewers with expertise matching."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Scheduling"
              description="Create and easily share your conference schedule with participants. Avoid conflicts automatically."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-primary" />}
              title="Analytics"
              description="Efficiently manage submissions, track reviewer progress, and monitor key conference metrics."
            />
          </div>
        </div>
      </section>

      {/* Featured Conferences */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Featured Conferences
              </h2>
              <p className="text-muted-foreground">
                Discover upcoming academic and professional events
              </p>
            </div>
            <Link to="/conferences">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredConferences.map((conference) => (
              <Card
                key={conference.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {conference.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="line-clamp-2">
                    {conference.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {conference.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{conference.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{conference.papers} Papers</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{conference.attendees} Attendees</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Deadline: {conference.deadline}
                    </span>
                  </div>
                  <Link to={`/conferences/${conference.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Access Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Tailored for Every Role
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Specialized interfaces and tools for each conference stakeholder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard
              title="Chairman"
              description="Manage conferences, view statistics, and oversee the entire process"
              icon={<Award className="h-8 w-8" />}
            />
            <RoleCard
              title="Science Committee"
              description="Review submissions, assign reviewers, and make acceptance decisions"
              icon={<Users className="h-8 w-8" />}
            />
            <RoleCard
              title="Participant"
              description="Submit papers, track status, and view reviewer feedback"
              icon={<FileText className="h-8 w-8" />}
            />
            <RoleCard
              title="Reviewer"
              description="Evaluate assigned papers and provide anonymous feedback"
              icon={<CheckCircle2 className="h-8 w-8" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 border-y">
        <div className="container px-4 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Simplify Your Conference Management?
          </h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto mb-8">
            Join thousands of conference organizers who have streamlined their
            workflow with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/setup">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center mb-4">
                <h1 className="text-xl font-bold tracking-tight">
                  conferenc<span className="text-primary">.EE</span>
                </h1>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                A unified platform for managing the full conference lifecycle.
              </p>
            </div>
          </div>
          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} conferenc.EE. All rights
              reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border bg-card hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function RoleCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border bg-card hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="p-2 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
