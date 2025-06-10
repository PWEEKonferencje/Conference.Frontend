"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export interface Reviewer {
  id: string;
  name: string;
  affiliation: string;
  expertise: string[];
  reviewingCount: number;
}

export interface ReviewerAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (reviewers: Reviewer[]) => void;
  paperTitle: string;
  paperAbstract: string;
  paperKeywords: string[];
  currentReviewers?: Reviewer[];
}

export function ReviewerAssignmentModal({
  isOpen,
  onClose,
  onAssign,
  paperTitle,
  paperAbstract,
  paperKeywords,
  currentReviewers = [],
}: ReviewerAssignmentModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReviewers, setSelectedReviewers] =
    useState<Reviewer[]>(currentReviewers);

  // Sample reviewers data
  const availableReviewers: Reviewer[] = [
    {
      id: "1",
      name: "Prof. Joe Doe",
      affiliation: "MIT",
      expertise: ["Deep Learning", "Computer Vision"],
      reviewingCount: 3,
    },
    {
      id: "2",
      name: "Prof. Faustina Grego",
      affiliation: "Stanford",
      expertise: ["Natural Language Processing", "Machine Learning"],
      reviewingCount: 1,
    },
    {
      id: "3",
      name: "Dr. Michael Johnson",
      affiliation: "Carnegie Mellon",
      expertise: ["Artificial Intelligence", "Neural Networks"],
      reviewingCount: 2,
    },
    {
      id: "4",
      name: "Prof. Sarah Chen",
      affiliation: "Berkeley",
      expertise: ["Computer Vision", "Deep Learning"],
      reviewingCount: 4,
    },
  ];

  const filteredReviewers = availableReviewers.filter(
    (reviewer) =>
      reviewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reviewer.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reviewer.expertise.some((exp) =>
        exp.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const toggleReviewer = (reviewer: Reviewer) => {
    if (selectedReviewers.find((r) => r.id === reviewer.id)) {
      setSelectedReviewers(
        selectedReviewers.filter((r) => r.id !== reviewer.id),
      );
    } else {
      setSelectedReviewers([...selectedReviewers, reviewer]);
    }
  };

  const handleAssign = () => {
    onAssign(selectedReviewers);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Reviewers</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Paper Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Title</h3>
              <p className="text-sm text-muted-foreground">{paperTitle}</p>
            </div>
            <div>
              <h3 className="font-medium">Abstract</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {paperAbstract}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {paperKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Currently Assigned Reviewers */}
          {selectedReviewers.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">
                Currently Assigned Reviewers ({selectedReviewers.length})
              </h3>
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="space-y-2">
                  {selectedReviewers.map((reviewer) => (
                    <div
                      key={reviewer.id}
                      className="flex items-center justify-between p-2 bg-white rounded border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">
                          {reviewer.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {reviewer.affiliation}
                        </div>
                        <div className="flex gap-1">
                          {reviewer.expertise.map((exp, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReviewer(reviewer)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Available Reviewers */}
          <div className="space-y-4">
            <h3 className="font-medium">Available Reviewers</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Name, Affiliation, Expertise..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Reviewer List */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 text-sm font-medium">
                <div className="col-span-1">Select</div>
                <div className="col-span-3">Name</div>
                <div className="col-span-3">Affiliation</div>
                <div className="col-span-4">Expertise</div>
                <div className="col-span-1">Reviews</div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredReviewers.map((reviewer) => (
                  <div
                    key={reviewer.id}
                    className={`grid grid-cols-12 gap-4 p-3 border-b hover:bg-muted/30 ${
                      selectedReviewers.find((r) => r.id === reviewer.id)
                        ? "bg-muted/50"
                        : ""
                    }`}
                  >
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={
                          !!selectedReviewers.find((r) => r.id === reviewer.id)
                        }
                        onChange={() => toggleReviewer(reviewer)}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="col-span-3 text-sm">{reviewer.name}</div>
                    <div className="col-span-3 text-sm text-muted-foreground">
                      {reviewer.affiliation}
                    </div>
                    <div className="col-span-4">
                      <div className="flex flex-wrap gap-1">
                        {reviewer.expertise.map((exp, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-1 text-sm text-center">
                      {reviewer.reviewingCount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign}>
            Assign ({selectedReviewers.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
