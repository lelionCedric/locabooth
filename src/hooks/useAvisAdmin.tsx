// src/hooks/useAvis.ts

import {useMutation, useQuery} from "react-query";
import {fetchAvisAdmin, modifieAvisAdmin} from "../services/api.ts";
import {useNotification} from "../shared/components/notification/notification.tsx";
import {AxiosResponse} from "axios";
import {ErreurApiReduite} from "../shared/commun/ErreurApiReduite.tsx";

export type ModifierAvisCommande = {
    id: number;
    etat: string;
}

export interface TokenAvis {
    token: string;
    expiredAt: Date;
}

const useAvisAdmin = () => {
    const { addNotification } = useNotification();
    const {mutate, isLoading, isError, isSuccess} = useMutation<
        AxiosResponse | void,
        ErreurApiReduite,
        ModifierAvisCommande>
        ({
        mutationFn: (modifieEtatCommande: ModifierAvisCommande) => modifieAvisAdmin(modifieEtatCommande.id, modifieEtatCommande.etat),
        onSuccess: () => {
            addNotification('success', 'Modification de l\'état de l\'avis effectué avec succès!');
        },
        onError: () => {
            addNotification('error', "Un problème est survenu lors de la modification de l'état de l'avis");
        }
    });


    const RecupererAvisAdmin = (etat?: string) => {
        const { data: avis, isLoading, isError } = useQuery({
            queryKey: ["avis"],
            queryFn: () => fetchAvisAdmin(etat),
            keepPreviousData: false,
        });

        return { avis, isLoading, isError };
    };

    return { mutate, isError, isSuccess, isLoading, RecupererAvisAdmin };
};

export default useAvisAdmin;