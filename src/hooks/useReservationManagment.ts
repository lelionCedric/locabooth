// src/hooks/useReservationsAdmin.ts
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNotification } from "../shared/components/notification/notification.tsx";
import { AxiosResponse } from "axios";
import { ErreurApiReduite } from "../shared/commun/ErreurApiReduite.tsx";
import {deleteReservation, fetchAllReservations} from "../services/api.ts";

export interface ReservationAdmin {
    id: number;
    date: string;
    description: string;
    latest: boolean;
}

const useReservationManagment = () => {
    const { addNotification } = useNotification();
    const queryClient = useQueryClient();

    // Query pour récupérer toutes les réservations
    const {
        data: reservations,
        isLoading,
        isError,
        refetch
    } = useQuery<ReservationAdmin[]>({
        queryKey: ["reservations-admin"],
        queryFn: () => fetchAllReservations(),
        keepPreviousData: false,
        onError: () => {
            addNotification('error', "Erreur lors du chargement des réservations");
        }
    });

    // Mutation pour supprimer une réservation
    const {
        mutate: deleteReservationMutation,
        isLoading: isDeletingReservation
    } = useMutation<
        AxiosResponse | void,
        ErreurApiReduite,
        number
    >({
        mutationFn: (reservationId: number) => deleteReservation(reservationId),
        onSuccess: () => {
            addNotification('success', 'Réservation supprimée avec succès!');
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries(["reservations-admin"]);
        },
        onError: (error) => {
            console.error('Erreur lors de la suppression:', error);
            addNotification('error', "Un problème est survenu lors de la suppression de la réservation");
        }
    });

    return {
        reservations: reservations || [],
        isLoading,
        isError,
        deleteReservationMutation,
        isDeletingReservation,
        refetch
    };
};

export default useReservationManagment;