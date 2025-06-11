import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { CalendarIcon, SearchIcon, FilterIcon } from "lucide-react";

export default function ConferencesPage() {
  return (
    <div className="page-container">
      <div className="section-spacing">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Conferences</h1>
          <Button className="button-spacing">
            <CalendarIcon className="h-4 w-4" />
            Create Conference
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conferences..." className="pl-10" />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="button-spacing">
              <FilterIcon className="h-4 w-4" />
              Filter
            </Button>
            <select className="border rounded-md px-3 py-2 bg-background">
              <option>All Dates</option>
              <option>Upcoming</option>
              <option>Past</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferences.map((conference, index) => (
            <ConferenceCard key={index} conference={conference} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface Conference {
  title: string;
  date: string;
  location: string;
  description: string;
  status: "upcoming" | "active" | "completed";
  categories: string[];
}

function ConferenceCard({ conference }: { conference: Conference }) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>{conference.title}</CardTitle>
        <CardDescription>
          {conference.date} • {conference.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {conference.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {conference.categories.map((category, index) => (
            <Badge key={index} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Badge
          variant={
            conference.status === "upcoming"
              ? "outline"
              : conference.status === "active"
                ? "default"
                : "secondary"
          }
        >
          {conference.status === "upcoming"
            ? "Upcoming"
            : conference.status === "active"
              ? "Active"
              : "Completed"}
        </Badge>
        <Link href={`/demo/chairman`}>
          <Button variant="outline">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// Sample conference data
const conferences: Conference[] = [
  {
    title: "AI Research Conference 2025",
    date: "May 15-18, 2025",
    location: "Virtual Conference",
    description:
      "Focusing on the latest advancements in artificial intelligence research, including machine learning, natural language processing, and computer vision.",
    status: "upcoming",
    categories: ["AI", "Machine Learning", "Research"],
  },
  {
    title: "Web Development Summit",
    date: "June 10-12, 2025",
    location: "Berlin, Germany",
    description:
      "A conference for web developers to share knowledge about the latest technologies and best practices in web development.",
    status: "upcoming",
    categories: ["Web Development", "JavaScript", "Frontend"],
  },
  {
    title: "Quantum Computing Symposium",
    date: "April 5-8, 2025",
    location: "Tokyo, Japan",
    description:
      "Exploring the latest research and applications in quantum computing and quantum information science.",
    status: "upcoming",
    categories: ["Quantum Computing", "Physics", "Research"],
  },
  {
    title: "Cybersecurity Conference",
    date: "March 20-22, 2025",
    location: "London, UK",
    description:
      "Addressing the latest threats, vulnerabilities, and solutions in cybersecurity for organizations and individuals.",
    status: "active",
    categories: ["Cybersecurity", "Privacy", "IT Security"],
  },
  {
    title: "Data Science Forum",
    date: "February 15-17, 2025",
    location: "San Francisco, USA",
    description:
      "Bringing together data scientists, analysts, and engineers to discuss the latest trends and techniques in data science.",
    status: "active",
    categories: ["Data Science", "Analytics", "Big Data"],
  },
  {
    title: "Mobile Development Conference",
    date: "January 10-12, 2025",
    location: "Barcelona, Spain",
    description:
      "Focusing on mobile app development for iOS, Android, and cross-platform frameworks.",
    status: "completed",
    categories: ["Mobile Development", "iOS", "Android"],
  },
];
