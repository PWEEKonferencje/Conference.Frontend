import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/auth/auth.store";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../routes.enum";
import { MoveRightIcon } from "lucide-react";

export default function SetupEmailPage() {
  const navigate = useNavigate();
  const isEmailProvided = useAuthStore(
    (s) => s.accountDetails?.isEmailProvided,
  );

  useEffect(() => {
    if (isEmailProvided !== false) {
      void navigate(APP_ROUTES.ROOT);
    }
  }, [navigate, isEmailProvided]);

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <Card className="max-w-[320px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Email</CardTitle>
          <CardDescription>
            This step is mandatory to create an account on platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="email" />
        </CardContent>
        <CardFooter className="flex justify-end gap-x-[8px]">
          <Button type="submit">
            Proceed <MoveRightIcon />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
