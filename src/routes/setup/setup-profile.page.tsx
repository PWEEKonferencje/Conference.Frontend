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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { PaneFull } from "@/components/ui/app/pane/pane-full";
import { useApiClient } from "@/api-client";
import AffiliationDialog, {
  AffiliationDialogProps,
} from "@/features/setup/components/AffiliationDialog";
import { APP_ROUTES } from "../routes.enum";

interface FormInput {
  name: string;
  surname: string;
  degree: string;
  affiliations: {
    workplace: string;
    position: string;
    description: string;
    isAcademic: boolean;
  }[];
}

export default function SetupProfilePage() {
  const navigate = useNavigate();
  const apiClient = useApiClient();

  const form = useForm<FormInput>({
    defaultValues: {
      affiliations: [],
    },
  });

  const handleSave: SubmitHandler<FormInput> = async (data) => {
    await apiClient.POST("/api/Profile", {
      body: {
        ...data,
      },
    });

    void navigate(APP_ROUTES.ROOT);
  };

  const handleAffiliationSave: AffiliationDialogProps["onSave"] = (data) => {
    const affiliations = form.getValues("affiliations");

    form.setValue("affiliations", [
      ...affiliations,
      {
        isAcademic: data.workplaceType === "academic",
        workplace: data.workplace,
        position: data.position,
        description: "",
      },
    ]);
  };

  return (
    <PaneFull className="flex flex-row justify-center items-center">
      <Card className="max-w-[520px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Setup Your profile</CardTitle>
          <CardDescription>
            Fill forms bellow with your data and your affiliations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e) => void form.handleSubmit(handleSave)(e)}
              className="flex flex-col"
            >
              <div className="flex flex-col gap-y-[16px] pb-[24px]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Your surname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Dr., Eng., Prof., PhD"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div className="flex flex-row justify-between py-[24px]">
                <h2 className="text-2xl font-semibold">Affiliations</h2>
                <AffiliationDialog onSave={handleAffiliationSave} />
              </div>
              <div className="flex flex-col gap-y-3 mb-4">
                {form.watch("affiliations").map((affiliation, i) => (
                  <Card key={i} className="p-5">
                    <div>
                      <div className="font-semibold">Institution</div>
                      <div>{affiliation.workplace}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Position</div>
                      <div>{affiliation.position}</div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button type="submit" className="self-end">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PaneFull>
  );
}
