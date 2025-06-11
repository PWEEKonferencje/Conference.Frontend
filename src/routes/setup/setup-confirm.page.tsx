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
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { ProgressIndicator } from "@/components/progress-indicator";
import { APP_ROUTES } from "../routes.enum";
import { useAccountDetails } from "@/lib/auth/hooks";

const steps = ["Provider", "Email", "ORCID", "Profile", "Confirm"];

export default function ProfileConfirmationPage() {
  const [loading, setLoading] = useState(false);
  const user = useAccountDetails();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      void navigate(APP_ROUTES.SETUP.ROOT);
      return;
    }
  }, [user, navigate]);

  const handleComplete = async () => {
    setLoading(true);

    // Simulate final profile setup completion
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear auth flow data
    sessionStorage.removeItem("authFlow");

    // Redirect to user dashboard
    void navigate(APP_ROUTES.DASHBOARD.ROOT);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <ProgressIndicator currentStep={4} totalSteps={5} steps={steps} />

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold">
              Profile Setup Complete
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Your profile has been successfully created and you&apos;re ready
              to start using the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => void handleComplete()}
              className="w-full gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
