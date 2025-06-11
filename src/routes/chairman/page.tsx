"use client";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/breadcrumb";
import { useParams } from "react-router";

interface ConferenceTrack {
  name: string;
  papers: number;
  caretaker: string;
}

export default function ChairmanDashboardPage() {
  const { conferenceId } = useParams<{ conferenceId: string }>();
  const conference = {
    id: conferenceId,
    title: "AI Research Conference 2025",
    date: "May 15-18, 2025",
    type: "Virtual Conference",
    description:
      "This conference focuses on the latest advancements in artificial intelligence research, including machine learning, natural language processing, and computer vision.",
    stats: {
      submissions: 42,
      acceptedPapers: 28,
      participants: 156,
      tracks: 6,
      acceptanceRate: 67,
    },
    tracks: [
      { name: "Deep Learning", papers: 12, caretaker: "Dr. Sarah Johnson" },
      {
        name: "Natural Language Processing",
        papers: 8,
        caretaker: "Unassigned",
      },
      { name: "Computer Vision", papers: 10, caretaker: "Unassigned" },
      { name: "Deep Learning", papers: 12, caretaker: "Dr. Sarah Johnson" },
      {
        name: "Natural Language Processing",
        papers: 8,
        caretaker: "Unassigned",
      },
      { name: "Computer Vision", papers: 10, caretaker: "Unassigned" },
    ],
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Chairman" }, { label: "Dashboard" }]} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chairman Dashboard</h1>
        <Button className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          Share Conference
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-bold">{conference.title}</h2>
          <p className="text-sm text-gray-500">
            {conference.date} • {conference.type}
          </p>
          <p className="mt-4">{conference.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Submissions"
          value={conference.stats.submissions}
          subtitle={`Across ${conference.stats.tracks} tracks`}
        />
        <StatCard
          title="Accepted Papers"
          value={conference.stats.acceptedPapers}
          subtitle={`${conference.stats.acceptanceRate}% acceptance rate`}
        />
        <StatCard
          title="Registered Participants"
          value={conference.stats.participants}
          subtitle="Currently registered"
        />
      </div>

      <h2 className="text-xl font-bold mb-2">Conference Tracks</h2>
      <p className="text-sm text-gray-500 mb-6">
        Research areas and submission statistics
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {conference.tracks.map((track, index) => (
          <TrackCard key={index} track={track} />
        ))}
      </div>
    </>
  );
}

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: number;
  subtitle: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function TrackCard({ track }: { track: ConferenceTrack }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{track.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-lg font-semibold">{track.papers} papers</p>
          <p className="text-xs text-gray-500">Caretaker: {track.caretaker}</p>
        </div>
      </CardContent>
    </Card>
  );
}
