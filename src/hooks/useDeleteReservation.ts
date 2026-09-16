import { useMutation, useQueryClient } from "react-query";
import { deleteReservation } from "../services/api.ts";
import { useNotification } from "../shared/components/notification/notification.tsx";

const useDeleteReservation = () => {
    const queryClient = useQueryClient();
    const { addNotification } = useNotification();

    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: deleteReservation,
        onSuccess: () => {
            queryClient.invalidateQueries(["reservations"]);
            addNotification("success", "Réservation supprimée avec succès !");
        },
        onError: () => {
            addNotification("error", "Un problème est survenu lors de la suppression de la réservation.");
        },
    });

    return { mutate, isLoading, isError, isSuccess };
};

export default useDeleteReservation;

