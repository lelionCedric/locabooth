// src/hooks/useAvis.ts

import {useMutation} from "react-query";
import {fetchToken, sendAvis} from "../services/api.ts";
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

  const validateToken = async (token: string) => {
    try {
      await fetchToken(token);
      return true;
    } catch {
      return false;
    }
  };


  return { mutate, isError, isSuccess, isLoading, validateToken };
};

export default useCreerAvis;