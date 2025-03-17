import axios from 'axios';
import {Reservation} from "../hooks/useReservations.ts";
import {FormDemande} from "../hooks/useDemande.ts";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Remplace par ton URL backend
    timeout: 5000, // Timeout après 5 secondes
    headers: {
        "Content-Type": "application/json",
    },
});

// Fonction pour récupérer la liste des dates
export const fetchDates = async (month: number, year: number): Promise<Reservation[]> => {
    try {
        const response = await api.get("/api/public/reservation",
            {
                params: { month, year }, // Ajoute les valeurs dans l'URL
            }
        ); // Appel API
        return response.data; // Assure-toi que l'API renvoie bien un tableau de dates
    } catch (error) {
        console.error("Erreur lors de la récupération des dates :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};



export const sendDemande = async (demande: FormDemande) => {
    try {
        const response = await api.post("/api/public/demande", demande);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'envoi des données de la demande :", error);
        throw error;
    }
};
