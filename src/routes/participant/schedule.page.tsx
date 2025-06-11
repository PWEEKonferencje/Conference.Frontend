"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { ScheduleViewer } from "@/components/schedule-viewer";
import { useParams } from "react-router";

// Sample data for demonstration
const conferenceDays = [
  { day: 1, date: new Date(2025, 4, 15), title: "Opening & Keynotes" },
  { day: 2, date: new Date(2025, 4, 16), title: "Main Sessions" },
  { day: 3, date: new Date(2025, 4, 17), title: "Workshops" },
  { day: 4, date: new Date(2025, 4, 18), title: "Closing Day" },
];

const tracks = [
  { id: "1", name: "Deep Learning" },
  { id: "2", name: "Natural Language Processing" },
  { id: "3", name: "Computer Vision" },
  { id: "4", name: "AI Ethics" },
];

const events = [
  {
    id: "event1",
    title: "Registration & Welcome Coffee",
    type: "Opening",
    day: 1,
    startTime: "09:00",
    endTime: "09:30",
    location: "Lobby",
    description: "Welcome participants and networking",
  },
  {
    id: "event2",
    title: "Opening Keynote: The Future of AI Research",
    type: "Keynote",
    day: 1,
    startTime: "09:30",
    endTime: "10:30",
    location: "Main Auditorium",
    description: "Welcome participants and networking",
    speaker: "Dr. Alexandra Nowak",
  },
  {
    id: "event3",
    title: "Session 1: Deep Learning Advances",
    type: "Session",
    day: 1,
    startTime: "11:00",
    endTime: "12:30",
    location: "Room A",
    description: "Welcome participants and networking",
    chair: "Dr. Sarah Johnson",
    track: "1",
    papers: [
      {
        id: "paper1",
        title: "Advances in Transformer Architecture for Multi-modal Learning",
        presenter: "Dr. John Doe",
        form: "Presentation",
      },
      {
        id: "paper2",
        title: "Explainable AI: New Approaches for Model Interpretability",
        presenter: "Dr. Emily Rodriguez",
        form: "Poster",
      },
    ],
  },
];

export default function SchedulePage() {
  const { conferenceId } = useParams();
  console.log(conferenceId);

  return (
    <>
      <Breadcrumb items={[{ label: "Participant" }, { label: "Schedule" }]} />

      <ScheduleViewer
        events={events}
        conferenceDays={conferenceDays}
        tracks={tracks}
        showExportOnly={true}
      />
    </>
  );
}
