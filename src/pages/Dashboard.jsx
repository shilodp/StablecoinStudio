import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar/Sidebar.jsx";
import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;
