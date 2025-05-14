import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../routes.enum";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth/auth.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useApiClient } from "@/api-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import { SegmentedInput } from "@/components/ui/app/auth/SegmentedInput";

interface FormInput {
  orcidId: string;
}

export default function SetupOrcidPage() {
  const navigate = useNavigate();
  const apiClient = useApiClient();
  const isAccountSetupFinished = useAuthStore(
    (s) => s.accountDetails?.isAccountSetupFinished,
  );

  useEffect(() => {
    if (isAccountSetupFinished !== false) {
      void navigate(APP_ROUTES.ROOT);
    }
  }, [navigate, isAccountSetupFinished]);

  const form = useForm<FormInput>({
    defaultValues: {
      orcidId: "",
    },
  });

  const handleProceed: SubmitHandler<FormInput> = async ({ orcidId }) => {
    console.log(orcidId);
    const { error } = await apiClient.POST("/api/Profile/orcid", {
      body: {
        orcidId,
      },
    });

    if (!error) {
      return navigate(APP_ROUTES.ROOT);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <Card className="w-[520px]">
        <CardHeader>
          <CardTitle>Provide your ORCID iD</CardTitle>
          <CardDescription>
            This step is <u>not</u> mandatory to create an account on platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                void form.handleSubmit(handleProceed)(e);
              }}
              className={cn("flex flex-col gap-y-[16px]")}
            >
              <FormField
                control={form.control}
                name="orcidId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SegmentedInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="0000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <nav className={cn("flex justify-end gap-x-[8px]")}>
                <Button type="button" variant="secondary">
                  Skip
                </Button>
                <Button type="submit">
                  Proceed <MoveRightIcon />
                </Button>
              </nav>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
