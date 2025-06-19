// src/pages/ajouter-avis/ajouter-avis.tsx
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './creationAvis.css';
import {useTitle} from "../../../shared/hooks/useTitle/useTitle.tsx";
import {AvisForm} from "../../../components/avis/formulaire-avis";
import useCreerAvis from "../../../hooks/useCreerAvis.tsx";

export const CreationAvis = () => {
    useTitle('Laisser un avis');

    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [tokenValid, setTokenValid] = useState<boolean | null>(null);
    const { validateToken } = useCreerAvis();

    useEffect(() => {
        const check = async () => {

            if (!token) {
                setTokenValid(false);
                return;
            }
            try {
                const valid = await validateToken(token);
                if(valid)
                    setTokenValid(true);
                else{
                    setTokenValid(false);
                }
            } catch {
                setTokenValid(false);
            }
        };
        check();
    }, [navigate, token, validateToken]);

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