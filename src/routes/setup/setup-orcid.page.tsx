import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    <Card className="w-[370px]">
      <CardHeader>
        <CardTitle>Provide your ORCID iD</CardTitle>
        <CardDescription>
          This step is not mandatory to create an account on platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(handleProceed)(e)}>
            <FormField
              control={form.control}
              name="orcidId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Orcid id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Proceed</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
