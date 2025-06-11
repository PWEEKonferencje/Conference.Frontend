import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Upload, FileText } from "lucide-react";

export default function SubmitPaper() {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    abstract: "",
    keywords: "",
    track: "",
    file: null as File | null,
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData({ ...formData, file });
    setFileName(file?.name ?? null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Participant</span>
        <span>/</span>
        <span>My Papers</span>
        <span>/</span>
        <span>Submit New Paper</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Submit New Paper</h1>
        <p className="text-gray-600">
          Fill out all the required information below to submit your paper to
          the AI Research Conference 2025.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-8">
          {/* Paper Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              Paper Title
            </Label>
            <Input
              id="title"
              placeholder="Enter the full title of your research paper"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              Provide a clear and descriptive title that accurately reflects
              your research
            </p>
          </div>

          {/* Authors */}
          <div className="space-y-2">
            <Label htmlFor="authors" className="text-base font-medium">
              Authors
            </Label>
            <Textarea
              id="authors"
              placeholder="List all authors of your research paper"
              value={formData.authors}
              onChange={(e) =>
                setFormData({ ...formData, authors: e.target.value })
              }
              rows={3}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              Provide Full Name with optional ORCID ID
            </p>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <Label htmlFor="abstract" className="text-base font-medium">
              Abstract
            </Label>
            <Textarea
              id="abstract"
              placeholder="Provide a comprehensive abstract that summarizes your research objectives, methodology, key findings, and conclusions. The abstract should be self-contained and give readers a clear understanding of your work."
              rows={6}
              value={formData.abstract}
              onChange={(e) =>
                setFormData({ ...formData, abstract: e.target.value })
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Write a clear and concise abstract (recommended: 150-300 words)
              </span>
              <span>0 characters</span>
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-base font-medium">
              Keywords
            </Label>
            <Input
              id="keywords"
              placeholder="machine learning, neural networks, computer vision, deep learning, artificial intelligence"
              value={formData.keywords}
              onChange={(e) =>
                setFormData({ ...formData, keywords: e.target.value })
              }
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              Enter 3-8 keywords separated by commas. Use specific terms that
              best describe your research area.
            </p>
          </div>

          {/* Track Proposal */}
          <div className="space-y-2">
            <Label htmlFor="track" className="text-base font-medium">
              Track proposal
            </Label>
            <Select
              value={formData.track}
              onValueChange={(value) =>
                setFormData({ ...formData, track: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deep-learning">Deep Learning</SelectItem>
                <SelectItem value="nlp">Natural Language Processing</SelectItem>
                <SelectItem value="computer-vision">Computer Vision</SelectItem>
                <SelectItem value="ai-ethics">AI Ethics</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Select track that you think fit most for your work or leave blank
              if you don&apos;t want to choose
            </p>
          </div>

          {/* Upload Paper */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Upload Paper</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:bg-gray-100 transition-colors">
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer w-full">
                <div className="flex flex-col items-center justify-center text-center">
                  {!fileName ? (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-700">
                        Choose File
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        or drag and drop your PDF here
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        PDF files only, max 10MB
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <FileText className="h-10 w-10 text-blue-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-700">
                          {fileName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click to change file
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Label>
            </div>
            <p className="text-sm text-gray-500">
              Please ensure your PDF follows the conference formatting
              guidelines and includes all required sections.
            </p>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-3">Submission Guidelines</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Papers must be original and not published elsewhere</li>
              <li>• Maximum length: 8 pages including references</li>
              <li>• Use the provided conference template</li>
              <li>
                • Ensure anonymous submission (remove author information from
                PDF)
              </li>
              <li>• Include proper citations and references</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gray-800 hover:bg-gray-900"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
