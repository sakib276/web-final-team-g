import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <nav>
        <h1> SpaceSync: A Resource Allocation System </h1>
        <button onClick={() => setPage("dashboard")}>Resources</button>
        <button onClick={() => setPage("schedule")}>Schedule</button>
      </nav>
      <main>
        {page === "dashboard" && <Dashboard />}
        {page === "schedule" && <Schedule />}
      </main>
    </>
  );
}