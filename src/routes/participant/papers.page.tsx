"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, Plus, FileText } from "lucide-react";
import { Link } from "react-router";
import { useParams } from "react-router";

export default function MyPapers() {
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
        <span>My Papers</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Papers</h1>
          <p className="text-gray-600">
            Track the status of your submitted papers
          </p>
        </div>
        <Link to={`/participant/${conferenceId}/submit`}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Submit New Paper
          </Button>
        </Link>
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
                  <Link to={`/participant/${conferenceId}/papers/${paper.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  {paper.status === "Accepted" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      View Feedback
                    </Button>
                  )}
                  {paper.status === "Revision Requested" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Add Revision
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
