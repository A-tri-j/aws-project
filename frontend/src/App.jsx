
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    async function fetchBackend() {
      try {
        const healthResponse = await fetch(
          `${API_URL}/api/health`
        );

        if (!healthResponse.ok) {
          throw new Error("Backend request failed");
        }

        const healthData = await healthResponse.json();

        const messageResponse = await fetch(
          `${API_URL}/api/message`
        );

        const messageData = await messageResponse.json();

        setBackendStatus(healthData.status);
        setMessage(messageData);
      } catch (err) {
        setBackendStatus("Disconnected");
        setError(err.message);
      }
    }

    fetchBackend();
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <h2>AWS Starter</h2>
        <span>Full Stack Project</span>
      </nav>

      <main className="container">
        <div className="hero">
          <p className="tag">MY FIRST AWS PROJECT</p>

          <h1>React + FastAPI</h1>

          <p>
            A simple full-stack application before
            deploying to Amazon Web Services.
          </p>
        </div>

        <div className="dashboard">
          <div className="card">
            <span>Frontend</span>
            <h2>React</h2>
            <p>Vite Development Server</p>
            <div className="status">Running</div>
          </div>

          <div className="card">
            <span>Backend</span>
            <h2>FastAPI</h2>
            <p>Python REST API</p>
            <div className={
              backendStatus === "healthy"
                ? "status"
                : "status offline"
            }>
              {backendStatus}
            </div>
          </div>
        </div>

        <div className="card response">
          <h2>Backend API Response</h2>

          {message ? (
            <>
              <h3>{message.message}</h3>
              <p>Technology: {message.technology}</p>
              <p>Deployment: {message.deployment}</p>
            </>
          ) : (
            <p>{error || "Loading API data..."}</p>
          )}
        </div>

        <footer>
          Built with React + FastAPI | AWS Deployment Coming Soon
        </footer>
      </main>
    </div>
  );
}

export default App;
