import { useParams } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Eye,
  Calendar,
  MapPin,
  User,
  FileText,
  Users,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

interface ReviewCriterion {
  name: string;
  weight: number;
  score: number;
  description: string;
}

interface Review {
  id: string;
  reviewerName: string;
  score: number;
  overallRating: "accept" | "minor_revision" | "major_revision" | "reject";
  detailedComments: string;
  committeeComments: string;
  criteria: ReviewCriterion[];
  submissionDate: string;
  status: "completed" | "in_progress";
}

interface PaperVersion {
  version: string;
  date: string;
  changes: string;
  isCurrent: boolean;
}

export default function ChairmanPaperPage() {
  // Use React Router's useParams to get params from the URL
  const params = useParams<{ conferenceId: string; paperId: string }>();

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("deep-learning");
  const [selectedStatus, setSelectedStatus] = useState("accepted");

  // Mock data - in real app this would come from API
  const paper = {
    id: "ARC2025-101",
    title: "Advances in Transformer Architecture for Multi-modal Learning",
    authors: "John Doe, Jane Smith (0000-1123-1233-2233)",
    abstract: `This paper presents novel advancements in transformer architectures designed specifically for multi-modal learning tasks. We introduce a new attention mechanism that efficiently processes and aligns information from different modalities, such as text, images, and audio. Our experiments demonstrate significant improvements over existing approaches on several benchmark datasets, including VQA, image captioning, and audio-visual scene understanding. The proposed architecture not only achieves state-of-the-art performance but also shows better computational efficiency and interpretability.`,
    keywords: [
      "machine learning",
      "neural networks",
      "computer vision",
      "deep learning",
      "artificial intelligence",
    ],
    submissionDate: "March 5, 2025",
    paperId: "March 5, 2025",
    averageScore: 3.6,
    reviewsCompleted: 3,
    totalReviews: 3,
    assignedTrack: "Deep Learning",
    presentationDate: "Day 1 - May 15, 10:30 - 12:00",
    location: "Room A",
    presenter: "Dr. John Doe",
    form: "Poster",
    status: "accepted" as const,
  };

  const versions: PaperVersion[] = [
    {
      version: "v1.1",
      date: "March 10, 2025, 13:30",
      changes: "Presentation details changed",
      isCurrent: true,
    },
    {
      version: "v1.0",
      date: "March 10, 2025, 10:30",
      changes: "Initial submission",
      isCurrent: false,
    },
  ];

  const reviews: Review[] = [
    {
      id: "review-1",
      reviewerName: "Anonymous Review 1",
      score: 4.0,
      overallRating: "major_revision",
      detailedComments: `The authors have made significant contributions to multi-modal learning. The proposed attention mechanism is well-motivated and shows consistent improvements. However, I recommend addressing the computational complexity concerns and providing more recent comparisons before publication.`,
      committeeComments: `However, I recommend addressing the computational complexity concerns and providing more recent comparisons before publication.`,
      criteria: [
        {
          name: "Clarity of Presentation",
          weight: 20,
          score: 5,
          description:
            "How clearly the paper presents its ideas and methodology",
        },
        {
          name: "Technical Quality",
          weight: 20,
          score: 5,
          description: "Technical soundness and rigor of the approach",
        },
        {
          name: "Significance of Contribution",
          weight: 20,
          score: 5,
          description: "Importance and impact of the research contribution",
        },
        {
          name: "Originality",
          weight: 20,
          score: 1,
          description: "Novelty and originality of the proposed approach",
        },
        {
          name: "Experimental Validation",
          weight: 20,
          score: 4,
          description:
            "Quality and comprehensiveness of experimental evaluation",
        },
      ],
      submissionDate: "March 16, 2025, 20:30",
      status: "completed",
    },
    {
      id: "review-2",
      reviewerName: "Anonymous Review 2",
      score: 3.8,
      overallRating: "minor_revision",
      detailedComments: `Good work on multi-modal transformers. The experimental results are convincing, but some technical details need clarification.`,
      committeeComments: `Minor revisions needed for clarity on technical implementation details.`,
      criteria: [
        {
          name: "Clarity of Presentation",
          weight: 20,
          score: 4,
          description:
            "How clearly the paper presents its ideas and methodology",
        },
        {
          name: "Technical Quality",
          weight: 20,
          score: 4,
          description: "Technical soundness and rigor of the approach",
        },
        {
          name: "Significance of Contribution",
          weight: 20,
          score: 4,
          description: "Importance and impact of the research contribution",
        },
        {
          name: "Originality",
          weight: 20,
          score: 3,
          description: "Novelty and originality of the proposed approach",
        },
        {
          name: "Experimental Validation",
          weight: 20,
          score: 4,
          description:
            "Quality and comprehensiveness of experimental evaluation",
        },
      ],
      submissionDate: "March 15, 2025, 14:20",
      status: "completed",
    },
    {
      id: "review-3",
      reviewerName: "Anonymous Review 3",
      score: 4.4,
      overallRating: "accept",
      detailedComments: `Excellent contribution to the field. The methodology is sound and results are impressive.`,
      committeeComments: `Strong accept. This work advances the state-of-the-art significantly.`,
      criteria: [
        {
          name: "Clarity of Presentation",
          weight: 20,
          score: 4,
          description:
            "How clearly the paper presents its ideas and methodology",
        },
        {
          name: "Technical Quality",
          weight: 20,
          score: 5,
          description: "Technical soundness and rigor of the approach",
        },
        {
          name: "Significance of Contribution",
          weight: 20,
          score: 5,
          description: "Importance and impact of the research contribution",
        },
        {
          name: "Originality",
          weight: 20,
          score: 4,
          description: "Novelty and originality of the proposed approach",
        },
        {
          name: "Experimental Validation",
          weight: 20,
          score: 4,
          description:
            "Quality and comprehensiveness of experimental evaluation",
        },
      ],
      submissionDate: "March 14, 2025, 09:15",
      status: "completed",
    },
    {
      id: "review-4",
      reviewerName: "Anonymous Review 4",
      score: 0,
      overallRating: "major_revision",
      detailedComments: "",
      committeeComments: "",
      criteria: [],
      submissionDate: "",
      status: "in_progress",
    },
  ];

  const tracks = [
    { id: "deep-learning", name: "Deep Learning" },
    { id: "nlp", name: "Natural Language Processing" },
    { id: "computer-vision", name: "Computer Vision" },
    { id: "ethics", name: "Ethics in AI" },
  ];

  const statuses = [
    { id: "under-review", name: "Under Review" },
    { id: "accepted", name: "Accepted" },
    { id: "rejected", name: "Rejected" },
    { id: "revision-requested", name: "Revision Requested" },
  ];

  const handleViewReview = (review: Review) => {
    if (review.status === "completed") {
      setSelectedReview(review);
      setShowReviewModal(true);
    }
  };

  const handleTrackUpdate = () => {
    // Handle track update logic
    console.log("Track updated to:", selectedTrack);
  };

  const handleStatusUpdate = () => {
    // Handle status update logic
    console.log("Status updated to:", selectedStatus);
  };

  const getOverallRatingBadge = (rating: string) => {
    switch (rating) {
      case "accept":
        return <Badge className="bg-green-100 text-green-800">accepted</Badge>;
      case "minor_revision":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            minor revision
          </Badge>
        );
      case "major_revision":
        return (
          <Badge className="bg-orange-100 text-orange-800">
            major revision
          </Badge>
        );
      case "reject":
        return <Badge className="bg-red-100 text-red-800">reject</Badge>;
      default:
        return <Badge variant="outline">pending</Badge>;
    }
  };

  const calculateOverallScore = (criteria: ReviewCriterion[]) => {
    if (criteria.length === 0) return 0;
    const totalScore = criteria.reduce(
      (sum, criterion) => sum + criterion.score,
      0,
    );
    return Math.round((totalScore / criteria.length) * 10) / 10;
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Chairman" },
          { label: "Papers", href: `/chairman/${params.conferenceId}/papers` },
          { label: paper.title },
        ]}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Paper Details</h1>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Paper
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Paper Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paper Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <p className="text-base">{paper.authors}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Abstract
                </h3>
                <p className="text-sm leading-relaxed">{paper.abstract}</p>
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
            </CardContent>
          </Card>

          {/* Current Version */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Paper Versions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {versions.map((version, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${version.isCurrent ? "bg-blue-500" : "bg-gray-300"}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {version.isCurrent
                            ? "Current Version"
                            : `Version ${version.version}`}
                        </span>
                        {version.isCurrent && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {version.date}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {version.changes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submission Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Papers must be original and not published elsewhere</li>
                <li>• Maximum length: 8 pages including references</li>
                <li>• Use the provided conference template</li>
                <li>
                  • Ensure anonymous submission (remove author information)
                </li>
                <li>• Include proper citations and references</li>
              </ul>
            </CardContent>
          </Card>

          {/* Upload New Version */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Upload New Paper Version
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Choose File No file chosen
                </p>
                <p className="text-xs text-gray-500">
                  Select a new PDF file to upload the conference formatting
                  guidelines.
                </p>
              </div>
              <Button className="w-full mt-4">Update</Button>
            </CardContent>
          </Card>

          {/* Presentation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Presentation Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Presentation Date</p>
                  <p className="text-sm text-muted-foreground">
                    {paper.presentationDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    {paper.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Presenter</p>
                  <p className="text-sm text-muted-foreground">
                    {paper.presenter}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Form</p>
                  <p className="text-sm text-muted-foreground">{paper.form}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Track and Status Assignment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Paper Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Track</label>
                <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tracks.map((track) => (
                      <SelectItem key={track.id} value={track.id}>
                        {track.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => {
                  handleTrackUpdate();
                  handleStatusUpdate();
                }}
                className="w-full"
              >
                Update
              </Button>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">
                        {review.reviewerName}
                      </h4>
                      {review.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReview(review)}
                          className="text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      )}
                    </div>
                    {review.status === "completed" ? (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">
                            Score:
                          </span>
                          <span className="text-xs font-medium">
                            {review.score}/5
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Response:
                          </span>
                          {getOverallRatingBadge(review.overallRating)}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-blue-600">
                          in progress
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submission Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Submission Date</p>
                  <p className="text-sm text-muted-foreground">
                    {paper.submissionDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Paper ID</p>
                  <p className="text-sm text-muted-foreground">
                    {paper.paperId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Reviews</p>
                  <p className="text-sm text-muted-foreground">
                    {paper.reviewsCompleted} completed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Average Score</p>
                  <p className="text-sm text-muted-foreground">
                    {paper.averageScore} / 5
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{selectedReview?.reviewerName}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReviewModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedReview && (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                {/* Detailed Comments */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Detailed Comments
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {selectedReview.detailedComments}
                  </p>
                </div>

                {/* Comment to Committee */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Comment to Committee
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {selectedReview.committeeComments}
                  </p>
                </div>

                <Separator />

                {/* Review Criteria */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Review Criteria</h3>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">
                        Weight
                      </span>
                      <br />
                      <span className="text-sm text-muted-foreground">
                        (higher better)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedReview.criteria.map((criterion, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {criterion.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {criterion.weight}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <button
                              key={score}
                              className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors ${
                                score === criterion.score
                                  ? score <= 2
                                    ? "bg-red-500 border-red-500 text-white"
                                    : score === 3
                                      ? "bg-yellow-500 border-yellow-500 text-white"
                                      : "bg-green-500 border-green-500 text-white"
                                  : "border-gray-300 text-gray-600 hover:border-gray-400"
                              }`}
                              disabled
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {criterion.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      Score: {calculateOverallScore(selectedReview.criteria)}/5
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Overall Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Overall Rating</span>
                  {getOverallRatingBadge(selectedReview.overallRating)}
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setShowReviewModal(false)}>Ok</Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
