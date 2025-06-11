"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, FileText } from "lucide-react";
import { Link } from "react-router";
import { useParams } from "react-router";

export default function ParticipantReviewsPage() {
  const { conferenceId } = useParams();

  const papers = [
    {
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      paperId: "ARC2025-101",
      track: "Deep Learning",
      submittedOn: "March 10, 2025",
      status: "Under Review",
      tags: ["Deep Learning", "Deep Learning"],
    },
    {
      id: "ARC2025-102",
      title: "Efficient Training Methods for Large Language Models",
      paperId: "ARC2025-101",
      track: "Deep Learning",
      submittedOn: "March 10, 2025",
      status: "Accepted",
      tags: ["Deep Learning", "Large Language Models"],
    },
    {
      id: "ARC2025-103",
      title: "Explainable AI: New Approaches for Model Interpretability",
      paperId: "ARC2025-101",
      track: "Deep Learning",
      submittedOn: "March 10, 2025",
      status: "Revision Requested",
      tags: ["Explainable AI", "Model Interpretability"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Revision Requested":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Participant</span>
        <span>/</span>
        <span>Assigned Reviews</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Papers To Review</h1>
        <p className="text-gray-600">
          Track the status of your papers that you need to review
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by Paper ID, Title, Track..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all-tracks">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Tracks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-tracks">All Tracks</SelectItem>
            <SelectItem value="deep-learning">Deep Learning</SelectItem>
            <SelectItem value="nlp">NLP</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-status">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {papers.map((paper) => (
          <Card key={paper.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{paper.title}</h3>
                    <Badge className={getStatusColor(paper.status)}>
                      {paper.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      Paper ID: {paper.paperId} • Track: {paper.track}
                    </p>
                    <p>Submitted on: {paper.submittedOn}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {paper.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {paper.status === "Under Review" && (
                    <Link
                      to={`/participant/${conferenceId}/reviews/${paper.id}`}
                    >
                      <Button className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Review
                      </Button>
                    </Link>
                  )}
                  {paper.status === "Revision Requested" && (
                    <Link
                      to={`/participant/${conferenceId}/reviews/${paper.id}`}
                    >
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Continue Reviewing
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select defaultValue="25">
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="text-sm text-gray-600">...</span>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
