"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Users,
  FileText,
  Calendar,
  MapPin,
  MoreVertical,
  Archive,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings } from "lucide-react";
import {
  NotificationSidebar,
  type NotificationProps,
} from "@/components/notification-sidebar";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active");

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Your paper 'Neutral Network in Healthcare' was approved",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "info",
      title: "New paper assigned for review",
      time: "1 day ago",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "warning",
      title: "Deadline for 'AI IN FUTURE' paper submission is in 3 days",
      time: "2 days ago",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
  ] as NotificationProps[];

  const conferences = [
    {
      id: "conf-1",
      name: "AI in Future",
      university: "Warsaw University of Technology",
      location: "Warsaw, Poland",
      dates: "Jun 15, 2025 - Jun 18, 2025",
      role: "participant",
      statusIndicators: [
        { text: "2 papers submitted", color: "submitted-papers" },
        { text: "1 feedback received", color: "feedback-received" },
      ],
      actionText: "Enter conference",
    },
    {
      id: "conf-2",
      name: "Neutral Network in Healthcare",
      university: "Sunset Ford",
      location: "New York, USA",
      dates: "Jun 15, 2025 - Jun 18, 2025",
      role: "committee",
      statusIndicators: [
        { text: "3 papers don't have any reviewers", color: "no-reviewers" },
        {
          text: "3 papers waiting for status assignment",
          color: "waiting-status",
        },
      ],
      actionText: "Show conference",
    },
    {
      id: "conf-3",
      name: "AI in Future",
      university: "Warsaw University of Technology",
      location: "Warsaw, Poland",
      dates: "Jun 15, 2025 - Jun 18, 2025",
      role: "chairman",
      stats: "42 participants, 12 committee members",
      actionText: "Show conference",
    },
  ];

  const getRoleBadgeColors = (role: string) => {
    switch (role) {
      case "participant":
        return "bg-blue-500 text-white";
      case "committee":
        return "bg-green-500 text-white";
      case "organizer":
        return "bg-yellow-500 text-white";
      case "chairman":
        return "bg-red-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIndicatorColors = (colorKey: string) => {
    switch (colorKey) {
      case "submitted-papers":
        return "bg-blue-100 text-blue-800 ";
      case "feedback-received":
        return "bg-green-100 text-green-800 ";
      case "no-reviewers":
        return "bg-amber-100 text-amber-800";
      case "waiting-status":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/30 p-4 flex flex-col">
        <div className="mb-8">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight">
              conferenc<span className="text-primary">.EE</span>
            </h1>
          </Link>
        </div>

        <nav className="space-y-2 flex-1">
          <Button variant="secondary" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Dashboard
          </Button>

          <div className="pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Conferences
            </p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Conference
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Users className="mr-2 h-4 w-4" />
                Join Conference
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <FileText className="mr-2 h-4 w-4" />
                AI in Future
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <FileText className="mr-2 h-4 w-4" />
                Neutral Network in H...
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Archive className="mr-2 h-4 w-4" />
                Show all conferences
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Your papers
            </p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Plus className="mr-2 h-4 w-4" />
                Add new paper
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <FileText className="mr-2 h-4 w-4" />
                Some interesting paper
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <FileText className="mr-2 h-4 w-4" />
                Some more interestin...
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Archive className="mr-2 h-4 w-4" />
                Show all submitted papers
              </Button>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="mt-auto p-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-background border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                M
              </div>
              <span className="text-sm font-medium">Mariusz Kolanko</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard/settings/profile"
                    className="flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Hello, Mariusz</h1>
            <p className="text-muted-foreground">
              Manage your conferences and paper
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Conferences</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="archive">Archive</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="mt-4">
                {conferences.length > 0 ? (
                  <div className="flex flex-row gap-4 flex-wrap">
                    {conferences.map((conference) => (
                      <Card
                        key={conference.id}
                        className="flex flex-col justify-between w-full max-w-[550px]"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {conference.name}
                            </CardTitle>
                            <Badge
                              className={`text-xs font-medium px-2 py-1 rounded-full ${getRoleBadgeColors(conference.role)}`}
                            >
                              {conference.role.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {conference.university}
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{conference.dates}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{conference.location}</span>
                          </div>

                          {conference.statusIndicators && (
                            <div className="space-y-2 pt-2">
                              {conference.statusIndicators.map(
                                (indicator, index) => (
                                  <div
                                    key={index}
                                    className={`text-sm px-3 py-2 rounded-md ${getStatusIndicatorColors(indicator.color)}`}
                                  >
                                    {indicator.text}
                                  </div>
                                ),
                              )}
                            </div>
                          )}

                          {conference.stats && (
                            <div className="flex items-center text-sm text-muted-foreground pt-2">
                              <Users className="mr-2 h-4 w-4" />
                              <span>{conference.stats}</span>
                            </div>
                          )}

                          <Link
                            to={`/${conference.role}/${conference.id}`}
                            className="flex items-center justify-between text-primary hover:underline pt-2"
                          >
                            <span className="text-sm font-medium">
                              {conference.actionText}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        You aren&apos;t in any active conference right now.
                      </h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Browse upcoming conferences or create your own!
                      </p>
                      <div className="flex gap-2">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Conference
                        </Button>
                        <Button variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Browse Conferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="all">
                <div className="space-y-4">
                  {/* Placeholder for all conferences, can be expanded later */}
                  <Card>
                    <CardContent className="py-4 text-muted-foreground">
                      All conferences will be displayed here.
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="archive">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Archive className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No archived conferences
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Notifications Sidebar */}
        <NotificationSidebar notifications={notifications} />
      </div>
    </div>
  );
}
