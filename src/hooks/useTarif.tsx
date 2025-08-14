import {useQuery} from "react-query";
import {fetchTarif} from "../services/api.ts"; // Appel API

export interface Tarif {
    valeur: number;
}

const useTarif = () => {
    const { data: tarif, isLoading, isError } = useQuery({
        queryKey: ["tarif"],
        queryFn: () => fetchTarif(),
        keepPreviousData: false,
    });

    return { tarif: tarif, isLoading, isError };
};

export default useTarif;