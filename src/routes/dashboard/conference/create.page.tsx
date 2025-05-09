import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInput {
  name: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  papersSubmissionDeadline: string;
  location: string;
  description: string;
}

export default function ConferenceCreatePage() {
  const form = useForm<FormInput>({});

    const handleSubmit: SubmitHandler<FormInput> = () => {
      throw new Error("Unimplemented");
    };

  return (
    <div className="px-5 py-6">
      <h3 className="text-3xl font-semibold">Create new conference</h3>
      <p className="text-lg font-light text-muted-foreground ml-0.5">
        Fill information about new conference
      </p>
      <Form {...form}>
        <form
          onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
          className="flex flex-col gap-5 w-[650px] mt-7"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conference name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Start date</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>End date</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="registrationDeadline"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Registration deadline</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="papersSubmissionDeadline"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Papers submission deadline</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
}
