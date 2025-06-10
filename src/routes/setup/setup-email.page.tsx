"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
import { Loader2, ArrowRight } from "lucide-react";
import { ProgressIndicator } from "@/components/progress-indicator";
import { APP_ROUTES } from "../routes.enum";
import { useAuthStore } from "@/lib/auth/auth.store";

const steps = ["Provider", "Email", "ORCID", "Profile", "Confirm"];

export default function SetupEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const navigate = useNavigate();
  const isEmailProvided = useAuthStore(
    (s) => s.accountDetails?.isEmailProvided,
  );

  useEffect(() => {
    if (isEmailProvided !== false) {
      void navigate(APP_ROUTES.ROOT);
    }
  }, [navigate, isEmailProvided]);

  const sanitizeEmail = (email: string) => {
    return email.trim().toLowerCase();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const sanitizedEmail = sanitizeEmail(email);

    // Validation
    if (!sanitizedEmail) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement email verification logic here
      void (await new Promise((resolve) => setTimeout(resolve, 1500)));

      // Navigate to next step
      void navigate(APP_ROUTES.SETUP.ORCID);
    } catch (error: unknown) {
      console.error("Email verification failed:", error);
      setErrors({ email: "Failed to verify email. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <ProgressIndicator currentStep={1} totalSteps={5} steps={steps} />

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">Email</CardTitle>
            <CardDescription className="text-muted-foreground">
              This step is mandatory to create an account on platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                void handleSubmit(e);
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <Button type="submit" className="w-full gap-2" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Proceed
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
