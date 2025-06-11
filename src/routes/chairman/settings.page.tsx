"use client";

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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/breadcrumb";
import { CalendarIcon, Save, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { useParams } from "react-router";

interface ConferenceSettings {
  general: {
    conferenceName: string;
    codename: string;
    description: string;
    location: string;
    timezone: string;
    website: string;
  };
  tracks: string[];
  timeline: {
    id: string;
    eventName: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    isMainConference: boolean;
  }[];
  submission: {
    deadline: Date | undefined;
    isOpen: boolean;
    guidelines: string[];
  };
  review: {
    displayScale: string;
    reviewType: string;
    allowReviewerDiscussion: boolean;
    enableRebuttalPhase: boolean;
    criteria: {
      id: string;
      name: string;
      weight: number;
      scoringScale: string;
    }[];
  };
}

export default function ChairmanSettingsPage() {
  const { conferenceId } = useParams();
  console.log(conferenceId);

  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTrack, setNewTrack] = useState("");
  const [newGuideline, setNewGuideline] = useState("");
  const [newTimelineEvent, setNewTimelineEvent] = useState({
    eventName: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });
  const [newCriterion, setNewCriterion] = useState({
    name: "",
    weight: 20,
    scoringScale: "1 - 5 Scale",
  });

  const [settings, setSettings] = useState<ConferenceSettings>({
    general: {
      conferenceName: "AI Research Conference 2025",
      codename: "ARC2025",
      description:
        "This conference focuses on the latest advancements in artificial intelligence research, including machine learning, natural language processing, and computer vision.",
      location: "AI Research Conference 2025",
      timezone: "UTC",
      website: "https://arc2025.conference.org",
    },
    tracks: ["Deep Learning", "Natural Language Processing", "Ethics"],
    timeline: [
      {
        id: "1",
        eventName: "Submission Deadline",
        startDate: new Date("2025-05-18"),
        endDate: new Date("2025-05-18"),
        isMainConference: false,
      },
      {
        id: "2",
        eventName: "Review Period",
        startDate: new Date("2025-05-21"),
        endDate: new Date("2025-05-23"),
        isMainConference: false,
      },
      {
        id: "3",
        eventName: "Camera-Ready Paper Deadline",
        startDate: new Date("2025-05-29"),
        endDate: new Date("2025-05-29"),
        isMainConference: false,
      },
      {
        id: "4",
        eventName: "Conference Dates",
        startDate: new Date("2025-06-16"),
        endDate: new Date("2025-06-18"),
        isMainConference: true,
      },
    ],
    submission: {
      deadline: new Date("2025-05-18"),
      isOpen: true,
      guidelines: [
        "Papers must be original and not published elsewhere",
        "Maximum length: 8 pages including their references",
        "Use the provided conference template",
        "Ensure anonymous submission (remove author information)",
      ],
    },
    review: {
      displayScale: "1 - 5 Scale",
      reviewType: "Double blind",
      allowReviewerDiscussion: false,
      enableRebuttalPhase: false,
      criteria: [
        {
          id: "1",
          name: "Originality",
          weight: 20,
          scoringScale: "1 - 5 Scale",
        },
        {
          id: "2",
          name: "Significance of Contribution",
          weight: 25,
          scoringScale: "1 - 5 Scale",
        },
        {
          id: "3",
          name: "Technical Quality",
          weight: 20,
          scoringScale: "1 - 5 Scale",
        },
        {
          id: "4",
          name: "Clarity of Presentation",
          weight: 25,
          scoringScale: "1 - 5 Scale",
        },
        {
          id: "5",
          name: "Experimental Validation",
          weight: 10,
          scoringScale: "1 - 5 Scale",
        },
      ],
    },
  });

  // Track changes
  useEffect(() => {
    setHasChanges(true);
  }, [settings]);

  // Validation
  const validateSettings = () => {
    const newErrors: Record<string, string> = {};

    if (!settings.general.conferenceName.trim()) {
      newErrors.conferenceName = "Conference name is required";
    }

    if (!settings.general.codename.trim()) {
      newErrors.codename = "Codename is required";
    }

    if (settings.general.description.length > 300) {
      newErrors.description = "Description should have no more than 300 chars";
    }

    if (settings.general.website && !isValidUrl(settings.general.website)) {
      newErrors.website = "Errors occurred please fix it";
    }

    // Check if total weight equals 100%
    const totalWeight = settings.review.criteria.reduce(
      (sum, criterion) => sum + criterion.weight,
      0,
    );
    if (totalWeight !== 100) {
      newErrors.criteriaWeight = "Total weight must equal 100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateSettings()) {
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    alert("Settings saved successfully!");
  };

  const updateGeneralSettings = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value,
      },
    }));
  };

  const addTrack = () => {
    if (newTrack.trim() && !settings.tracks.includes(newTrack.trim())) {
      setSettings((prev) => ({
        ...prev,
        tracks: [...prev.tracks, newTrack.trim()],
      }));
      setNewTrack("");
    }
  };

  const removeTrack = (trackToRemove: string) => {
    setSettings((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((track) => track !== trackToRemove),
    }));
  };

  const addTimelineEvent = () => {
    if (
      newTimelineEvent.eventName.trim() &&
      newTimelineEvent.startDate &&
      newTimelineEvent.endDate
    ) {
      setSettings((prev) => ({
        ...prev,
        timeline: [
          ...prev.timeline,
          {
            id: Date.now().toString(),
            eventName: newTimelineEvent.eventName.trim(),
            startDate: newTimelineEvent.startDate,
            endDate: newTimelineEvent.endDate,
            isMainConference: false,
          },
        ],
      }));
      setNewTimelineEvent({
        eventName: "",
        startDate: undefined,
        endDate: undefined,
      });
    }
  };

  const removeTimelineEvent = (eventId: string) => {
    setSettings((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((event) => event.id !== eventId),
    }));
  };

  const updateTimelineEvent = (
    eventId: string,
    field: string,
    value: string | number | boolean | Date,
  ) => {
    setSettings((prev) => ({
      ...prev,
      timeline: prev.timeline.map((event) =>
        event.id === eventId
          ? {
              ...event,
              [field]: value,
              // If setting as main conference, unset others
              ...(field === "isMainConference" && value
                ? {}
                : field === "isMainConference"
                  ? {}
                  : {}),
            }
          : field === "isMainConference" && value
            ? { ...event, isMainConference: false }
            : event,
      ),
    }));
  };

  const addGuideline = () => {
    if (
      newGuideline.trim() &&
      !settings.submission.guidelines.includes(newGuideline.trim())
    ) {
      setSettings((prev) => ({
        ...prev,
        submission: {
          ...prev.submission,
          guidelines: [...prev.submission.guidelines, newGuideline.trim()],
        },
      }));
      setNewGuideline("");
    }
  };

  const removeGuideline = (guidelineToRemove: string) => {
    setSettings((prev) => ({
      ...prev,
      submission: {
        ...prev.submission,
        guidelines: prev.submission.guidelines.filter(
          (guideline) => guideline !== guidelineToRemove,
        ),
      },
    }));
  };

  const addCriterion = () => {
    if (newCriterion.name.trim()) {
      setSettings((prev) => ({
        ...prev,
        review: {
          ...prev.review,
          criteria: [
            ...prev.review.criteria,
            {
              id: Date.now().toString(),
              name: newCriterion.name.trim(),
              weight: newCriterion.weight,
              scoringScale: newCriterion.scoringScale,
            },
          ],
        },
      }));
      setNewCriterion({
        name: "",
        weight: 20,
        scoringScale: "1 - 5 Scale",
      });
    }
  };

  const removeCriterion = (criterionId: string) => {
    setSettings((prev) => ({
      ...prev,
      review: {
        ...prev.review,
        criteria: prev.review.criteria.filter(
          (criterion) => criterion.id !== criterionId,
        ),
      },
    }));
  };

  const updateCriterion = (
    criterionId: string,
    field: string,
    value: number,
  ) => {
    setSettings((prev) => ({
      ...prev,
      review: {
        ...prev.review,
        criteria: prev.review.criteria.map((criterion) =>
          criterion.id === criterionId
            ? { ...criterion, [field]: value }
            : criterion,
        ),
      },
    }));
  };

  const totalWeight = settings.review.criteria.reduce(
    (sum, criterion) => sum + criterion.weight,
    0,
  );

  return (
    <>
      <Breadcrumb
        items={[{ label: "Chairman" }, { label: "Conference Settings" }]}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Conference Settings</h1>
        {hasChanges && (
          <Button
            onClick={(e) => {
              void handleSaveChanges(e);
            }}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        )}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="submission">Submission</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conference Information</CardTitle>
              <p className="text-sm text-muted-foreground">
                Basic conference details and settings
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="conferenceName">Conference Name</Label>
                  <Input
                    id="conferenceName"
                    value={settings.general.conferenceName}
                    onChange={(e) =>
                      updateGeneralSettings("conferenceName", e.target.value)
                    }
                    className={errors.conferenceName ? "border-red-500" : ""}
                  />
                  {errors.conferenceName && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.conferenceName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codename">Codename</Label>
                  <Input
                    id="codename"
                    value={settings.general.codename}
                    onChange={(e) =>
                      updateGeneralSettings("codename", e.target.value)
                    }
                    className={errors.codename ? "border-red-500" : ""}
                  />
                  {errors.codename && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.codename}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={settings.general.description}
                  onChange={(e) =>
                    updateGeneralSettings("description", e.target.value)
                  }
                  rows={4}
                  className={`resize-none ${errors.description ? "border-red-500" : ""}`}
                  maxLength={300}
                />
                <div className="flex justify-between items-center">
                  {errors.description ? (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foregroundoregroundund">
                      Description should have no more than 300 chars
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {settings.general.description.length} / 300
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={settings.general.location}
                    onChange={(e) =>
                      updateGeneralSettings("location", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) =>
                      updateGeneralSettings("timezone", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                      <SelectItem value="CET">CET</SelectItem>
                      <SelectItem value="JST">JST</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose displayed timezone for dates in your conference
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Conference Website</Label>
                <Input
                  id="website"
                  value={settings.general.website}
                  onChange={(e) =>
                    updateGeneralSettings("website", e.target.value)
                  }
                  className={errors.website ? "border-red-500" : ""}
                />
                {errors.website && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.website}
                  </p>
                )}
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Errors occurred please contact administrator
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tracks Tab */}
        <TabsContent value="tracks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Research Tracks</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure available research tracks for submissions
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.tracks.map((track, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span>{track}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeTrack(track)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="Enter track name"
                  value={newTrack}
                  onChange={(e) => setNewTrack(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTrack()}
                />
                <Button onClick={addTrack} disabled={!newTrack.trim()}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure conference timeline
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event name</TableHead>
                    <TableHead>Start date</TableHead>
                    <TableHead>End date</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.timeline.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.eventName}</TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {event.startDate
                                ? format(event.startDate, "dd/MM/yyyy")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={event.startDate}
                              onSelect={(date) =>
                                updateTimelineEvent(
                                  event.id,
                                  "startDate",
                                  date!,
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {event.endDate
                                ? format(event.endDate, "dd/MM/yyyy")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={event.endDate}
                              onSelect={(date) =>
                                updateTimelineEvent(event.id, "endDate", date!)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeTimelineEvent(event.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <RadioGroup
                            value={event.isMainConference ? event.id : ""}
                            onValueChange={(value) =>
                              updateTimelineEvent(
                                event.id,
                                "isMainConference",
                                value === event.id,
                              )
                            }
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={event.id}
                                id={`main-${event.id}`}
                              />
                              <Label
                                htmlFor={`main-${event.id}`}
                                className="text-sm"
                              >
                                Set as main conference dates
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label>Event name</Label>
                  <Input
                    placeholder="Enter event name"
                    value={newTimelineEvent.eventName}
                    onChange={(e) =>
                      setNewTimelineEvent((prev) => ({
                        ...prev,
                        eventName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTimelineEvent.startDate
                          ? format(newTimelineEvent.startDate, "dd/MM/yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newTimelineEvent.startDate}
                        onSelect={(date) =>
                          setNewTimelineEvent((prev) => ({
                            ...prev,
                            startDate: date,
                          }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTimelineEvent.endDate
                          ? format(newTimelineEvent.endDate, "dd/MM/yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newTimelineEvent.endDate}
                        onSelect={(date) =>
                          setNewTimelineEvent((prev) => ({
                            ...prev,
                            endDate: date,
                          }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button
                  onClick={addTimelineEvent}
                  disabled={
                    !newTimelineEvent.eventName.trim() ||
                    !newTimelineEvent.startDate ||
                    !newTimelineEvent.endDate
                  }
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Submission Tab */}
        <TabsContent value="submission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submission Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure submission
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Submission Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {settings.submission.deadline
                          ? format(settings.submission.deadline, "dd/MM/yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={settings.submission.deadline}
                        onSelect={(date) =>
                          setSettings((prev) => ({
                            ...prev,
                            submission: { ...prev.submission, deadline: date },
                          }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Submission Open</Label>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg bg-muted/30">
                    <Switch
                      checked={settings.submission.isOpen}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          submission: { ...prev.submission, isOpen: checked },
                        }))
                      }
                    />
                    <Label className="text-sm">
                      This switch need to be on to allow submitting new entry
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission Guidelines</CardTitle>
              <p className="text-sm text-muted-foreground">
                Add guideline that show when participant submit his work
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.submission.guidelines.map((guideline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span className="flex-1">{guideline}</span>
                  <div className="flex gap-2">
                    {guideline ===
                    "Maximum length: 8 pages including their references" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-500"
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Confirm
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeGuideline(guideline)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex gap-2">
                <Input
                  placeholder="Guideline entry"
                  value={newGuideline}
                  onChange={(e) => setNewGuideline(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addGuideline()}
                />
                <Button onClick={addGuideline} disabled={!newGuideline.trim()}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Review Tab */}
        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Process Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure the peer review process
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Display Scale</Label>
                  <Select
                    value={settings.review.displayScale}
                    onValueChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        review: { ...prev.review, displayScale: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 - 5 Scale">1 - 5 Scale</SelectItem>
                      <SelectItem value="1 - 10 Scale">1 - 10 Scale</SelectItem>
                      <SelectItem value="A - F Scale">A - F Scale</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Set how would like you to show score of papers
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Review Type</Label>
                  <Select
                    value={settings.review.reviewType}
                    onValueChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        review: { ...prev.review, reviewType: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Double blind">Double blind</SelectItem>
                      <SelectItem value="Single blind">Single blind</SelectItem>
                      <SelectItem value="Open review">Open review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowDiscussion"
                    checked={settings.review.allowReviewerDiscussion}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        review: {
                          ...prev.review,
                          allowReviewerDiscussion: checked as boolean,
                        },
                      }))
                    }
                  />
                  <div>
                    <Label htmlFor="allowDiscussion" className="font-medium">
                      Allow Reviewer Discussion
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable reviewers to discuss papers before final decision
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enableRebuttal"
                    checked={settings.review.enableRebuttalPhase}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        review: {
                          ...prev.review,
                          enableRebuttalPhase: checked as boolean,
                        },
                      }))
                    }
                  />
                  <div>
                    <Label htmlFor="enableRebuttal" className="font-medium">
                      Enable Rebuttal Phase
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow authors to respond to reviewer comments
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Criteria</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure individual review criteria with weights and scoring
                ranges
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Review Deadline</TableHead>
                    <TableHead>Weight (%)</TableHead>
                    <TableHead>Scoring Scale</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.review.criteria.map((criterion) => (
                    <TableRow key={criterion.id}>
                      <TableCell>{criterion.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={criterion.weight}
                          onChange={(e) =>
                            updateCriterion(
                              criterion.id,
                              "weight",
                              Number.parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-20"
                          min="0"
                          max="100"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={criterion.scoringScale}
                          onValueChange={(value) =>
                            updateCriterion(
                              criterion.id,
                              "scoringScale",
                              Number(value) || 0,
                            )
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 - 5 Scale">
                              1 - 5 Scale
                            </SelectItem>
                            <SelectItem value="1 - 10 Scale">
                              1 - 10 Scale
                            </SelectItem>
                            <SelectItem value="A - F Scale">
                              A - F Scale
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeCriterion(criterion.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label>Review Deadline</Label>
                  <Input
                    placeholder="Enter criterion name"
                    value={newCriterion.name}
                    onChange={(e) =>
                      setNewCriterion((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight (%)</Label>
                  <Input
                    type="number"
                    value={newCriterion.weight}
                    onChange={(e) =>
                      setNewCriterion((prev) => ({
                        ...prev,
                        weight: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Scoring Scale</Label>
                  <Select
                    value={newCriterion.scoringScale}
                    onValueChange={(value) =>
                      setNewCriterion((prev) => ({
                        ...prev,
                        scoringScale: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 - 5 Scale">1 - 5 Scale</SelectItem>
                      <SelectItem value="1 - 10 Scale">1 - 10 Scale</SelectItem>
                      <SelectItem value="A - F Scale">A - F Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={addCriterion}
                  disabled={!newCriterion.name.trim()}
                >
                  Add
                </Button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Total Weight:</span>
                  <Badge
                    variant={totalWeight === 100 ? "default" : "destructive"}
                  >
                    {totalWeight}%
                  </Badge>
                </div>
                {totalWeight !== 100 && (
                  <p className="text-sm text-red-500">
                    Total weight must equal 100%
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Notifications Tab */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure email notification settings
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Email notification settings will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {hasChanges && (
          <div className="flex pt-6 justify-end">
            <Button
              onClick={(e) => {
                void handleSaveChanges(e);
              }}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        )}
      </Tabs>
    </>
  );
}
