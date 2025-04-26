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
    <Card className="w-[370px]">
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>
          This step is mandatory to create an account on platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="email" />
      </CardContent>
      <CardFooter>
        <Button>Proceed</Button>
      </CardFooter>
    </Card>
  );
}
