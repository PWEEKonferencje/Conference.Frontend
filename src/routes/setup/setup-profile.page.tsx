import { useEffect, useState } from "react";
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
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Plus, X } from "lucide-react";
import { ProgressIndicator } from "@/components/progress-indicator";
import { useNavigate } from "react-router";
import { useApiClient } from "@/api-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { APP_ROUTES } from "../routes.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAccountDetails } from "@/lib/auth/hooks";
import { useAuthStore } from "@/lib/auth/auth.store";

const steps = ["Provider", "Email", "ORCID", "Profile", "Confirm"];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  degree: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  location: z.string().optional(),
  expertise: z.string().optional(),
  affiliations: z.array(
    z.object({
      workplace: z.string(),
      position: z.string(),
      description: z.string(),
      isAcademic: z.boolean(),
    }),
  ),
});

type FormInput = z.infer<typeof formSchema>;

export default function SetupProfilePage() {
  const navigate = useNavigate();
  const user = useAccountDetails();

  useEffect(() => {
    console.log(user);
    if (user?.isAccountSetupFinished === true) {
      void navigate(APP_ROUTES.DASHBOARD.ROOT);
    }
  }, [user, navigate]);

  const apiClient = useApiClient();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAffiliation, setNewAffiliation] = useState({
    type: "institution" as "institution" | "company",
    workplace: "",
    position: "",
  });
  const updateAccountDetails = useAuthStore((s) => s.updateAccountDetails);

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      degree: "",
      country: "",
      phone: "",
      email: "",
      location: "",
      expertise: "",
      affiliations: [],
    },
  });

  const handleSave: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    try {
      await apiClient.POST("/api/Profile", {
        body: {
          ...data,
        },
      });
      void navigate(APP_ROUTES.SETUP.CONFIRM);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setLoading(false);
    }

    updateAccountDetails({
      isAccountSetupFinished: true,
    });
    void navigate(APP_ROUTES.ROOT);
  };

  const handleAddAffiliation = () => {
    if (!newAffiliation.workplace.trim() || !newAffiliation.position.trim()) {
      return;
    }

    const affiliations = form.getValues("affiliations");
    form.setValue("affiliations", [
      ...affiliations,
      {
        isAcademic: newAffiliation.type === "institution",
        workplace: newAffiliation.workplace,
        position: newAffiliation.position,
        description: "",
      },
    ]);

    setNewAffiliation({ type: "institution", workplace: "", position: "" });
    setDialogOpen(false);
  };

  const handleRemoveAffiliation = (index: number) => {
    const affiliations = form.getValues("affiliations");
    form.setValue(
      "affiliations",
      affiliations.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-6">
        <ProgressIndicator currentStep={3} totalSteps={5} steps={steps} />

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Profile setup
            </CardTitle>
            <CardDescription>
              Fill forms below with your data and your affiliations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={(e) => void form.handleSubmit(handleSave)(e)}
                className="space-y-6"
              >
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Surname</FormLabel>
                        <FormControl>
                          <Input placeholder="Your surname" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g., Dr., Eng., Prof., PhD"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country of residence" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="United States">
                              United States
                            </SelectItem>
                            <SelectItem value="United Kingdom">
                              United Kingdom
                            </SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Poland">Poland</SelectItem>
                            <SelectItem value="Netherlands">
                              Netherlands
                            </SelectItem>
                            <SelectItem value="Spain">Spain</SelectItem>
                            <SelectItem value="Italy">Italy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact information</h3>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone numbers</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <p className="text-sm text-muted-foreground">
                          You may optionally provide a phone number that will be
                          visible to other conference attendees.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emails</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@domain.com"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-sm text-muted-foreground">
                          Same as above provide your contact emails. You can
                          share a work, personal or other email address.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., University Name, Building, Room Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expertise areas</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ai, electro engineering, microeconomy"
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Affiliations */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Affiliations</h3>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add affiliation</DialogTitle>
                          <DialogDescription>
                            Add your academic or professional affiliation
                            details.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <RadioGroup
                              defaultValue="institution"
                              onValueChange={(
                                value: "institution" | "company",
                              ) =>
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
                          </div>

                          <div className="space-y-2">
                            <Label>Institution name</Label>
                            <Input
                              placeholder="Enter institution name"
                              value={newAffiliation.workplace}
                              onChange={(e) =>
                                setNewAffiliation((prev) => ({
                                  ...prev,
                                  workplace: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              placeholder="E.g., Assistant Professor"
                              value={newAffiliation.position}
                              onChange={(e) =>
                                setNewAffiliation((prev) => ({
                                  ...prev,
                                  position: e.target.value,
                                }))
                              }
                            />
                          </div>

                          <Button
                            onClick={handleAddAffiliation}
                            type="button"
                            className="w-full"
                          >
                            Add Affiliation
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {form.watch("affiliations").length > 0 && (
                    <div className="space-y-3">
                      {form.watch("affiliations").map((affiliation, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">
                              {affiliation.workplace}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {affiliation.position}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAffiliation(index)}
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
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
