import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import "./admin.css"
import ReservationTimeline from "./reservation-timeline/ReservationTimeline.tsx";
import {useState} from "react";
import AvisManagement from "./avis/avis-management.tsx";

type TabType = "reservations" | "avis";

export const Admin = () => {
    useTitle('Admin');
    const [activeTab, setActiveTab] = useState<TabType>("reservations");

    return (
        <div className="admin-container">
            <div className="admin-tabs">
                <button
                    className={`tab-button ${activeTab === "reservations" ? "active" : ""}`}
                    onClick={() => setActiveTab("reservations")}
                >
                    📅 Réservations
                </button>
                <button
                    className={`tab-button ${activeTab === "avis" ? "active" : ""}`}
                    onClick={() => setActiveTab("avis")}
                >
                    ⭐ Gestion des avis
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "reservations" && <ReservationTimeline />}
                {activeTab === "avis" && <AvisManagement />}
            </div>
        </div>
    );
};