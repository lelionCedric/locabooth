// src/hooks/useAvis.ts

import {useMutation} from "react-query";
import {sendAvis} from "../services/api.ts";
import {useNotification} from "../shared/components/notification/notification.tsx";

const useCreerAvis = () => {
  const { addNotification } = useNotification();
  const {mutate, isLoading, isError, isSuccess} = useMutation({
    mutationFn: sendAvis,
    onSuccess: () => {
      //setFormData({ nom: '', prenom: '', description: '' });
      addNotification('success', 'Envoie de l\'avis effectué avec succès!');
    },
    onError: () => {
      addNotification('error', "Un problème est survenu lors de l'envoie de l'avis");
    }
  });


  return { mutate, isError, isSuccess, isLoading };
};

export default useCreerAvis;