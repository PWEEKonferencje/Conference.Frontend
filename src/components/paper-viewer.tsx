"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DownloadIcon,
  FileTextIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  TagIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  HistoryIcon,
  GitBranchIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface PaperVersion {
  version: number;
  date: string;
  changes: string;
  author?: string;
}

interface PaperViewerProps {
  paper: {
    id: string;
    title: string;
    authors: string;
    abstract: string;
    keywords: string[];
    status: "under-review" | "accepted" | "revision-requested" | "rejected";
    submissionDate: string;
    fileUrl: string;
    track?: string;
    reviewCount?: number;
    averageScore?: number;
    versions?: PaperVersion[];
  };
}

export function PaperViewer({ paper }: PaperViewerProps) {
  // Default versions if not provided
  const versions: PaperVersion[] = paper.versions ?? [
    {
      version: 1,
      date: paper.submissionDate,
      changes: "Initial submission",
    },
  ];

  const getStatusBadge = () => {
    switch (paper.status) {
      case "under-review":
        return <Badge variant="secondary">Under Review</Badge>;
      case "accepted":
        return <Badge variant="default">Accepted</Badge>;
      case "revision-requested":
        return <Badge variant="outline">Revision Requested</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-6">
        {/* Header with title and status */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold truncate max-w-[70%]">
            {paper.title}
          </h2>
          {getStatusBadge()}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Paper Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Paper Information */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Title
                </h3>
                <p className="text-base">{paper.title}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Authors
                </h3>
                <p className="text-base whitespace-pre-line">{paper.authors}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Abstract
                </h3>
                <p className="text-sm">{paper.abstract}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {paper.track && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Track
                  </h3>
                  <p className="text-base">{paper.track}</p>
                </div>
              )}
            </div>

            {/* Submission Details */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-medium">Submission Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Submission Date</p>
                    <p className="text-sm text-muted-foreground">
                      {paper.submissionDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Paper ID</p>
                    <p className="text-sm text-muted-foreground">{paper.id}</p>
                  </div>
                </div>

                {paper.reviewCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Reviews</p>
                      <p className="text-sm text-muted-foreground">
                        {paper.reviewCount} completed
                      </p>
                    </div>
                  </div>
                )}

                {paper.averageScore !== undefined && (
                  <div className="flex items-center gap-2">
                    <TagIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Average Score</p>
                      <p className="text-sm text-muted-foreground">
                        {paper.averageScore.toFixed(1)}/5.0
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Information */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-medium">Status Information</h3>

              <div className="p-4 rounded-lg bg-muted/30">
                {paper.status === "under-review" && (
                  <div className="flex items-start gap-3">
                    <ClockIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Your paper is under review</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        The review process typically takes 4-6 weeks. You will
                        be notified when the reviews are complete.
                      </p>
                    </div>
                  </div>
                )}

                {paper.status === "accepted" && (
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        Your paper has been accepted!
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Congratulations! Please prepare your camera-ready
                        version by May 1, 2025. You will receive further
                        instructions via email.
                      </p>
                    </div>
                  </div>
                )}

                {paper.status === "revision-requested" && (
                  <div className="flex items-start gap-3">
                    <AlertCircleIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Revision requested</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Please review the feedback provided and submit a revised
                        version by April 10, 2025. Address all reviewer comments
                        in your revision.
                      </p>
                    </div>
                  </div>
                )}

                {paper.status === "rejected" && (
                  <div className="flex items-start gap-3">
                    <AlertCircleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Paper not accepted</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We regret to inform you that your paper was not accepted
                        for this conference. Please review the feedback provided
                        by the reviewers for future submissions.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Version History */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <HistoryIcon className="h-4 w-4" />
                Version History
              </h3>
              <Button variant="outline" size="sm" className="button-spacing">
                <DownloadIcon className="h-4 w-4" />
                Download PDF
              </Button>
            </div>

            <Card className="p-4 bg-muted/20">
              <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <GitBranchIcon className="h-4 w-4" />
                Current Version: v{versions.length}.0
              </div>
              <Separator className="my-2" />
              <div className="space-y-4 mt-4">
                {versions.map((version, index) => (
                  <div
                    key={index}
                    className="relative pl-6 pb-4 last:pb-0 border-l last:border-l-0"
                  >
                    <div
                      className={`absolute left-0 top-0 w-3 h-3 rounded-full -translate-x-1.5 ${
                        index === 0
                          ? "bg-primary"
                          : index === versions.length - 1
                            ? "bg-muted"
                            : paper.status === "revision-requested"
                              ? "bg-amber-500"
                              : "bg-muted"
                      }`}
                    ></div>
                    <div className="mb-1">
                      <span className="text-sm font-medium">
                        Version {version.version}.0
                        {index === 0 && " (Current)"}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {version.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {version.changes}
                    </p>
                    {version.author && (
                      <p className="text-xs text-muted-foreground mt-1">
                        By: {version.author}
                      </p>
                    )}
                    {index !== versions.length - 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-7 text-xs"
                      >
                        View this version
                      </Button>
                    )}
                  </div>
                ))}

                {/* Example of system events in the timeline */}
                {paper.status === "under-review" && (
                  <div className="relative pl-6 pb-0 border-l-0">
                    <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-blue-500 -translate-x-1.5"></div>
                    <div className="mb-1">
                      <span className="text-sm font-medium">
                        Review Process Started
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        March 16, 2025
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Paper assigned to reviewers
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Actions */}
            {paper.status === "revision-requested" && (
              <Button className="w-full button-spacing">
                <FileTextIcon className="h-4 w-4" />
                Submit New Version
              </Button>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
