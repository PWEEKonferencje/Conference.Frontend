import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";

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
  papers?: {
    id: string;
    title: string;
    presenter: string;
    form: string;
  }[];
}

interface ScheduleViewerProps {
  events: ScheduleEvent[];
  conferenceDays: {
    day: number;
    date: Date;
    title: string;
  }[];
  tracks: {
    id: string;
    name: string;
  }[];
  showExportOnly?: boolean;
}

export function ScheduleViewer({
  events,
  conferenceDays,
  tracks,
  showExportOnly = false,
}: ScheduleViewerProps) {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [activeTrack, setActiveTrack] = useState<string>("all");

  const filteredEvents = events.filter((event) => {
    const matchesDay = event.day === activeDay;
    const matchesTrack = activeTrack === "all" || event.track === activeTrack;
    return matchesDay && matchesTrack;
  });

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

  const getTrackColor = (trackId?: string) => {
    if (!trackId) return "hsl(var(--border))";
    const colors = [
      "hsl(220, 70%, 50%)", // Blue
      "hsl(142, 70%, 45%)", // Green
      "hsl(271, 70%, 50%)", // Purple
      "hsl(25, 70%, 50%)", // Orange
    ];
    const index = Number.parseInt(trackId) - 1;
    return colors[index % colors.length] ?? "hsl(var(--border))";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Conference Schedule</h1>
        {showExportOnly && (
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={exportSchedule}
          >
            <Download className="h-4 w-4" />
            Export Schedule
          </Button>
        )}
      </div>

      <Card>
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
                  {filteredEvents.length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(
                        filteredEvents.reduce(
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
                          const [startA = ""] = timeA.split("-");
                          const [startB = ""] = timeB.split("-");
                          return startA.localeCompare(startB);
                        })
                        .map(([timeKey, timeEvents]) => (
                          <div key={timeKey} className="space-y-4">
                            <div className="flex items-center gap-2 mb-4 bg-muted/30 p-3 rounded-lg">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                {timeKey.replace("-", " - ")}
                              </span>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {timeEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className="border rounded-lg p-4 h-full bg-card"
                                  style={{
                                    borderLeftWidth: "4px",
                                    borderLeftColor: getTrackColor(event.track),
                                  }}
                                >
                                  <div className="flex flex-col gap-2 mb-3">
                                    <Badge
                                      variant="secondary"
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

                                  <h3 className="text-base font-semibold mb-2 leading-tight">
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
                                      <span className="ml-1">
                                        {event.speaker}
                                      </span>
                                    </div>
                                  )}

                                  {event.chair && (
                                    <div className="text-sm mb-2">
                                      <span className="font-medium">
                                        Chair:
                                      </span>
                                      <span className="ml-1">
                                        {event.chair}
                                      </span>
                                    </div>
                                  )}

                                  {event.papers && event.papers.length > 0 && (
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
                                      <div className="border rounded-md overflow-hidden">
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead className="text-xs">
                                                No
                                              </TableHead>
                                              <TableHead className="text-xs">
                                                Title
                                              </TableHead>
                                              <TableHead className="text-xs">
                                                Presenter
                                              </TableHead>
                                              <TableHead className="text-xs">
                                                Form
                                              </TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            {event.papers.map(
                                              (paper, index) => (
                                                <TableRow key={paper.id}>
                                                  <TableCell className="text-xs">
                                                    {index + 1}
                                                  </TableCell>
                                                  <TableCell
                                                    className="text-xs truncate"
                                                    title={paper.title}
                                                  >
                                                    {paper.title}
                                                  </TableCell>
                                                  <TableCell className="text-xs">
                                                    {paper.presenter}
                                                  </TableCell>
                                                  <TableCell className="text-xs">
                                                    {paper.form}
                                                  </TableCell>
                                                </TableRow>
                                              ),
                                            )}
                                          </TableBody>
                                        </Table>
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
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
