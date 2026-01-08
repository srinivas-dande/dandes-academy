export default function StudentDashboard() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f2f4f7",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        color: "#222", // <-- FORCE DARK TEXT
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#111", // <-- DARK TITLE
          marginBottom: "25px",
        }}
      >
        Student Dashboard
      </h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        {/* Profile Card */}
        <div
          style={{
            width: "300px",
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            color: "#222", // <-- TEXT COLOR FIXED
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            My Profile
          </h3>

          <p>Name: <strong style={{ color: "#000" }}>Student Name</strong></p>
          <p>Email: <strong style={{ color: "#000" }}>student@example.com</strong></p>
          <p>Phone: <strong style={{ color: "#000" }}>9876543210</strong></p>
        </div>

        {/* Course Card */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            color: "#222",
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            My Course
          </h3>

          <p>Course Name: <strong style={{ color: "#000" }}>Full Stack Development</strong></p>
          <p>Batch Time: <strong style={{ color: "#000" }}>10:00 AM - 12:00 PM</strong></p>
          <p>Status: <strong style={{ color: "#00a000" }}>Active</strong></p>
        </div>
      </div>

      {/* Announcements */}
      <div
        style={{
          marginTop: "30px",
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          color: "#222",
        }}
      >
        <h3
          style={{
            marginBottom: "10px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Announcements
        </h3>

        <ul style={{ color: "#222" }}>
          <li><strong>Welcome to Dande’s Academy 🎉</strong></li>
          <li>Your new assignments will be added soon.</li>
          <li>Attend classes regularly for best results.</li>
        </ul>
      </div>
    </div>
  );
}
