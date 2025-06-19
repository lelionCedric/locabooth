// src/components/avis-form/avis-form.tsx
import {useState} from 'react';
import './formulaireAvis.css';
import {useNavigate} from "react-router-dom";
import useCreerAvis from "../../../hooks/useCreerAvis.tsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface AvisFormData {
    prenom: string;
    note: number;
    commentaire: string;
}

const validationSchema = Yup.object().shape({
    prenom: Yup.string()
        .required("Ce champ est obligatoire"),
    note: Yup.number().max(5).min(1).required(
        "Ce champ est obligatoire"
    ),
    commentaire: Yup.string()
        .required("Ce champ est obligatoire"),
});

export const AvisForm = () => {
    const navigate = useNavigate();

    //const { token } = useParams<{ token: string }>();
    const {register, handleSubmit, setValue, getValues, watch} = useForm({
        mode: "onBlur",
        defaultValues: {
            prenom: "",
            note: 0,
            commentaire: "",
        },
        resolver: yupResolver(validationSchema),
    });


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    //const [tokenValid, setTokenValid] = useState<boolean | null>(null);

    const { mutate, isError } = useCreerAvis();

    const handleStarClick = (rating: number) => {
        watch("note");
        setValue('note', rating);
    };

    const onSubmit = (data: AvisFormData) => {
        setIsSubmitting(true);
        setError(null);
        mutate(
            {
               ...data
            }
        );
        setSuccess(isError);
        // Rediriger vers la page d'avis après 3 secondes
        setTimeout(() => {
            navigate('/avis');
        }, 3000);

    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            return (
                <button
                    key={starValue}
                    type="button"
                    className={`star-form ${starValue <= getValues('note') ? 'star-form--active' : ''}`}
                    onClick={() => handleStarClick(starValue)}
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
                            {renderStars()}
                            <span className="rating-text-form">
                {getValues('note')}/5
              </span>
                        </div>
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