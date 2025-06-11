"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/breadcrumb";
import { format } from "date-fns";
import {
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Clock,
  MapPin,
  Search,
} from "lucide-react";
import { useParams } from "react-router";

// Event types categorized by modal type
const EVENT_TYPES = {
  keynoteTypes: ["Keynote", "Ceremony"],
  sessionTypes: ["Technical Session", "Oral Session", "Tutorial Session"],
  breakTypes: ["Break", "Lunch", "Check-in"],
};

// Define interfaces
interface ScheduleEvent {
  id: string;
  title: string;
  type: string;
  day: number;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  speaker?: string;
  chair?: string;
  track?: string;
  papers?: Paper[];
}

interface Paper {
  id: string;
  title: string;
  presenter: string;
  form: string;
  track?: string;
}

interface Track {
  id: string;
  name: string;
}

interface ConferenceDay {
  day: number;
  date: Date;
  title: string;
}

export default function ChairmanSchedulePage() {
  // State for conference data
  const { conferenceId } = useParams<{ conferenceId: string }>();
  console.log(conferenceId);

  // Static data for tracks, conference days, and papers
  // These are not meant to be updated at runtime, so useState is not needed
  const tracks: Track[] = [
    { id: "1", name: "Track A: Deep Learning" },
    { id: "2", name: "Track B: Natural Language Processing" },
    { id: "3", name: "Track C: Computer Vision" },
    { id: "4", name: "Track X: Ethics in AI" },
  ];

  const conferenceDays: ConferenceDay[] = [
    { day: 1, date: new Date("2025-05-15"), title: "Opening & Keynotes" },
    { day: 2, date: new Date("2025-05-16"), title: "Main Conference" },
    { day: 3, date: new Date("2025-05-17"), title: "Main Conference" },
    { day: 4, date: new Date("2025-05-18"), title: "Workshops & Closing" },
  ];

  // Sample papers data
  const allPapers: Paper[] = [
    {
      id: "p1",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      presenter: "Dr. John Doe",
      form: "Presentation",
      track: "1",
    },
    {
      id: "p2",
      title: "Explainable AI: New Approaches for Model Interpretability",
      presenter: "Dr. Emily Rodriguez",
      form: "Poster",
      track: "1",
    },
    {
      id: "p3",
      title: "Reinforcement Learning in Autonomous Systems",
      presenter: "Prof. Michael Chen",
      form: "Presentation",
      track: "2",
    },
    {
      id: "p4",
      title: "Privacy-Preserving Machine Learning Techniques",
      presenter: "Dr. Sarah Johnson",
      form: "Poster",
      track: "4",
    },
    {
      id: "p5",
      title: "Neural Networks for Climate Prediction",
      presenter: "Dr. David Kim",
      form: "Presentation",
      track: "3",
    },
  ];

  // Sample events data (initialize once)
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: "e1",
      title: "Registration & Welcome Coffee",
      type: "Check-in",
      day: 1,
      startTime: "09:00",
      endTime: "09:30",
      location: "Lobby",
      description: "Welcome participants and networking",
    },
    {
      id: "e2",
      title: "Opening Keynote: The Future of AI Research",
      type: "Keynote",
      day: 1,
      startTime: "09:30",
      endTime: "10:30",
      location: "Main Auditorium",
      description: "Welcome participants and networking",
      speaker: "Prof. Alan Turing",
    },
    {
      id: "e3",
      title: "Session 1: Deep Learning Advances",
      type: "Technical Session",
      day: 1,
      startTime: "11:00",
      endTime: "12:30",
      location: "Room A",
      description: "Welcome participants and networking",
      chair: "Dr. Sarah Johnson",
      track: "1",
      papers: [
        {
          id: "p1",
          title:
            "Advances in Transformer Architecture for Multi-modal Learning",
          presenter: "Dr. John Doe",
          form: "Presentation",
        },
        {
          id: "p2",
          title: "Explainable AI: New Approaches for Model Interpretability",
          presenter: "Dr. Emily Rodriguez",
          form: "Poster",
        },
      ],
    },
    {
      id: "e4",
      title: "Session 1: Deep Learning Advances",
      type: "Technical Session",
      day: 1,
      startTime: "11:00",
      endTime: "12:30",
      location: "Room A",
      description: "Welcome participants and networking",
      chair: "Dr. Sarah Johnson",
      track: "2",
      papers: [
        {
          id: "p3",
          title: "Reinforcement Learning in Autonomous Systems",
          presenter: "Prof. Michael Chen",
          form: "Presentation",
          track: "2",
        },
      ],
    },
  ]);

  // UI state
  const [activeDay, setActiveDay] = useState<number>(1);
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [searchPaperQuery, setSearchPaperQuery] = useState("");
  const [selectedPapers, setSelectedPapers] = useState<Paper[]>([]);

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [eventForm, setEventForm] = useState<Partial<ScheduleEvent>>({
    day: 1,
    startTime: "",
    endTime: "",
    type: "",
  });

  // Add track filtering state
  const [activeTrack, setActiveTrack] = useState<string>("all");

  // Function to get track colors
  const getTrackColor = (trackId?: string) => {
    if (!trackId) return "hsl(var(--border))";
    const colors = [
      "hsl(220, 70%, 50%)", // Blue
      "hsl(142, 70%, 45%)", // Green
      "hsl(271, 70%, 50%)", // Purple
      "hsl(25, 70%, 50%)", // Orange
      "hsl(348, 70%, 50%)", // Red
      "hsl(191, 70%, 45%)", // Cyan
    ];
    const index = Number.parseInt(trackId) - 1;
    return colors[index % colors.length] ?? "hsl(var(--border))";
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!showAddEventDialog) {
      setEventForm({
        day: activeDay,
        startTime: "",
        endTime: "",
        type: "",
      });
      setIsEditing(false);
      setSelectedPapers([]);
    }
  }, [showAddEventDialog, activeDay]);

  // Reset track when day changes
  useEffect(() => {
    setActiveTrack("all");
  }, [activeDay]);

  // Filter events by active day
  const filteredEvents = events.filter((event) => event.day === activeDay);

  // Filter papers by search query and track
  const filteredPapers = allPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchPaperQuery.toLowerCase()) ||
      paper.presenter.toLowerCase().includes(searchPaperQuery.toLowerCase());

    // If track is selected, filter by track as well
    const matchesTrack = !eventForm.track || paper.track === eventForm.track;

    return matchesSearch && matchesTrack;
  });

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setEventForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add or update event
  const handleSaveEvent = () => {
    if (
      !eventForm.title ||
      !eventForm.type ||
      !eventForm.startTime ||
      !eventForm.endTime ||
      !eventForm.location
    ) {
      return;
    }

    const newEvent: ScheduleEvent = {
      id: isEditing && eventForm.id ? eventForm.id : `e${Date.now()}`,
      title: eventForm.title,
      type: eventForm.type,
      day: eventForm.day ?? activeDay,
      startTime: eventForm.startTime,
      endTime: eventForm.endTime,
      location: eventForm.location,
      description: eventForm.description ?? "",
      speaker: eventForm.speaker,
      chair: eventForm.chair,
      track: eventForm.track,
      papers: EVENT_TYPES.sessionTypes.includes(eventForm.type)
        ? selectedPapers
        : undefined,
    };

    if (isEditing) {
      setEvents((prev) =>
        prev.map((event) => (event.id === newEvent.id ? newEvent : event)),
      );
    } else {
      setEvents((prev) => [...prev, newEvent]);
    }

    setShowAddEventDialog(false);
  };

  // Delete event
  const handleDeleteEvent = () => {
    if (eventToDelete) {
      setEvents((prev) => prev.filter((event) => event.id !== eventToDelete));
      setEventToDelete(null);
      setShowDeleteConfirmDialog(false);
    }
  };

  // Edit event
  const handleEditEvent = (event: ScheduleEvent) => {
    setEventForm(event);
    setIsEditing(true);
    if (event.papers) {
      setSelectedPapers(event.papers);
    }
    setShowAddEventDialog(true);
  };

  // Toggle paper selection
  const togglePaperSelection = (paper: Paper) => {
    if (selectedPapers.some((p) => p.id === paper.id)) {
      setSelectedPapers((prev) => prev.filter((p) => p.id !== paper.id));
    } else {
      setSelectedPapers((prev) => [...prev, paper]);
    }
  };

  // Export schedule as CSV
  const exportSchedule = () => {
    const headers =
      "ID,Title,Type,Day,Start Time,End Time,Location,Description,Speaker,Chair,Track\n";
    const csvContent = events.reduce((acc, event) => {
      return (
        acc +
        `${event.id},"${event.title}",${event.type},${event.day},${event.startTime},${event.endTime},"${event.location}","${event.description ?? ""}","${event.speaker ?? ""}","${event.chair ?? ""}","${event.track ?? ""}"\n`
      );
    }, headers);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `conference-schedule-export-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import schedule from CSV
  const importSchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target?.result as string;
      const lines = csvData.split("\n");

      const importedEvents: ScheduleEvent[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i]?.trim()) {
          continue;
        }

        const values = lines[i]?.split(",");
        if (!values) {
          continue;
        }
        const event: ScheduleEvent = {
          id: values[0] ?? `imported-${i}`,
          title: values[1]?.replace(/"/g, "") ?? "",
          type: values[2] ?? "",
          day: Number.parseInt(values[3] ?? "0"),
          startTime: values[4] ?? "",
          endTime: values[5] ?? "",
          location: values[6]?.replace(/"/g, "") ?? "",
          description: values[7]?.replace(/"/g, "") ?? "",
          speaker: values[8]?.replace(/"/g, "") ?? "",
          chair: values[9]?.replace(/"/g, "") ?? "",
          track: values[10],
        };

        importedEvents.push(event);
      }

      setEvents(importedEvents);
    };

    reader.readAsText(file);
  };

  // Determine which modal fields to show based on event type
  const showKeynoteFields =
    eventForm.type && EVENT_TYPES.keynoteTypes.includes(eventForm.type);
  const showSessionFields =
    eventForm.type && EVENT_TYPES.sessionTypes.includes(eventForm.type);

  // Filter events by active day and track
  const filteredEventsByTrack = filteredEvents.filter((event) => {
    if (activeTrack === "all") return true;
    return event.track === activeTrack;
  });

  return (
    <>
      <Breadcrumb items={[{ label: "Chairman" }, { label: "Schedule" }]} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Schedule Management</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={exportSchedule}
          >
            <Download className="h-4 w-4" />
            Export Schedule
          </Button>
          <div className="relative">
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={importSchedule}
            />
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import Schedule
            </Button>
          </div>
          <Button
            onClick={() => setShowAddEventDialog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Conference Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Day tabs */}
          <Tabs
            value={activeDay.toString()}
            onValueChange={(value) => setActiveDay(Number.parseInt(value))}
          >
            <TabsList className="grid grid-cols-4 mb-6">
              {conferenceDays.map((day) => (
                <TabsTrigger key={day.day} value={day.day.toString()}>
                  Day {day.day}
                </TabsTrigger>
              ))}
            </TabsList>

            {conferenceDays.map((day) => (
              <TabsContent
                key={day.day}
                value={day.day.toString()}
                className="space-y-4"
              >
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold">
                    Day {day.day} - {day.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {format(day.date, "MMMM d, yyyy")}
                  </p>
                </div>

                {/* Track-based schedule display */}
                <div className="space-y-4">
                  {/* Track tabs */}
                  <div className="border-b">
                    <div className="flex overflow-x-auto scrollbar-hide">
                      <button
                        onClick={() => setActiveTrack("all")}
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                          activeTrack === "all"
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        All Tracks
                      </button>
                      {tracks.map((track) => (
                        <button
                          key={track.id}
                          onClick={() => setActiveTrack(track.id)}
                          className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                            activeTrack === track.id
                              ? "border-primary text-primary"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {track.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Events display */}
                  <div className="min-h-[400px]">
                    {filteredEventsByTrack.length > 0 ? (
                      <div className="space-y-6">
                        {/* Group events by time slot */}
                        {Object.entries(
                          filteredEventsByTrack.reduce(
                            (groups, event) => {
                              const timeKey = `${event.startTime}-${event.endTime}`;

                              groups[timeKey] = [
                                ...(groups[timeKey] ?? []),
                                event,
                              ];
                              return groups;
                            },
                            {} as Record<string, ScheduleEvent[]>,
                          ),
                        )
                          .sort(([timeA], [timeB]) => {
                            const [startA = ""] = timeA?.split("-") ?? [];
                            const [startB = ""] = timeB?.split("-") ?? [];
                            return startA.localeCompare(startB);
                          })
                          .map(([timeKey, timeEvents]) => (
                            <div key={timeKey} className="space-y-4">
                              <div className="flex items-center gap-2 mb-4 bg-muted/30 p-3 rounded-lg">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  {timeKey.replace("-", " - ")}
                                </span>
                                {timeEvents.length > 1 && (
                                  <span className="text-xs text-muted-foreground ml-2">
                                    ({timeEvents.length} events)
                                  </span>
                                )}
                              </div>

                              <div
                                className={`grid gap-4 ${
                                  timeEvents.length === 1
                                    ? "grid-cols-1"
                                    : timeEvents.length === 2
                                      ? "grid-cols-1 lg:grid-cols-2"
                                      : timeEvents.length === 3
                                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                }`}
                              >
                                {timeEvents.map((event) => (
                                  <div
                                    key={event.id}
                                    className="border rounded-lg p-4 relative h-full bg-card"
                                    style={{
                                      borderLeftWidth: "4px",
                                      borderLeftColor: getTrackColor(
                                        event.track,
                                      ),
                                    }}
                                  >
                                    <div className="absolute right-4 top-4 flex gap-1">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditEvent(event)}
                                      >
                                        <Edit className="h-3 w-3" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                          setEventToDelete(event.id);
                                          setShowDeleteConfirmDialog(true);
                                        }}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                        <span className="sr-only">Delete</span>
                                      </Button>
                                    </div>

                                    <div className="flex flex-col gap-2 mb-3 pr-16">
                                      <Badge
                                        variant={
                                          EVENT_TYPES.keynoteTypes.includes(
                                            event.type,
                                          )
                                            ? "default"
                                            : EVENT_TYPES.sessionTypes.includes(
                                                  event.type,
                                                )
                                              ? "secondary"
                                              : "outline"
                                        }
                                        className="text-xs font-medium w-fit"
                                      >
                                        {event.type}
                                      </Badge>

                                      {event.track && activeTrack === "all" && (
                                        <Badge
                                          variant="outline"
                                          className="text-xs w-fit"
                                          style={{
                                            borderColor: getTrackColor(
                                              event.track,
                                            ),
                                            color: getTrackColor(event.track),
                                          }}
                                        >
                                          {tracks.find(
                                            (t) => t.id === event.track,
                                          )?.name ?? `Track ${event.track}`}
                                        </Badge>
                                      )}
                                    </div>

                                    <h3 className="text-base font-semibold mb-2 pr-16 leading-tight">
                                      {event.title}
                                    </h3>

                                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                                      <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                                      <span className="truncate">
                                        {event.location}
                                      </span>
                                    </div>

                                    {event.description && (
                                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {event.description}
                                      </p>
                                    )}

                                    {event.speaker && (
                                      <div className="text-sm mb-2">
                                        <span className="font-medium">
                                          Speaker:
                                        </span>
                                        <span className="ml-1 truncate">
                                          {event.speaker}
                                        </span>
                                      </div>
                                    )}

                                    {event.chair && (
                                      <div className="text-sm mb-2">
                                        <span className="font-medium">
                                          Chair:
                                        </span>
                                        <span className="ml-1 truncate">
                                          {event.chair}
                                        </span>
                                      </div>
                                    )}

                                    {event.papers &&
                                      event.papers.length > 0 && (
                                        <div className="mt-4">
                                          <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-medium">
                                              Papers
                                            </h4>
                                            <Badge
                                              variant="secondary"
                                              className="text-xs"
                                            >
                                              {event.papers.length}
                                            </Badge>
                                          </div>
                                          <div className="space-y-1 max-h-32 overflow-y-auto">
                                            {event.papers.map(
                                              (paper, index) => (
                                                <div
                                                  key={paper.id}
                                                  className="text-xs p-2 bg-muted/50 rounded border"
                                                >
                                                  <div
                                                    className="font-medium truncate"
                                                    title={paper.title}
                                                  >
                                                    {index + 1}. {paper.title}
                                                  </div>
                                                  <div className="text-muted-foreground mt-1">
                                                    {paper.presenter} •{" "}
                                                    {paper.form}
                                                  </div>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border rounded-lg">
                        <p className="text-muted-foreground">
                          {activeTrack === "all"
                            ? "No events scheduled for this day."
                            : `No events scheduled for ${tracks.find((t) => t.id === activeTrack)?.name ?? "this track"} on this day.`}
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => setShowAddEventDialog(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Add/Edit Event Dialog */}
      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Schedule Event" : "Add Schedule Event"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  placeholder="Enter event title"
                  value={eventForm.title ?? ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select
                  value={eventForm.type ?? ""}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Keynote">Keynote</SelectItem>
                    <SelectItem value="Ceremony">Ceremony</SelectItem>
                    <SelectItem value="Technical Session">
                      Technical Session
                    </SelectItem>
                    <SelectItem value="Oral Session">Oral Session</SelectItem>
                    <SelectItem value="Tutorial Session">
                      Tutorial Session
                    </SelectItem>
                    <SelectItem value="Break">Break</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Check-in">Check-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-day">Day</Label>
                <Select
                  value={eventForm.day?.toString() ?? activeDay.toString()}
                  onValueChange={(value) =>
                    handleInputChange("day", Number.parseInt(value).toString())
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conferenceDays.map((day) => (
                      <SelectItem key={day.day} value={day.day.toString()}>
                        Day {day.day} - {format(day.date, "MMM d")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={eventForm.startTime ?? ""}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={eventForm.endTime ?? ""}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location / Room</Label>
              <Input
                id="location"
                placeholder="Enter location or room"
                value={eventForm.location ?? ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            {/* Conditional fields based on event type */}
            {showKeynoteFields && (
              <div className="space-y-2">
                <Label htmlFor="speaker">Speaker</Label>
                <Input
                  id="speaker"
                  placeholder="Enter speaker name"
                  value={eventForm.speaker ?? ""}
                  onChange={(e) => handleInputChange("speaker", e.target.value)}
                />
              </div>
            )}

            {showSessionFields && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chair">Session Chair</Label>
                    <Input
                      id="chair"
                      placeholder="Enter session chair name"
                      value={eventForm.chair ?? ""}
                      onChange={(e) =>
                        handleInputChange("chair", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="track">Track</Label>
                    <Select
                      value={eventForm.track ?? ""}
                      onValueChange={(value) =>
                        handleInputChange("track", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select track" />
                      </SelectTrigger>
                      <SelectContent>
                        {tracks.map((track) => (
                          <SelectItem key={track.id} value={track.id}>
                            {track.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Papers</Label>
                  <div className="border rounded-md p-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by Paper ID, Author, Title..."
                        className="pl-10"
                        value={searchPaperQuery}
                        onChange={(e) => setSearchPaperQuery(e.target.value)}
                      />
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">Select</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Presenter</TableHead>
                            <TableHead>Form</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredPapers.map((paper) => (
                            <TableRow
                              key={paper.id}
                              className={
                                selectedPapers.some((p) => p.id === paper.id)
                                  ? "bg-muted/50"
                                  : ""
                              }
                            >
                              <TableCell>
                                <input
                                  type="checkbox"
                                  checked={selectedPapers.some(
                                    (p) => p.id === paper.id,
                                  )}
                                  onChange={() => togglePaperSelection(paper)}
                                  className="h-4 w-4"
                                />
                              </TableCell>
                              <TableCell>{paper.title}</TableCell>
                              <TableCell>{paper.presenter}</TableCell>
                              <TableCell>{paper.form}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="mt-2 text-sm text-muted-foreground">
                      {selectedPapers.length} papers selected
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the event"
                value={eventForm.description ?? ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddEventDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={showDeleteConfirmDialog}
        onOpenChange={setShowDeleteConfirmDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event from the schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
