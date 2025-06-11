"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { ScheduleViewer } from "@/components/schedule-viewer";
import { useParams } from "react-router";

export default function CommitteeSchedulePage() {
  const { conferenceId } = useParams<{ conferenceId: string }>();
  console.log(conferenceId);
  const conferenceDays = [
    { day: 1, date: new Date("2025-05-15"), title: "Opening & Keynotes" },
    { day: 2, date: new Date("2025-05-16"), title: "Main Conference" },
    { day: 3, date: new Date("2025-05-17"), title: "Main Conference" },
    { day: 4, date: new Date("2025-05-18"), title: "Workshops & Closing" },
  ];

  const tracks = [
    { id: "1", name: "Track A: Deep Learning" },
    { id: "2", name: "Track B: Natural Language Processing" },
    { id: "3", name: "Track C: Computer Vision" },
    { id: "4", name: "Track X: Ethics in AI" },
  ];

  const events = [
    {
      id: "e1",
      title: "Registration & Welcome Coffee",
      type: "Check-in",
      day: 1,
      startTime: "09:00",
      endTime: "09:30",
      location: "Lobby",
      description: "Welcome participants and networking",
    },
    {
      id: "e2",
      title: "Opening Keynote: The Future of AI Research",
      type: "Keynote",
      day: 1,
      startTime: "09:30",
      endTime: "10:30",
      location: "Main Auditorium",
      description: "Welcome participants and networking",
      speaker: "Prof. Alan Turing",
    },
    {
      id: "e3",
      title: "Session 1: Deep Learning Advances",
      type: "Technical Session",
      day: 1,
      startTime: "11:00",
      endTime: "12:30",
      location: "Room A",
      description: "Welcome participants and networking",
      chair: "Dr. Sarah Johnson",
      track: "1",
      papers: [
        {
          id: "p1",
          title:
            "Advances in Transformer Architecture for Multi-modal Learning",
          presenter: "Dr. John Doe",
          form: "Presentation",
        },
        {
          id: "p2",
          title: "Explainable AI: New Approaches for Model Interpretability",
          presenter: "Dr. Emily Rodriguez",
          form: "Poster",
        },
      ],
    },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: "Committee" }, { label: "Schedule" }]} />
      <ScheduleViewer
        events={events}
        conferenceDays={conferenceDays}
        tracks={tracks}
        showExportOnly={true}
      />
    </>
  );
}
