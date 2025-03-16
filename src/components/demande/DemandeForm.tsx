import { useState } from 'react';
import './DemandeForm.css';
import useDemande from "../../hooks/useDemande.ts"; // Import du fichier CSS dédié

interface DemandeFormProps {
    jour: number;
    mois: string;
    annee: number;
    isOpen: boolean;
    handleCloseModal: () => void;
    currentDate: Date;
}

// Le composant principal qui prend jour, mois et année comme props
const DemandeForm = ({ jour, mois, annee, isOpen, handleCloseModal, currentDate} : DemandeFormProps) => {

    // État pour les données du formulaire
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        description: '',
        telephone: '',
        mail: '',
        jour: undefined,
        mois: undefined,
        annee: undefined,
    });

    const { mutate, isLoading, isSuccess } = useDemande()

    // Gérer les changements dans les champs du formulaire
    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Gérer la soumission du formulaire
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Afficher les données du formulaire et les paramètres reçus
        mutate(
            {
                nom: formData.nom,
                prenom: formData.prenom,
                description: formData.description,
                mail: formData.mail,
                telephone: formData.telephone,
                jour,
                mois: currentDate.getMonth(),
                annee
            }
        );
        // Fermer la modal après soumission

        handleCloseModal();
    };

    return (
        <div>
            {/* Modal (visible uniquement si isOpen est true) */}
            {isOpen && (
                <div className="modal-overlay">
                    {/* Overlay sombre */}
                    <div
                        className="modal-backdrop"
                        onClick={handleCloseModal}
                    ></div>

                    {/* Container de la modal avec centrage */}
                    <div className="modal-container">
                        {/* La modal elle-même */}
                        <div className="modal">
                            {/* En-tête de la modal */}
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    Formulaire du réservation du {jour} {mois} {annee}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="close-button"
                                >
                                    <span>&times;</span>
                                </button>
                            </div>

                            {/* Corps de la modal */}
                            {!isSuccess && !isLoading?
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="nom">Nom</label>
                                            <input
                                                type="text"
                                                id="nom"
                                                name="nom"
                                                value={formData.nom}
                                                onChange={handleChange}
                                                className="form-input"
                                                required={true}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="prenom">Prénom</label>
                                            <input
                                                type="text"
                                                id="prenom"
                                                name="prenom"
                                                value={formData.prenom}
                                                onChange={handleChange}
                                                className="form-input"
                                                required={true}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="prenom">Numéro de téléphone</label>
                                            <input
                                                type="text"
                                                id="telephone"
                                                name="telephone"
                                                value={formData.telephone}
                                                onChange={handleChange}
                                                className="form-input"
                                                required={true}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="prenom">Adresse Mail</label>
                                            <input
                                                type="email"
                                                id="mail"
                                                name="mail"
                                                value={formData.mail}
                                                onChange={handleChange}
                                                className="form-input"
                                                required={true}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                className="form-textarea"
                                                required={true}
                                            />
                                        </div>

                                        <div className="form-actions">
                                            <button
                                                type="button"
                                                onClick={handleCloseModal}
                                                className="cancel-button"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                type="submit"
                                                className="submit-button"
                                            >
                                                Envoyer une demande
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                :
                                <div className="modal-body">
                                    Demande effectué !
                                </div>
                            }
                            {isLoading ? <div>Demande en cours d'envoi</div> : ''
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DemandeForm;