import { useParams } from "react-router";

export default function ConferencePaperViewPage() {
  const { conferenceId, paperId } = useParams();

  return (
    <div>
      <h1>Paper Details</h1>
      <p>Conference ID: {conferenceId}</p>
      <p>Paper ID: {paperId}</p>
      {/* Rest of your component */}
    </div>
  );
}
