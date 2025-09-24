// src/pages/admin/reservations/reservations-management.tsx
import {useState} from "react";
import "./ReservationManagment.css";
import useReservationManagment from "../../../hooks/useReservationManagment.ts";

const ReservationManagement = () => {
    const { reservations, isLoading, isDeletingReservation, deleteReservationMutation, refetch } = useReservationManagment();
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    const handleDeleteConfirm = (reservationId: number) => {
        deleteReservationMutation(reservationId, {
            onSuccess: () => {
                setShowDeleteModal(null);
                refetch(); // Actualiser la liste après suppression
            }
        });
    };

    const handleDeleteClick = (reservationId: number) => {
        setShowDeleteModal(reservationId);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(null);
    };

    if (isLoading) {
        return (
            <div className="reservations-loading">
                <div className="loading-spinner"></div>
                <p>Chargement des réservations...</p>
            </div>
        );
    }

    return (
        <div className="reservations-management">
            <div className="reservations-header">
                <h2>📅 Gestion des réservations</h2>
                <div className="reservations-stats">
                    <span className="stat">Total: {reservations.length}</span>
                    <span className="stat recent">
                        Récentes: {reservations.filter(r => r.latest).length}
                    </span>
                </div>
            </div>

            <div className="reservations-list">
                {reservations.length === 0 ? (
                    <div className="no-reservations">
                        <p>Aucune réservation trouvée.</p>
                    </div>
                ) : (
                    reservations.map(reservation => (
                        <div key={reservation.id} className={`reservation-card ${reservation.latest ? 'recent' : ''}`}>
                            <div className="reservation-content">
                                <div className="reservation-date">
                                    <span className="date-label">📅</span>
                                    <span className="date-value">
                                        {new Date(reservation.date).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    {reservation.latest && <span className="recent-badge">Récent</span>}
                                </div>
                                <div className="reservation-description">
                                    <span className="desc-label">📝</span>
                                    <span className="desc-value">{reservation.description}</span>
                                </div>
                            </div>
                            <div className="reservation-actions">
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDeleteClick(reservation.id)}
                                    disabled={isDeletingReservation}
                                    title="Supprimer définitivement cette réservation"
                                >
                                    🗑️ Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>⚠️ Confirmer la suppression</h3>
                        </div>
                        <div className="modal-body">
                            <p>Êtes-vous sûr de vouloir supprimer définitivement cette réservation ?</p>
                            <p className="warning-text">Cette action ne peut pas être annulée.</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn-cancel"
                                onClick={handleDeleteCancel}
                                disabled={isDeletingReservation}
                            >
                                Annuler
                            </button>
                            <button
                                className="btn-confirm-delete"
                                onClick={() => handleDeleteConfirm(showDeleteModal)}
                                disabled={isDeletingReservation}
                            >
                                {isDeletingReservation ? 'Suppression...' : 'Supprimer définitivement'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationManagement;