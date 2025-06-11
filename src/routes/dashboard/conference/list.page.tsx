import { Link, useNavigate } from "react-router";

export default function ConferenceListPage() {
  const navigate = useNavigate();

  // Using Link component
  return (
    <div>
      <h1>Conferences</h1>

      {/* Using Link */}
      <Link to={`/dashboard/conference/123`}>View Conference 123</Link>

      {/* Using navigate programmatically */}
      <button onClick={() => void navigate(`/dashboard/conference/456`)}>
        View Conference 456
      </button>
    </div>
  );
}
