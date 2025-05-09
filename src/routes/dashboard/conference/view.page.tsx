import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlus } from "lucide-react";

export default function ConferenceViewPage() {
  return (
    <div className="px-5 py-4 flex flex-col gap-7">
      <h3 className="text-4xl font-semibold">Interesting Conference 2015</h3>
      <div className="flex flex-row gap-5">
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle>Date & Location</CardTitle>
          </CardHeader>
          <CardContent>
            11.03.2025-13.03.2025, PW EE, Warsaw, Poland
          </CardContent>
          <CardFooter className="flex flex-row-reverse">
            <a href="#" className="underline text-md font-light">
              Edit
            </a>
          </CardFooter>
        </Card>
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle>Registration Deadline</CardTitle>
          </CardHeader>
          <CardContent>08.03.2025</CardContent>
          <CardFooter className="flex flex-row-reverse">
            <a href="#" className="underline text-md font-light">
              Edit
            </a>
          </CardFooter>
        </Card>
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle>Papers Submission Deadline</CardTitle>
          </CardHeader>
          <CardContent>02.03.2025</CardContent>
          <CardFooter className="flex flex-row-reverse">
            <a href="#" className="underline text-md font-light">
              Edit
            </a>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-3">
        <h4 className="text-3xl font-semibold">Conference tracks</h4>
        <div className="flex flex-row gap-5 mt-3">
          <Card>
            <CardHeader>
              <CardTitle>Electronics</CardTitle>
            </CardHeader>
            <CardFooter>
              <a href="#" className="underline">
                Go to track
              </a>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Artificial Intelligence & LLM</CardTitle>
            </CardHeader>
            <CardFooter>
              <a href="#" className="underline">
                Go to track
              </a>
            </CardFooter>
          </Card>
          <Card>
            <CardContent>
              <a href="#" className="flex flex-col items-center justify-center">
                <CirclePlus />
                <span>Add new track</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-3">
        <h4 className="text-3xl font-semibold">Participants</h4>
        <div className="flex flex-row gap-5 mt-3">
          <Card>
            <CardHeader>
              <CardTitle>0 Registered participants</CardTitle>
            </CardHeader>
            <CardFooter>
              <a href="#" className="underline">
                Go to Registered Participants
              </a>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>0 Committee Members</CardTitle>
            </CardHeader>
            <CardFooter>
              <a href="#" className="underline">
                Go to Committee Members
              </a>
            </CardFooter>
          </Card>
          <Card className="w-[240px]">
            <CardHeader>
              <CardTitle>Generate public invitation link</CardTitle>
            </CardHeader>
            <CardFooter>
              <a href="#" className="underline">
                Generate invitation link
              </a>
            </CardFooter>
          </Card>
          <Card className="w-[240px]">
            <CardHeader>
              <CardTitle>Generate one-time only invitation link</CardTitle>
            </CardHeader>
            <CardFooter>
              <a href="#" className="underline">
                Generate invitation link
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
