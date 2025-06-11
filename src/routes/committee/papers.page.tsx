"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Download,
  Filter,
  Eye,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { ReviewerAssignmentModal } from "@/components/reviewer-assignment-modal";
import { useParams } from "react-router";

interface Paper {
  id: string;
  title: string;
  author: string;
  submissionDate: string;
  track: string;
  status: string;
  reviews: string;
  score: number | string;
}

export default function CommitteePapersPage() {
  const { conferenceId } = useParams<{ conferenceId: string }>();
  console.log(conferenceId);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showReviewerModal, setShowReviewerModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  // Sample papers data
  const papers = [
    {
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      author: "Michael Johnson",
      submissionDate: "March 10, 2025",
      track: "AI",
      status: "Accepted",
      reviews: "3/3",
      score: 4.2,
    },
    {
      id: "ARC2025-102",
      title: "Natural Language Processing in Healthcare",
      author: "Sarah Chen",
      submissionDate: "March 12, 2025",
      track: "Natural",
      status: "In Review",
      reviews: "2/3",
      score: "-",
    },
    {
      id: "ARC2025-103",
      title: "Privacy-Preserving Machine Learning",
      author: "David Kim",
      submissionDate: "March 8, 2025",
      track: "Privacy",
      status: "Rejected",
      reviews: "3/3",
      score: 2.1,
    },
    {
      id: "ARC2025-104",
      title: "Computer Vision for Medical Imaging",
      author: "Emily Rodriguez",
      submissionDate: "March 15, 2025",
      track: "Computer",
      status: "Revision",
      reviews: "3/3",
      score: 3.1,
    },
  ];

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrack = trackFilter === "all" || paper.track === trackFilter;
    const matchesStatus =
      statusFilter === "all" || paper.status === statusFilter;

    return matchesSearch && matchesTrack && matchesStatus;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Accepted":
        return "text-green-700";
      case "Rejected":
        return "text-red-700";
      case "In Review":
        return "text-blue-700";
      case "Revision":
        return "text-amber-700";
      default:
        return "";
    }
  };

  const handleAssignReviewers = (paper: Paper) => {
    setSelectedPaper(paper);
    setShowReviewerModal(true);
  };

  const handleReviewerAssignment = (reviewers: unknown[]) => {
    // Handle reviewer assignment logic here
    console.log(
      "Assigned reviewers:",
      reviewers,
      "to paper:",
      selectedPaper?.id,
    );
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Papers Management</h1>
            <p className="text-gray-500 text-sm">
              Manage and oversee all paper submissions
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 bg-white p-3 border rounded-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by Paper ID, Author, Title..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={trackFilter} onValueChange={setTrackFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Tracks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tracks</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="Natural">Natural</SelectItem>
              <SelectItem value="Computer">Computer</SelectItem>
              <SelectItem value="Privacy">Privacy</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="In Review">In Review</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Revision">Revision</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Papers Table */}
        <div className="border rounded-md bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">ID</TableHead>
                <TableHead>TITLE</TableHead>
                <TableHead>AUTHOR</TableHead>
                <TableHead>SUBMISSION DATE</TableHead>
                <TableHead>TRACK</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>REVIEWS</TableHead>
                <TableHead>SCORE</TableHead>
                <TableHead className="text-center">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPapers.map((paper, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-xs">
                    {paper.id}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {paper.title}
                  </TableCell>
                  <TableCell>{paper.author}</TableCell>
                  <TableCell>{paper.submissionDate}</TableCell>
                  <TableCell>{paper.track}</TableCell>
                  <TableCell className={getStatusClass(paper.status)}>
                    {paper.status}
                  </TableCell>
                  <TableCell>{paper.reviews}</TableCell>
                  <TableCell>{paper.score}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Link
                        to={`/committee/${conferenceId}/papers/${paper.id}`}
                      >
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAssignReviewers(paper)}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/committee/${conferenceId}/papers/${paper.id}`}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Paper
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAssignReviewers(paper)}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Assign Reviewers
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredPapers.length} of {papers.length} papers
          </div>
          <div className="flex gap-2">
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
            <span className="flex items-center text-sm text-gray-500">
              per page
            </span>
          </div>
        </div>
      </div>

      {/* Reviewer Assignment Modal */}
      {selectedPaper && showReviewerModal && (
        <ReviewerAssignmentModal
          isOpen={showReviewerModal}
          onClose={() => setShowReviewerModal(false)}
          onAssign={handleReviewerAssignment}
          paperTitle={selectedPaper.title}
          paperAbstract="This paper presents novel advancements in transformer architectures designed specifically for multi-modal learning tasks..."
          paperKeywords={[
            "machine learning",
            "neural networks",
            "computer vision",
          ]}
        />
      )}
    </>
  );
}
