import React, {useEffect, useState} from "react";
import WeekendGroup from "./WeekendGroup";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "./ReservationTimeline.css";
import groupBy from 'lodash/groupBy';

dayjs.extend(isoWeek);

export interface Reservation {
    id: number;
    date: string; // format: "YYYY-MM-DD"
    client: string;
    phone: string;
    location: string;
    city: string;
    status: "confirmée" | "en attente" | "annulée";
}

const ReservationTimeline: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        fetch("/api/reservations")
            .then(res => res.json())
            .then(data => setReservations([
                {
                    id: 1,
                    date: "2025-06-07",
                    client: "Dupont F.",
                    phone: "0612345678",
                    location: "Château de la Forêt",
                    city: "Bordeaux",
                    status: "confirmée"
                },
                {
                    id: 2,
                    date: "2025-06-08",
                    client: "Martin S.",
                    phone: "0798765432",
                    location: "Salle des Fêtes des Lilas",
                    city: "Toulouse",
                    status: "en attente"
                }
            ]));
    }, []);

    const grouped = groupBy(reservations, r =>
        dayjs(r.date).startOf("isoWeek").format("YYYY-MM-DD")
    );

    const sortedWeekends = Object.keys(grouped).sort();

    return (
        <div className="timeline-container">
            <h2 className="timeline-title">📅 Prochaines réservations par week-end</h2>

            {sortedWeekends.map(startOfWeek => (
                <WeekendGroup
                    key={startOfWeek}
                    startOfWeek={startOfWeek}
                    reservations={grouped[startOfWeek]}
                />
            ))}
        </div>
    );
};

export default ReservationTimeline;