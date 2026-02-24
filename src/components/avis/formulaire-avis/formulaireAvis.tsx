// src/components/avis-form/avis-form.tsx
import {useState} from 'react';
import './formulaireAvis.css';
import {useNavigate, useParams} from "react-router-dom";
import useCreerAvis from "../../../hooks/useCreerAvis.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface AvisFormData {
    prenom: string,
    note: number,
    commentaire: string,
    reco: number,
}

const validationSchema = Yup.object().shape({
    prenom: Yup.string()
        .required("Ce champ est obligatoire"),
    note: Yup.number()
        .nullable()
        .required("Veuillez sélectionner une note")
        .min(1, "Veuillez sélectionner au moins 1 étoile")
        .max(5, "La note maximum est de 5 étoiles"),
    commentaire: Yup.string()
        .required("Ce champ est obligatoire"),
    reco: Yup.number()
        .nullable()
        .required("Veuillez sélectionner une recommandation")
        .min(1, "Veuillez sélectionner au moins 1 étoile")
        .max(5, "La note maximum est de 5 étoiles"),
});

export const AvisForm = () => {
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();
    //const { token } = useParams<{ token: string }>();
    const {register, handleSubmit, setValue, getValues, watch , formState: { errors }} = useForm({
        mode: "onBlur",
        defaultValues: {
            prenom: "",
            note: undefined,
            commentaire: "",
            reco: undefined,
        },
        resolver: yupResolver(validationSchema),
    });


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    //const [tokenValid, setTokenValid] = useState<boolean | null>(null);

    const { mutate, isError } = useCreerAvis();

    const handleStarClick = (rating: number, field: string) => {
        watch(field as keyof AvisFormData);
        setValue(field as keyof AvisFormData, rating);
    };

    const onSubmit = (data: AvisFormData) => {
        setIsSubmitting(true);
        setError(null);
        mutate(
            {
               ...data,
                token,
            }
        );
        setSuccess(isError);
        // Rediriger vers la page d'avis après 3 secondes
        setTimeout(() => {
            navigate('/avis');
        }, 3000);

    };

    const renderStars = (field: string) => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            const value = getValues(field as keyof AvisFormData) as number;
            return (
                <button
                    key={starValue}
                    type="button"
                    className={`star-form ${starValue <= (value) ? 'star-form--active' : ''}`}
                    onClick={() => handleStarClick(starValue, field)}
                    aria-label={`Noter ${starValue} étoile${starValue > 1 ? 's' : ''}`}
                >
                    ★
                </button>

            );
        });
    };

    // Avis envoyé avec succès
    if (success) {
        return (
            <div className="ajouter-avis-form">
                <div className="ajouter-avis-form__success-page">
                    <div className="success-icon-form">✓</div>
                    <h2>Merci pour votre avis !</h2>
                    <p>
                        Votre avis a été envoyé avec succès.
                        <br />
                        Vous allez être redirigé vers la page des avis dans quelques secondes.
                    </p>
                    <button
                        onClick={() => navigate('/avis')}
                        className="btn-primary-form"
                    >
                        Voir tous les avis
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="ajouter-avis-form">
            <div className="ajouter-avis-form__container">
                <div className="ajouter-avis-form__header">
                    <h1>Partagez votre expérience</h1>
                    <p>Votre avis nous aide !</p>
                </div>

                {error && (
                    <div className="ajouter-avis-form__error">
                        ✗ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="ajouter-avis-form__form">
                    <div className="form-field-form">
                        <label htmlFor="nom" className="form-label-form">
                            Prénom *
                        </label>
                        <input
                            type="text"
                            id="prenom"
                            {...register("prenom")}
                            required
                            className="form-input-form"
                            placeholder="Votre prénom"
                        />
                    </div>

                    <div className="form-field-form">
                        <label className="form-label-form">
                            Votre note *
                        </label>
                        <div className="star-rating-form">
                            {renderStars('note')}
                            <span className="rating-text-form">
                            {getValues('note') | 0}/5
                          </span>
                        </div>
                        {errors.note && (
                            <div className="recommendation-error">
                                {errors.note.message}
                            </div>
                        )}
                    </div>

                    <div className="form-field-form">
                        <label htmlFor="commentaire" className="form-label-form">
                            Votre commentaire *
                        </label>
                        <textarea
                            id="commentaire"
                            {...register("commentaire")}
                            required
                            className="form-textarea-form"
                            placeholder="Décrivez votre expérience..."
                            rows={5}
                        />
                    </div>

                    <div className="form-field-form">
                        <label className="form-label-form">
                            Nous recommanderiez-vous ? *
                        </label>
                        <div className="star-rating-form">
                            {renderStars('reco')}
                            <span className="rating-text-form">

                           <span>{getValues('reco') | 0}/5 </span>

                              {getValues('reco') === 5 ? 'Absolument' :
                                  getValues('reco') === 4 ? 'Plutôt' :
                                      getValues('reco') === 3 ? 'Mitigé' :
                                          getValues('reco') === 2 ? 'Pas nécessairement' :
                                              (getValues('reco') === 1 || getValues('reco') === 0) ? 'Absolument pas' :
                                                  ''}
                            </span>
                        </div>
                        {errors.reco && (
                            <div className="recommendation-error">
                                {errors.reco.message}
                            </div>
                        )}
                    </div>

                    <div className="form-actions-form">
                        <button
                            type="button"
                            onClick={() => navigate('/avis')}
                            className="btn-secondary-form"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary-form"
                        >
                            {isSubmitting ? 'Envoi en cours...' : 'Publier l\'avis'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};