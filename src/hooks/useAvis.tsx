import {fetchAvis} from "../services/api";
import {useQuery} from "react-query"; // Appel API

export interface Avis {
    id?: number;
    prenom?: string;
    note: number;
    titre?: string;
    commentaire: string;
    date?: string;
    recommande?: boolean;
    etat?: "ATTENTE" | "VALIDE" | "REJETE";
    token?: string;
}

const useAvis = () => {
    const { data: avis, isLoading, isError } = useQuery({
        queryKey: ["avis"],
        queryFn: () => fetchAvis(),
        keepPreviousData: false,
    });

    return { avis, isLoading, isError };
};

export default useAvis;