import {sendDemande} from "../services/api";
import {useMutation} from "react-query";
import {useNotification} from "../shared/components/notification/notification.tsx"; // Appel API

export interface FormDemande extends Demande{
    jour: number;
    mois: number;
    annee: number;
}

// Définition du type pour les objets retournés par l'API
export interface Demande{
    nom: string;
    prenom: string;
    description: string;
    mail: string;
    telephone: string;
    typeEvenement: string;
    lieu: string;
}

const useDemande = () => {
    const { addNotification } = useNotification();
    const {mutate, isLoading, isError, isSuccess} = useMutation({
        mutationFn: sendDemande,
        onSuccess: () => {
            //setFormData({ nom: '', prenom: '', description: '' });
            addNotification('success', 'Demande effectué avec succès!');
        },
        onError: () => {
            addNotification('error', "Un problème est survenu lors de la demande");
        }
    });


    return { mutate, isError, isSuccess, isLoading };
};

export default useDemande;