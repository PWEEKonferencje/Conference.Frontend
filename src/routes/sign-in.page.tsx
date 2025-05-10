import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_ROUTES } from "./routes.enum";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/icons/github-icon";
import { GoogleIcon } from "@/components/ui/icons/google-icon";
import { MicrosoftIcon } from "@/components/ui/icons/microsoft-icon";

export default function SignInPage() {
  const handleSignIn = (provider: string) => {
    const url = new URL(window.location.href);
    url.pathname = APP_ROUTES.OAUTH_HANDLER;
    window.location.href = `/api/Auth/oauth?provider=${provider}&returnUrl=${url.toString()}`;
  };

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <Card className={cn("w-[520px]")}>
        <CardHeader>
          <CardTitle>Sign up or log in</CardTitle>
          <CardDescription>
            Click on the account you wish to log in with
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("flex flex-col gap-y-[8px]")}>
          <Button
            onClick={() => handleSignIn("GitHub")}
            variant="outline"
            className={cn("border-[#747775] rounded-[4px]")}
          >
            <div className={cn("flex items-center gap-x-[8px] min-w-[200px]")}>
              <GithubIcon />
              Sign in with GitHub
            </div>
          </Button>
          <Button
            onClick={() => handleSignIn("Google")}
            variant="outline"
            className={cn("border-[#747775] rounded-[4px]")}
          >
            <div className={cn("flex items-center gap-x-[8px] min-w-[200px]")}>
              <GoogleIcon />
              Sign in with Google
            </div>
          </Button>
          <Button
            onClick={() => handleSignIn("Microsoft")}
            variant="outline"
            className={cn("border-[#747775] rounded-[4px]")}
          >
            <div className={cn("flex items-center gap-x-[8px] min-w-[200px]")}>
              <MicrosoftIcon />
              Sign in with Microsoft
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
