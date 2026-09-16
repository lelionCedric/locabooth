import { Reservation } from "../../../hooks/useReservations.ts";
import dayjs from "dayjs";
import "./ReservationCard.css";
import useDeleteReservation from "../../../hooks/useDeleteReservation.ts";

interface Props {
    reservation: Reservation;
}

const ReservationCard = ({ reservation }: Props) => {
    const { mutate, isLoading } = useDeleteReservation();
    const formattedDate = dayjs(reservation.date).format("DD/MM/YYYY");

    const handleDelete = () => {
        const shouldDelete = window.confirm(
            `Voulez-vous vraiment supprimer la réservation du ${formattedDate} ?`
        );

        if (shouldDelete) {
            mutate(reservation.id);
        }
    };

    return (
        <div className="reservation-card">
            <div className="reservation-info">
                <p className="reservation-date">{formattedDate}</p>
                <p className="reservation-description">{reservation.description}</p>
            </div>

            <div className="reservation-actions">
                {reservation.latest && <div className="reservation-badge">Dernière réservation</div>}

                <button
                    type="button"
                    className="reservation-delete-button"
                    onClick={handleDelete}
                    disabled={isLoading}
                    aria-label={`Supprimer la réservation du ${formattedDate}`}
                >
                    {isLoading ? "Suppression..." : "Supprimer"}
                </button>
            </div>
        </div>
    );
};

export default ReservationCard;
