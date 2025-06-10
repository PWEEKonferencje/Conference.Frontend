import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInput {
  workplaceType: "academic" | "company";
  workplace: string;
  position: string;
}

export interface AffiliationDialogProps {
  onSave: (data: FormInput) => void;
}

export default function AffiliationDialog(props: AffiliationDialogProps) {
  const { onSave } = props;

  const [open, setOpen] = useState(false);
  const form = useForm<FormInput>({
    defaultValues: {
      workplaceType: "academic",
      position: "",
      workplace: "",
    },
  });

  const handleSave: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    setOpen(false);
    onSave(data);
  };

  useEffect(() => {
    if (open === false) {
      form.reset({
        workplaceType: "academic",
        position: "",
        workplace: "",
      });
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit(handleSave)(e);
          }}
        >
          <DialogHeader>
            <DialogTitle>Add affiliation</DialogTitle>
          </DialogHeader>
          <div className="py-[24px] flex flex-col gap-y-[16px]">
            <FormField
              control={form.control}
              name="workplaceType"
              render={({ field }) => (
                <FormControl>
                  <RadioGroup
                    className="flex flex-row"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="academic" id="academic" />
                      </FormControl>
                      <Label htmlFor="academic">Academic</Label>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="company" id="company" />
                      </FormControl>
                      <Label htmlFor="company">Company</Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              )}
            />

            <FormField
              control={form.control}
              name="workplace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your institution name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Your position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
