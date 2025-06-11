import { useState } from "react";
import { Search, MoreVertical, Download, Mail } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Breadcrumb } from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";

/**
 * Represents a committee member.
 */
interface CommitteeMember {
  id: number;
  name: string;
  email: string;
  affiliation: string;
  track: string;
  expertise: string;
  status: string;
}

/**
 * Committee management page for chairman.
 * Allows filtering, searching, and inviting committee members.
 */
export default function ChairmanCommitteePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  // Dummy data for committee members
  const members: CommitteeMember[] = [
    {
      id: 1,
      name: "Prof. Michael Chen",
      email: "sarah.johnson@university.edu",
      affiliation: "MIT Computer Science",
      track: "Unassigned",
      expertise: "ai, statistic",
      status: "Accepted",
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      affiliation: "Google Research",
      track: "Unassigned",
      expertise: "machine learning, data mining, statistics",
      status: "Rejected",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "sarah.johnson@university.edu",
      affiliation: "WARSAW UNIVERSITI OF SIENCE AND TECHNOLOGY",
      track: "AI",
      expertise: "reinforcement learning...",
      status: "Accepted",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      email: "sarah.johnson@university.edu",
      affiliation: "Stanford AI Lab",
      track: "Deep learning",
      expertise: "natural language processing...",
      status: "Accepted",
    },
    {
      id: 5,
      name: "Prof. Michael Chen",
      email: "sarah.johnson@university.edu",
      affiliation: "MIT Computer Science",
      track: "Privacy",
      expertise: "ai, statistic",
      status: "Pending",
    },
  ];

  // Filter members based on search and filters
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.affiliation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrack = trackFilter === "all" || member.track === trackFilter;
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesTrack && matchesStatus;
  });

  /**
   * Returns Tailwind classes for status badge.
   */
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Chairman" }, { label: "Committee" }]} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Committee Management</h1>
          <p className="text-gray-500 text-sm">
            Manage and oversee all paper submissions
          </p>
        </div>
        <Button
          onClick={() => setShowInviteDialog(true)}
          className="flex items-center gap-2"
        >
          Invite Member
        </Button>
      </div>

      <div className="flex gap-3 mb-6 bg-white p-3 border rounded-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, track, affiliation..."
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
            <SelectItem value="Deep learning">Deep learning</SelectItem>
            <SelectItem value="Privacy">Privacy</SelectItem>
            <SelectItem value="Unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TITLE AND NAME</TableHead>
              <TableHead>AFFILIATION</TableHead>
              <TableHead>TRACK</TableHead>
              <TableHead>EXPERTISE AREAS</TableHead>
              <TableHead>INVITATION STATUS</TableHead>
              <TableHead className="w-16">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </div>
                </TableCell>
                <TableCell>{member.affiliation}</TableCell>
                <TableCell>
                  <Select defaultValue={member.track}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unassigned">Unassigned</SelectItem>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="Deep learning">
                        Deep learning
                      </SelectItem>
                      <SelectItem value="Privacy">Privacy</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {member.expertise}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusClass(member.status)}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email All
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <InviteCommitteeDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
      />
    </>
  );
}

/**
 * Dialog for inviting committee members.
 */
function InviteCommitteeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Invite Committee</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Committee</h3>
          <div className="border rounded-md overflow-hidden mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">NO</TableHead>
                  <TableHead>TITLE AND NAME</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>EXPERTISE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Prof. Joe Doe</TableCell>
                  <TableCell>jon.doe@mit.com</TableCell>
                  <TableCell>Energetic</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Prof. Faustina Grego</TableCell>
                  <TableCell>faustina.grego@hagrid.com</TableCell>
                  <TableCell>Magnetism</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by Name, Affiliation, Expertise..."
              className="pl-10"
            />
          </div>

          <div className="flex justify-end">
            <Button>Invite</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
