import { useMemo, useState } from "react";
import dayjs from "dayjs";
import "./ReservationTimeline.css";
import "./WeekendGroup.css";
import ReservationCard from "./ReservationCard.tsx";
import useReservations, { Reservation } from "../../../hooks/useReservations.ts";

const monthLabels = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

const getInitialPeriod = () => {
    const now = new Date();

    return {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
    };
};

const ReservationTimeline = () => {
    const [period, setPeriod] = useState(getInitialPeriod);

    const { reservations, isLoading, isError } = useReservations(period.month, period.year);

    const groupedReservations = useMemo(() => {
        return (reservations ?? []).reduce<Record<string, Reservation[]>>((groups, reservation) => {
            if (!groups[reservation.date]) {
                groups[reservation.date] = [];
            }

            groups[reservation.date].push(reservation);
            return groups;
        }, {});
    }, [reservations]);

    const sortedDates = useMemo(
        () => Object.keys(groupedReservations).sort((a, b) => a.localeCompare(b)),
        [groupedReservations]
    );

    const availableYears = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 7 }, (_, index) => currentYear - 2 + index);
    }, []);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriod((current) => ({ ...current, month: Number(event.target.value) }));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriod((current) => ({ ...current, year: Number(event.target.value) }));
    };

    const handlePreviousMonth = () => {
        setPeriod((current) =>
            current.month === 1
                ? { month: 12, year: current.year - 1 }
                : { ...current, month: current.month - 1 }
        );
    };

    const handleNextMonth = () => {
        setPeriod((current) =>
            current.month === 12
                ? { month: 1, year: current.year + 1 }
                : { ...current, month: current.month + 1 }
        );
    };

    const periodLabel = `${monthLabels[period.month - 1]} ${period.year}`;
    const totalReservations = reservations?.length ?? 0;

    return (
        <div className="timeline-container">
            <div className="timeline-header">
                <div className="timeline-heading">
                    <h2 className="timeline-title">📅 Réservations par mois</h2>
                    <p className="timeline-subtitle">Affichage de {periodLabel.toLowerCase()}</p>
                </div>

                <div className="timeline-controls">
                    <button type="button" className="timeline-nav-button" onClick={handlePreviousMonth}>
                        ◀ Mois précédent
                    </button>

                    <div className="timeline-selectors">
                        <select value={period.month} onChange={handleMonthChange} aria-label="Sélectionner le mois">
                            {monthLabels.map((label, index) => (
                                <option key={label} value={index + 1}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <select value={period.year} onChange={handleYearChange} aria-label="Sélectionner l'année">
                            {availableYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="button" className="timeline-nav-button" onClick={handleNextMonth}>
                        Mois suivant ▶
                    </button>
                </div>
            </div>

            <div className="timeline-summary">
                <span>{totalReservations} réservation{totalReservations > 1 ? "s" : ""}</span>
            </div>

            {isLoading && <p className="timeline-feedback">Chargement des réservations...</p>}
            {isError && <p className="timeline-feedback timeline-feedback-error">Impossible de charger les réservations.</p>}

            {!isLoading && !isError && sortedDates.length === 0 && (
                <p className="timeline-feedback">Aucune réservation trouvée pour cette période.</p>
            )}

            <div className="timeline-groups">
                {sortedDates.map((date) => {
                    const dayReservations = groupedReservations[date];

                    return (
                        <div key={date} className="reservation-group">
                            <h3 className="reservation-group-title">
                                🗓️ Réservations du {dayjs(date).format("DD/MM/YYYY")} ({dayReservations.length} réservation
                                {dayReservations.length > 1 ? "s" : ""})
                            </h3>

                            <div className="reservation-list">
                                {dayReservations.map((reservation) => (
                                    <ReservationCard key={reservation.id} reservation={reservation} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="timeline-footer">
                <span>Période courante : {dayjs(`${period.year}-${String(period.month).padStart(2, "0")}-01`).format("MM/YYYY")}</span>
            </div>
        </div>
    );
};

export default ReservationTimeline;