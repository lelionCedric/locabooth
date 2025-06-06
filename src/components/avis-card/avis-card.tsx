// Avis.tsx
import {Calendar, Star, User} from 'lucide-react';
import './avis-card.css';
import {Avis} from "../../hooks/useAvis.ts";

interface AvisCardProps {
    avis: Avis;
}

export const AvisCard = ({ avis } : AvisCardProps ) => {
    // Fonction pour afficher les étoiles
    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`star ${index < rating ? 'star-filled' : 'star-empty'}`}
            />
        ));
    };

    // Fonction pour formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="avis-card">
            {/* En-tête avec utilisateur et note */}
            <div className="avis-card-header">
                <div className="avis-user-info">
                    <div className="avis-avatar">
                        <User className="avis-avatar-icon" />
                    </div>
                    <div className="avis-user-details">
                        <h3>
                            {avis.prenom || 'Utilisateur anonyme'}
                        </h3>
                        <div className="avis-user-rating">
                            <div className="avis-user-stars">
                                {renderStars(avis.note)}
                            </div>
                            <span className="avis-rating-number">
                {avis.note}/5
              </span>
                        </div>
                    </div>
                </div>

                {/* Date */}
                {avis.date && (
                    <div className="avis-date">
                        <Calendar className="avis-date-icon" />
                        {formatDate(avis.date)}
                    </div>
                )}
            </div>

            {/* Titre de l'avis si présent */}
            {avis.titre && (
                <h4 className="avis-card-title">
                    {avis.titre}
                </h4>
            )}

            {/* Contenu de l'avis */}
            <p className="avis-comment">
                {avis.commentaire}
            </p>

            {/* Indicateur de recommandation */}
            {avis.recommande !== undefined && (
                <div className="avis-recommendation">
                    <div className="avis-recommendation-content">
            <span className="avis-recommendation-text">
              {avis.recommande ? '👍 Recommande' : '👎 Ne recommande pas'}
            </span>
                    </div>
                </div>
            )}
        </div>
    );
};