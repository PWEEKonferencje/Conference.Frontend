import { PaneFull } from "@/components/ui/app/pane/pane-full";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  Calendar,
  ContactRound,
  Newspaper,
} from "lucide-react";

export default function InvitationPage() {
  return (
    <PaneFull className="flex justify-center items-center">
      <Card className="min-w-[600px]">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Very Interesting Conference 2025
          </CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet rsl rsl rsl rsl rsl rsl rsl-bis rsl
            rsl...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Calendar />
            10.03.2025 - 12.03.2025
          </div>
          <div>
            <Building2 />
            PW EE, Warsaw, Poland
          </div>
          <div>
            <Newspaper />
            01.03.2025
          </div>
          <div>
            <ContactRound />
            03.03.2025
          </div>
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <Button>
            Join this conference
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </PaneFull>
  );
}
