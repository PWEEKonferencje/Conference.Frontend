export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="section-spacing">
        <h1 className="text-3xl font-bold mb-6">
          About Conference Management System
        </h1>

        <div className="prose max-w-none dark:prose-invert space-y-6">
          <p>
            Our Conference Management System is a comprehensive platform
            designed to streamline the entire academic conference process, from
            paper submissions to reviews and final presentations.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Features</h2>

            <ul className="space-y-2 list-disc pl-6">
              <li>
                <strong>Role-Based Access:</strong> Different interfaces for
                chairmen, committee members, reviewers, and participants
              </li>
              <li>
                <strong>Double-Blind Review Process:</strong> Ensures unbiased
                evaluation of submissions
              </li>
              <li>
                <strong>Paper Management:</strong> Submit, track, and update
                papers throughout the review process
              </li>
              <li>
                <strong>Review System:</strong> Assign reviewers, provide
                feedback, and make acceptance decisions
              </li>
              <li>
                <strong>Conference Organization:</strong> Manage schedules,
                sessions, and participant registration
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>

            <p>
              We aim to simplify the complex process of academic conference
              management, making it more efficient for organizers and more
              transparent for participants. Our platform helps conference
              organizers focus on content quality rather than administrative
              tasks.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Who We Serve</h2>

            <p>
              Our system is designed for academic institutions, research
              organizations, professional associations, and any group organizing
              conferences with a formal paper submission and review process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>

            <div className="space-y-2">
              <p>
                For more information about our Conference Management System,
                please contact us at:
              </p>
              <p>Email: info@conferenceapp.example.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
