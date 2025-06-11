"use client";

import { useState } from "react";
import { Search, MoreVertical, Download, Filter } from "lucide-react";
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

interface Participant {
  id: string;
  name: string;
  affiliation: string;
  papers: number;
  reviews: string;
  registered: string;
  attending: string;
}

export default function ChairmanParticipantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dummy data for participants
  const participants: Participant[] = [
    {
      id: "ARC2025P-101",
      name: "Dr. Michael Johnson",
      affiliation: "MIT",
      papers: 3,
      reviews: "1/3",
      registered: "Jan 15, 2025",
      attending: "-",
    },
    {
      id: "ARC2025P-101",
      name: "Dr. Michael Johnson",
      affiliation: "Warsaw University",
      papers: 3,
      reviews: "1/3",
      registered: "Jan 18, 2025",
      attending: "yes",
    },
    {
      id: "ARC2025P-101",
      name: "Dr. Michael Johnson",
      affiliation: "Google Research",
      papers: 3,
      reviews: "1/3",
      registered: "Jan 18, 2025",
      attending: "no",
    },
    {
      id: "ARC2025P-101",
      name: "Dr. Michael Johnson",
      affiliation: "Berkeley AI Research",
      papers: 3,
      reviews: "1/3",
      registered: "Jan 18, 2025",
      attending: "-",
    },
    {
      id: "ARC2025P-101",
      name: "Dr. Michael Johnson",
      affiliation: "Berkeley AI Research",
      papers: 3,
      reviews: "1/3",
      registered: "Jan 18, 2025",
      attending: "-",
    },
    {
      id: "ARC2025P-101",
      name: "Dr. Michael Johnson",
      affiliation: "Warsaw University",
      papers: 3,
      reviews: "1/3",
      registered: "Jan 18, 2025",
      attending: "-",
    },
  ];

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.affiliation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      participant.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "attending" && participant.attending === "yes") ||
      (statusFilter === "not-attending" && participant.attending === "no") ||
      (statusFilter === "undefined" && participant.attending === "-");

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Breadcrumb items={[{ label: "Chairman" }, { label: "Participants" }]} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Participants Management</h1>
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
            placeholder="Search by Participant ID, Name, Title..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="attending">Attending</SelectItem>
            <SelectItem value="not-attending">Not Attending</SelectItem>
            <SelectItem value="undefined">Undefined</SelectItem>
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
              <TableHead>ID</TableHead>
              <TableHead>TITLE AND NAME</TableHead>
              <TableHead>AFFILIATION</TableHead>
              <TableHead>PAPERS</TableHead>
              <TableHead>REVIEWS</TableHead>
              <TableHead>REGISTERED</TableHead>
              <TableHead>ATTENDING</TableHead>
              <TableHead className="w-16">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((participant, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-xs">
                  {participant.id}
                </TableCell>
                <TableCell>{participant.name}</TableCell>
                <TableCell>{participant.affiliation}</TableCell>
                <TableCell>{participant.papers}</TableCell>
                <TableCell>{participant.reviews}</TableCell>
                <TableCell>{participant.registered}</TableCell>
                <TableCell>{participant.attending}</TableCell>
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

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Showing {filteredParticipants.length} of {participants.length}{" "}
          participants
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
