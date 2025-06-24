import { Reservation } from "./ReservationTimeline.tsx";
import "./ReservationCard.css";

interface Props {
    reservation: Reservation;
}

const ReservationCard= ({ reservation } : Props) => {
    return (
        <div className={`reservation-card status-${reservation.status.replace(" ", "-")}`}>
            <div className="reservation-info">
                <p className="client">{reservation.client}</p>
                <p className="location">{reservation.location}, {reservation.city}</p>
                <p className="phone">📞 {reservation.phone}</p>
            </div>
            <div className="status">{reservation.status}</div>
        </div>
    );
};

export default ReservationCard;
