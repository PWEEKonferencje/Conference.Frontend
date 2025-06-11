"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Loader2,
  Plus,
  X,
  Calendar,
  Users,
  FileText,
  Archive,
  User,
  Settings,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import { Link } from "react-router";
import { APP_ROUTES } from "../routes.enum";

interface Affiliation {
  id: string;
  type: "institution" | "company";
  name: string;
  title: string;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "Mariusz",
    surname: "Kolanko",
    degree: "Dr.",
    country: "pl",
    phone: "+48 123 456 789",
    email: "mariusz.kolanko@example.com",
    location: "Warsaw University of Technology, Main Building, Room 101",
    expertise: "ai, electro engineering, microeconomy",
  });
  const [affiliations, setAffiliations] = useState<Affiliation[]>([
    {
      id: "1",
      type: "institution",
      name: "Warsaw University of Technology",
      title: "Assistant Professor",
    },
    {
      id: "2",
      type: "institution",
      name: "Military University of Technology in Warsaw",
      title: "Lecturer",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAffiliationDialog, setShowAffiliationDialog] = useState(false);
  const [newAffiliation, setNewAffiliation] = useState({
    type: "institution" as "institution" | "company",
    name: "",
    title: "",
  });

  // Remove unwanted characters and trim input
  const sanitizeInput = (input: string) => {
    return input.trim().replace(/[<>]/g, "");
  };

  // Validate form fields and set errors
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    if (formData.phone && !/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes for all fields
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: sanitizeInput(value),
    }));
  };

  // Add a new affiliation to the list
  const handleAddAffiliation = () => {
    if (!newAffiliation.name.trim() || !newAffiliation.title.trim()) {
      return;
    }
    const affiliation: Affiliation = {
      id: Date.now().toString(),
      type: newAffiliation.type,
      name: sanitizeInput(newAffiliation.name),
      title: sanitizeInput(newAffiliation.title),
    };
    setAffiliations((prev) => [...prev, affiliation]);
    setNewAffiliation({ type: "institution", name: "", title: "" });
    setShowAffiliationDialog(false);
  };

  // Remove an affiliation by id
  const handleRemoveAffiliation = (id: string) => {
    setAffiliations((prev) => prev.filter((aff) => aff.id !== id));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    // Simulate profile update
    void (await new Promise((resolve) => setTimeout(resolve, 1500)));
    setLoading(false);
    // Replace with toast in real app
    void toast.success("Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/30 p-4 flex flex-col">
        <div className="mb-8">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight">
              conferenc<span className="text-primary">.EE</span>
            </h1>
          </Link>
        </div>

        <nav className="space-y-2 flex-1">
          <Link to={APP_ROUTES.DASHBOARD.ROOT}>
            <Button variant="secondary" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <div className="pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Conferences
            </p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Conference
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Users className="mr-2 h-4 w-4" />
                Join Conference
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <FileText className="mr-2 h-4 w-4" />
                AI in Future
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <FileText className="mr-2 h-4 w-4" />
                Neutral Network in H...
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Archive className="mr-2 h-4 w-4" />
                Show all conferences
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Your papers
            </p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Plus className="mr-2 h-4 w-4" />
                Add new paper
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <FileText className="mr-2 h-4 w-4" />
                Some interesting paper
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <FileText className="mr-2 h-4 w-4" />
                Some more interestin...
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Archive className="mr-2 h-4 w-4" />
                Show all submitted papers
              </Button>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="mt-auto p-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-background border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                M
              </div>
              <span className="text-sm font-medium">Mariusz Kolanko</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    to={APP_ROUTES.DASHBOARD.ROOT}
                    className="flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={APP_ROUTES.DASHBOARD.ROOT}
                    className="flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Card className="border-0 shadow-lg max-w-3xl  w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Profile data
            </CardTitle>
            <CardDescription>
              Update your profile and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                void handleSubmit(e);
              }}
              className="space-y-6"
            >
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    placeholder="Your surname"
                    value={formData.surname}
                    onChange={(e) =>
                      handleInputChange("surname", e.target.value)
                    }
                    className={errors.surname ? "border-destructive" : ""}
                  />
                  {errors.surname && (
                    <p className="text-sm text-destructive">{errors.surname}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    placeholder="E.g., Dr., Eng., Prof., PhD"
                    value={formData.degree}
                    onChange={(e) =>
                      handleInputChange("degree", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, country: value }))
                    }
                  >
                    <SelectTrigger
                      className={errors.country ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select your country of residence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="pl">Poland</SelectItem>
                      <SelectItem value="nl">Netherlands</SelectItem>
                      <SelectItem value="es">Spain</SelectItem>
                      <SelectItem value="it">Italy</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-sm text-destructive">{errors.country}</p>
                  )}
                </div>
              </div>
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact information</h3>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone numbers</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    You may optionally provide a phone number that will be
                    visible to other conference attendees. This allows them to
                    contact you directly. You can share a work, personal, or
                    other number.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Emails</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@domain.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Same as above provide your contact emails. You can share a
                    work, personal or other email address.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., University Name, Building, Room Number"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expertise">Expertise areas</Label>
                  <Textarea
                    id="expertise"
                    placeholder="ai, electro engineering, microeconomy"
                    value={formData.expertise}
                    onChange={(e) =>
                      handleInputChange("expertise", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
              {/* Affiliations */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Affiliations</h3>
                  <Dialog
                    open={showAffiliationDialog}
                    onOpenChange={setShowAffiliationDialog}
                  >
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add affiliation</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <RadioGroup
                          value={newAffiliation.type}
                          onValueChange={(value: "institution" | "company") =>
                            setNewAffiliation((prev) => ({
                              ...prev,
                              type: value,
                            }))
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="institution"
                              id="institution"
                            />
                            <Label htmlFor="institution">Institution</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="company" id="company" />
                            <Label htmlFor="company">Company</Label>
                          </div>
                        </RadioGroup>
                        <div className="space-y-2">
                          <Label>Institution name</Label>
                          <Select
                            value={newAffiliation.name}
                            onValueChange={(value) =>
                              setNewAffiliation((prev) => ({
                                ...prev,
                                name: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Type and select from list below" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Warsaw University of Technology">
                                Warsaw University of Technology
                              </SelectItem>
                              <SelectItem value="Military University of Technology in Warsaw">
                                Military University of Technology in Warsaw
                              </SelectItem>
                              <SelectItem value="University of Warsaw">
                                University of Warsaw
                              </SelectItem>
                              <SelectItem value="MIT">
                                Massachusetts Institute of Technology
                              </SelectItem>
                              <SelectItem value="Stanford University">
                                Stanford University
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            placeholder="E.g., Assistant Professor"
                            value={newAffiliation.title}
                            onChange={(e) =>
                              setNewAffiliation((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <Button
                          onClick={handleAddAffiliation}
                          className="w-full"
                        >
                          Add
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {affiliations.length > 0 && (
                  <div className="space-y-3">
                    {affiliations.map((affiliation) => (
                      <div
                        key={affiliation.id}
                        className="flex items-start justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{affiliation.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {affiliation.title}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleRemoveAffiliation(affiliation.id)
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
