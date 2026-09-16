import ReservationCard from "./ReservationCard.tsx";
import { Reservation } from "../../../hooks/useReservations.ts";
import dayjs from "dayjs";
import "./WeekendGroup.css";

interface Props {
    date: string;
    reservations: Reservation[];
}

const WeekendGroup = ({ date, reservations }: Props) => {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    return (
        <div className="reservation-group">
            <h3 className="reservation-group-title">
                🗓️ Réservations du {formattedDate} ({reservations.length} réservation{reservations.length > 1 ? "s" : ""})
            </h3>
            <div className="reservation-list">
                {reservations.map(r => (
                    <ReservationCard key={r.id} reservation={r} />
                ))}
            </div>
        </div>
    );
};

export default WeekendGroup;
