import { PaneFull } from "@/components/ui/app/pane/pane-full";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInput {
  name: string;
  surname: string;
  country: string;
  degree: string;
}

export default function ProfilePage() {
  const form = useForm<FormInput>({});

  const handleSubmit: SubmitHandler<FormInput> = () => {
    throw new Error("Unimplemented");
  };

  return (
    <PaneFull className="px-5 py-6">
      <h2 className="text-3xl font-semibold">Your Profile</h2>
      <Form {...form}>
        <form
          onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
          className="flex flex-col gap-5 w-[650px] mt-7"
        >
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Save</Button>
        </form>
      </Form>
      <h2 className="text-2xl font-semibold mt-7">Your Affiliations</h2>
      <div className="mt-4 flex flex-col gap-3">
        <Card className="p-5 w-[300px]">
          <div>
            <div className="font-semibold">Institution</div>
            <div>Some institution</div>
          </div>
          <div>
            <div className="font-semibold">Position</div>
            <div>Some position</div>
          </div>
        </Card>
      </div>
    </PaneFull>
  );
}
