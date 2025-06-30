import {fetchDates} from "../services/api";
import {useQuery} from "react-query"; // Appel API

// Définition du type pour les objets retournés par l'API
export interface Reservation {
    id: number;
    date: string;
    description: string;
    latest: boolean;
}

const useReservations = (month: number, year: number) => {
    const { data: reservations, isLoading, isError } = useQuery({
        queryKey: ["reservations", month, year],
        queryFn: () => fetchDates(month, year),
        keepPreviousData: false,
    });

    return { reservations, isLoading, isError };
};

export default useReservations;