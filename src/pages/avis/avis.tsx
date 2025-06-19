import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import {Star} from 'lucide-react';
import "./avis.css"
import {AvisCard} from "../../components/avis/avis-card";
import useAvis from "../../hooks/useAvis.ts";

export const Avis = () =>
{
    useTitle('Avis');
    const titre = "Avis clients"

    let { avis } = useAvis();
    avis = avis?? [];

    // Calcul de la moyenne des notes
    const moyenneNotes = avis.length > 0
        ? (avis.reduce((sum, avis) => sum + avis.note, 0) / avis.length).toFixed(1)
        : 0;

    const totalAvis = avis.length;

    if (avis.length === 0) {
        return (
            <div className="avis-container">
                <div className="avis-empty-state">
                    <div className="avis-empty-icon">
                        <Star className="star" />
                    </div>
                    <h3 className="avis-empty-title">
                        Aucun avis pour le moment
                    </h3>
                    <p className="avis-empty-description">
                        Soyez le premier à laisser un avis !
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="avis-container">
            {/* En-tête avec statistiques */}
            <div className="avis-header">
                <div className="avis-header-content">
                    <div>
                        <h2 className="avis-title">
                            {titre}
                        </h2>
                        <div className="avis-stats">
                            <div className="avis-stars-container">
                                <div className="avis-stars">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`star ${
                                                index < Math.round(Number(moyenneNotes))
                                                    ? 'star-filled'
                                                    : 'star-empty'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="avis-rating-text">
                  {moyenneNotes}
                </span>
                                <span className="avis-count">
                  ({totalAvis} avis)
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Liste des avis */}
            <div className="avis-list">
                {avis.map((avisItem, index) => (
                    <AvisCard key={avisItem.id || index} avis={avisItem} />
                ))}
            </div>
        </div>
    );
}

