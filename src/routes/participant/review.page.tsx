"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Save, Send, ChevronLeft, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";

// Mock data for the paper
const paperData = {
  id: "ARC2025-101",
  title: "Advances in Transformer Architecture for Multi-modal Learning",
  authors: "John Doe, Jane Smith (0000-1123-1233-2233)",
  abstract:
    "This paper presents novel advancements in transformer architectures designed specifically for multi-modal learning tasks. We introduce a new attention mechanism that efficiently processes and aligns information from different modalities, such as text, images, and audio. Our experiments demonstrate significant improvements over existing approaches on several benchmark datasets, including VQA, image captioning, and audio-visual recognition tasks. The proposed architecture not only achieves state-of-the-art performance but also shows better computational efficiency and interpretability.",
  keywords: [
    "machine learning",
    "neural networks",
    "computer vision",
    "deep learning",
    "artificial intelligence",
  ],
  track: "Deep Learning",
  submissionDate: "March 10, 2025",
  reviewDeadline: "April 15, 2025",
};

const reviewCriteria = [
  { name: "Clarity of Presentation", weight: "20%" },
  { name: "Technical Quality", weight: "20%" },
  { name: "Significance of Contribution", weight: "20%" },
  { name: "Originality", weight: "20%" },
  { name: "Experimental Validation", weight: "20%" },
];

const overallRatings = [
  { value: "reject", label: "Reject (significant flaws)" },
  { value: "weak-reject", label: "Weak Reject (has issues)" },
  { value: "borderline", label: "Borderline (needs improvement)" },
  { value: "accept", label: "Accept (good paper)" },
  { value: "strong-accept", label: "Strong Accept (excellent paper)" },
];

export default function ReviewPaperPage() {
  const { conferenceId } = useParams();
  const [reviewData, setReviewData] = useState({
    detailedComments: "",
    committeeComments: "",
    criteriaScores: {} as Record<string, string>,
    overallRating: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (field: string, value: string) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCriteriaScore = (criteria: string, score: string) => {
    setReviewData((prev) => ({
      ...prev,
      criteriaScores: { ...prev.criteriaScores, [criteria]: score },
    }));
  };

  const calculateAverageScore = () => {
    const scores = Object.values(reviewData.criteriaScores)
      .map(Number)
      .filter(Boolean);
    if (scores.length === 0) return 0;
    return (
      scores.reduce((sum, score) => sum + score, 0) / scores.length
    ).toFixed(1);
  };

  const handleSaveDraft = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message
    }, 1000);
  };

  const handleSubmitReview = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      void navigate(`/participant/${conferenceId}/reviews`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Participant", href: `/participant/${conferenceId}` },
          {
            label: "Assigned Reviews",
            href: `/participant/${conferenceId}/reviews`,
          },
          { label: paperData.title },
        ]}
      />

      {/* Back button */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to={`/participant/${conferenceId}/reviews`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Assigned Reviews
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Paper Details */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Paper Details</CardTitle>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Paper
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Title
                </h3>
                <p className="font-medium">{paperData.title}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Authors
                </h3>
                <p>{paperData.authors}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Abstract
                </h3>
                <p className="text-sm leading-relaxed">{paperData.abstract}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Keywords
                </h3>
                <p className="text-sm">{paperData.keywords.join(", ")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Review Form */}
          <Card>
            <CardHeader>
              <CardTitle>Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Detailed Comments */}
              <div className="space-y-2">
                <Label
                  htmlFor="detailed-comments"
                  className="text-base font-medium"
                >
                  Detailed Comments
                </Label>
                <p className="text-sm text-muted-foreground">
                  Provide detailed feedback to the authors
                </p>
                <Textarea
                  id="detailed-comments"
                  value={reviewData.detailedComments}
                  onChange={(e) =>
                    handleInputChange("detailedComments", e.target.value)
                  }
                  placeholder="Provide detailed feedback to the authors"
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  This comment will be visible to authors and committee
                </p>
              </div>

              {/* Additional Comments to Committee */}
              <div className="space-y-2">
                <Label
                  htmlFor="committee-comments"
                  className="text-base font-medium"
                >
                  Additional Comment to Committee (Optional)
                </Label>
                <Textarea
                  id="committee-comments"
                  value={reviewData.committeeComments}
                  onChange={(e) =>
                    handleInputChange("committeeComments", e.target.value)
                  }
                  placeholder="Enter information that you want to provide additionally for committee only"
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">
                  This comment will be visible only to committee
                </p>
              </div>

              {/* Review Criteria */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">Review Criteria</h3>
                  <span className="text-sm text-muted-foreground">
                    Score: {calculateAverageScore()}/5
                  </span>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-8 gap-0 bg-muted/50 p-3 text-sm font-medium border-b">
                    <div className="col-span-4">Criteria</div>
                    <div className="text-center">Weight</div>
                    <div className="col-span-3 text-center">
                      Rating (worst → best)
                    </div>
                  </div>

                  {reviewCriteria.map((criteria, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-8 gap-0 p-3 border-b last:border-b-0 items-center"
                    >
                      <div className="col-span-4 text-sm">{criteria.name}</div>
                      <div className="text-center text-sm text-muted-foreground">
                        {criteria.weight}
                      </div>
                      <div className="col-span-3">
                        <RadioGroup
                          value={reviewData.criteriaScores[criteria.name] ?? ""}
                          onValueChange={(value) =>
                            handleCriteriaScore(criteria.name, value)
                          }
                          className="flex justify-center space-x-2"
                        >
                          {[1, 2, 3, 4, 5].map((score) => (
                            <div key={score} className="flex items-center">
                              <RadioGroupItem
                                value={score.toString()}
                                id={`${criteria.name}-${score}`}
                                className="w-4 h-4"
                              />
                              <Label
                                htmlFor={`${criteria.name}-${score}`}
                                className="ml-1 text-sm cursor-pointer"
                              >
                                {score}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall Rating */}
              <div className="space-y-4">
                <h3 className="text-base font-medium">Overall Rating</h3>
                <RadioGroup
                  value={reviewData.overallRating}
                  onValueChange={(value) =>
                    handleInputChange("overallRating", value)
                  }
                  className="space-y-2"
                >
                  {overallRatings.map((rating) => (
                    <div
                      key={rating.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={rating.value} id={rating.value} />
                      <Label
                        htmlFor={rating.value}
                        className="text-sm cursor-pointer"
                      >
                        {rating.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button onClick={handleSubmitReview} disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Reviewer Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reviewer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Reviewer:</span> Mariusz Kolanko
                </p>
                <p className="text-sm text-muted-foreground">
                  Please complete your review by {paperData.reviewDeadline}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
