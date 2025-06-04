import React from "react";
import ReservationCard from "./ReservationCard";
import { Reservation } from "./ReservationTimeline";
import dayjs from "dayjs";
import "./WeekendGroup.css";

interface Props {
    startOfWeek: string;
    reservations: Reservation[];
}

const WeekendGroup: React.FC<Props> = ({ startOfWeek, reservations }) => {
    const saturday = dayjs(startOfWeek).add(5, "day");
    const sunday = saturday.add(1, "day");

    return (
        <div className="weekend-group">
            <h3 className="weekend-title">
                🗓️ Week-end du {saturday.format("DD/MM")} au {sunday.format("DD/MM/YYYY")} ({reservations.length} réservation{reservations.length > 1 ? "s" : ""})
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
