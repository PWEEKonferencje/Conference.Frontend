import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_ROUTES } from "./routes.enum";

export default function SignInPage() {
  const handleSignIn = (provider: string) => {
    const url = new URL(window.location.href);
    url.pathname = APP_ROUTES.OAUTH_HANDLER;
    window.location.href = `/api/Auth/oauth?provider=${provider}&returnUrl=${url.toString()}`;
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign up or log in</CardTitle>
        <CardDescription>
          Click on the account you wish to log in with
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => handleSignIn("GitHub")}>
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  );
}
