import './DemandeForm.css';
import useDemande, {Demande} from "../../hooks/useDemande.ts"; // Import du fichier CSS dédié
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from "yup";
import {useForm} from "react-hook-form"

const validationSchema = Yup.object().shape({
    nom: Yup.string()
        .required("Ce champ est obligatoire"),
    prenom: Yup.string()
        .required("Ce champ est obligatoire"),
    mail: Yup.string()
        .email("email invalide")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            'Le format du mail est invalide'
        )
        .required("L'email est obligatoire"),
    telephone: Yup.string()
        .required("Ce champ est obligatoire")
        .matches(
            /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            'Le format du numéro de téléphone est invalide, ex: 01-34-56-78-90'
        ),
    description: Yup.string()
        .required("Ce champ est obligatoire"),
    lieu: Yup.string()
        .required("Veuillez indiquer le lieu de l'évènement"),
    typeEvenement: Yup.string()
        .required("Veuillez indiquer le type d'évènement, anniversaire, pacs, crémaillère etc.."),
    jour : Yup.number(),
    mois : Yup.number(),
    annee : Yup.number(),
});

interface DemandeFormProps {
    jour: number;
    mois: string;
    annee: number;
    isOpen: boolean;
    handleCloseModal: () => void;
    currentDate: Date;
}

// Le composant principal qui prend jour, mois et année comme props
const DemandeForm = ({jour, mois, annee, isOpen, handleCloseModal, currentDate}: DemandeFormProps) => {

    const {register, handleSubmit, formState, reset} = useForm({
        mode: "onBlur",
        defaultValues: {
            nom: "",
            prenom: "",
            mail: "",
            telephone: "",
            description: "",
            lieu: "",
            typeEvenement: "",
        },
        resolver: yupResolver(validationSchema),
    });

    const {errors} = formState;

    const {mutate, isLoading, isSuccess} = useDemande()

    // Gérer la soumission du formulaire
    const onSubmit = (data: Demande) => {
        // Afficher les données du formulaire et les paramètres reçus
        mutate(
            {
                ...data,
                jour: jour,
                mois: currentDate.getMonth() + 1,
                annee: annee
            }
        );
        // Fermer la modal après soumission
        handleCloseModal();
        reset();
    };

    return (
        <div>
            {/* Modal (visible uniquement si isOpen est true) */}
            {isOpen && (
                <div className="modal-overlay">
                    {/* Container de la modal avec centrage */}
                    <div className="modal-container">
                        {/* Overlay sombre */}
                        <div
                            className="modal-backdrop"
                            onClick={handleCloseModal}
                        ></div>
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
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <label htmlFor="nom">Nom</label>
                                            <input
                                                type="text"
                                                id="nom"
                                                className="form-input"
                                                required={true}
                                                {...register("nom")}
                                            />
                                            <small className="text-danger">
                                                {errors.nom?.message}
                                            </small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="prenom">Prénom</label>
                                            <input
                                                type="text"
                                                id="prenom"
                                                className="form-input"
                                                required={true}
                                                {...register("prenom")}
                                            />
                                            <small className="text-danger">
                                                {errors.prenom?.message}
                                            </small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="telephone">Numéro de téléphone</label>
                                            <input
                                                type="text"
                                                id="telephone"
                                                className="form-input"
                                                required={true}
                                                {...register("telephone")}
                                            />
                                            <small className="text-danger">
                                                {errors.telephone?.message}
                                            </small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="mail">Adresse Mail</label>
                                            <input
                                                type="email"
                                                id="mail"
                                                className="form-input"
                                                required={true}
                                                {...register("mail")}
                                            />
                                            <small className="text-danger">
                                                {errors.mail?.message}
                                            </small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="mail">Lieu de votre évènement</label>
                                            <input
                                                type="lieu"
                                                id="lieu"
                                                className="form-input"
                                                required={true}
                                                {...register("lieu")}
                                            />
                                            <small className="text-danger">
                                                {errors.lieu?.message}
                                            </small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="mail">Type d'évènement</label>
                                            <input
                                                type="typeEvenement"
                                                id="typeEvenement"
                                                className="form-input"
                                                required={true}
                                                {...register("typeEvenement")}
                                            />
                                            <small className="text-danger">
                                                {errors.typeEvenement?.message}
                                            </small>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea
                                                id="description"
                                                className="form-textarea"
                                                required={true}
                                                {...register("description")}
                                            />

                                            <small className="text-danger">
                                                {errors.description?.message}
                                            </small>
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