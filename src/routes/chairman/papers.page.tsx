import { useState } from "react";
import { useParams, Link } from "react-router";
import { Search, Download, Filter, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Paper interface for type safety
 */
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

/**
 * PapersManagementPage
 * - Manages and displays a list of papers for a conference
 * - Uses React Router's useParams to get conferenceId
 */
export default function ChairmanPapersPage() {
  // Get conferenceId from URL params using React Router
  const { conferenceId } = useParams<{ conferenceId: string }>();

  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dummy data for papers
  const papers: Paper[] = [
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
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      author: "Michael Johnson",
      submissionDate: "March 10, 2025",
      track: "Natural",
      status: "In Review",
      reviews: "2/3",
      score: "-",
    },
    {
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      author: "Michael Johnson",
      submissionDate: "March 10, 2025",
      track: "Privacy",
      status: "Rejected",
      reviews: "1/3",
      score: 2.1,
    },
    {
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      author: "Michael Johnson",
      submissionDate: "March 10, 2025",
      track: "Privacy",
      status: "Revision",
      reviews: "3/3",
      score: 3.1,
    },
    {
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      author: "Michael Johnson",
      submissionDate: "March 10, 2025",
      track: "Natural",
      status: "In Review",
      reviews: "1/3",
      score: "-",
    },
    {
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      author: "Michael Johnson",
      submissionDate: "March 10, 2025",
      track: "Computer",
      status: "Accepted",
      reviews: "3/3",
      score: 3.6,
    },
    {
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      author: "Michael Johnson",
      submissionDate: "March 10, 2025",
      track: "AI",
      status: "Accepted",
      reviews: "3/3",
      score: 5,
    },
    {
      id: "ARC2025-101",
      title: "Advances in Transformer Architecture for Multi-modal Learning",
      author: "Michael Johnson",
      submissionDate: "March 10, 2025",
      track: "AI",
      status: "Rejected",
      reviews: "3/3",
      score: 2.2,
    },
  ];

  // Filter papers based on search and filters
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

  /**
   * Returns a Tailwind class for status coloring
   */
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

  return (
    <>
      <Breadcrumb items={[{ label: "Chairman" }, { label: "Papers" }]} />

      <div className="flex justify-between items-center mb-6">
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

      <div className="flex gap-3 mb-6 bg-white p-3 border rounded-md">
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
                <TableCell className="font-mono text-xs">{paper.id}</TableCell>
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
                    <Link to={`/chairman/${conferenceId}/papers/${paper.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            to={`/chairman/${conferenceId}/papers/${paper.id}`}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Paper
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
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

      <div className="flex items-center justify-between mt-4">
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
    </>
  );
}
