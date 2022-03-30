import { useState } from "react";
import Data from "./Data";
import Info from "./Info";

const Dashboard = ({ handleExit }) => {
  const [tab, setTab] = useState("data");
  return (
    <div className="dashboardContent">
      <div className="tabs">
        <button
          type="button"
          className={`tab ${tab == "data" ? "active" : ""}`}
          onClick={() => setTab("data")}
        >
          دیتا
        </button>
        <button
          type="button"
          className={`tab ${tab == "info" ? "active" : ""}`}
          onClick={() => setTab("info")}
        >
          مشخصات من
        </button>
      </div>
      <Info state={tab == "info"} handleExit={handleExit} />
      <Data state={tab == "data"} />
    </div>
  );
};

export default Dashboard;
