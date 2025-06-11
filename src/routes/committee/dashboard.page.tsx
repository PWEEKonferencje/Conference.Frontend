import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/breadcrumb";
import { Calendar, Users } from "lucide-react";
import { useParams } from "react-router";

export interface ConferenceTrack {
  name: string;
  papers: number;
  caretaker: string;
}

export default function CommitteeDashboardPage() {
  const { conferenceId } = useParams<{ conferenceId: string }>();
  console.log(conferenceId);
  const conference = {
    id: conferenceId,
    title: "Natural Network in Health Care",
    date: "May 15-18, 2025",
    location: "MIT, MAIN CAMPUS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    stats: {
      totalPapers: 42,
      underReview: 28,
      reviewsCompleted: 156,
      pendingDecisions: 12,
    },
    tracks: [
      {
        name: "Deep Learning",
        papers: 12,
        caretaker: "Dr. Sarah Johnson (You)",
      },
      {
        name: "Natural Language Processing",
        papers: 8,
        caretaker: "Dr. Emily Rodriguez",
      },
      { name: "Computer Vision", papers: 10, caretaker: "Dr. Emily Rodriguez" },
    ],
    chairmen: ["Dr. Aleksandra Nowak", "Prof. Jan Kowalski"],
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Committee" }, { label: "Dashboard" }]} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{conference.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {conference.date}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {conference.location}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-full space-y-6">
            {/* Conference Details */}
            <Card>
              <CardHeader>
                <CardTitle>Conference Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {conference.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}

            {/* Conference Tracks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conference Tracks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conference.tracks.map((track, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{track.name}</h3>
                          <Badge variant="secondary">
                            {track.papers} papers
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Caretaker: {track.caretaker}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chairmen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {conference.chairmen.map((chairman, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{chairman}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Notifications Sidebar */}
        </div>
      </div>
    </>
  );
}
