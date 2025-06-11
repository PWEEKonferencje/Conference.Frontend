"use client";

import { Button } from "@/components/ui/button";
import { useToastNotification } from "@/hooks/use-toast-notification";

export function DemoNotificationButtons() {
  const notify = useToastNotification();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          notify.success(
            "Paper Accepted",
            "Your paper 'Advances in Transformer Architecture' has been accepted.",
            {
              text: "View Paper",
              href: "/participant/conf-1/papers/paper-1",
            },
          )
        }
      >
        Demo Success
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          notify.error(
            "Submission Failed",
            "There was an error uploading your paper. Please try again.",
          )
        }
      >
        Demo Error
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          notify.warning(
            "Deadline Approaching",
            "The submission deadline for 'AI in Future' is in 3 days.",
          )
        }
      >
        Demo Warning
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          notify.info(
            "New Review Assigned",
            "You have been assigned a new paper to review.",
          )
        }
      >
        Demo Info
      </Button>
    </div>
  );
}
