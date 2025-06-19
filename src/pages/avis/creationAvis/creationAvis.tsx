// src/pages/ajouter-avis/ajouter-avis.tsx
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './creationAvis.css';
import {useTitle} from "../../../shared/hooks/useTitle/useTitle.tsx";
import {AvisForm} from "../../../components/avis/formulaire-avis";

export const CreationAvis = () => {
    useTitle('Laisser un avis');

    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [tokenValid, setTokenValid] = useState<boolean | null>(null);

    // Vérifier la validité du token au chargement
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setTokenValid(false);
                return;
            }

            try {
                const response = await fetch(`/api/avis/validate-token/${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setTokenValid(true);
                } else {
                    setTokenValid(false);
                }
            } catch {
                setTokenValid(false);
            }
        };

        validateToken();
    }, [token]);

    // Token invalide ou manquant
    if (tokenValid === false) {
        return (
            <div className="ajouter-avis">
                <div className="ajouter-avis__error-page">
                    <div className="error-icon">🔒</div>
                    <h2>Accès non autorisé</h2>
                    <p>
                        Le lien que vous avez utilisé n'est pas valide ou a expiré.
                        <br />
                        Veuillez contacter l'établissement pour obtenir un nouveau lien.
                    </p>
                    <button
                        onClick={() => navigate('/avis')}
                        className="btn-secondary"
                    >
                        Voir les avis existants
                    </button>
                </div>
            </div>
        );
    }

    // Chargement de la validation du token
    if (tokenValid === null) {
        return (
            <div className="ajouter-avis">
                <div className="ajouter-avis__loading">
                    <div className="loading-spinner"></div>
                    <p>Vérification de l'accès...</p>
                </div>
            </div>
        );
    }

    return (
        <AvisForm />
    );
};