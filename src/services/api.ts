import axios from 'axios';
import {Reservation} from "../hooks/useReservations.ts";
import {FormDemande} from "../hooks/useDemande.ts";
import {Avis} from "../hooks/useAvis.ts";
import {TokenAvis} from "../hooks/useAvisAdmin.tsx";
import {Tarif} from "../hooks/useTarif.tsx";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000, // Timeout après 5 secondes
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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

export const fetchAllReservations = async (): Promise<Reservation[]> => {
    try {
        const response = await api.get("/api/protected/reservations");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de toutes les réservations :", error);
        throw error;
    }
};

// Fonction pour supprimer une réservation
export const deleteReservation = async (reservationId: number): Promise<void> => {
    try {
        await api.delete(`/api/protected/reservations/${reservationId}`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la réservation :", error);
        throw error;
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

export const fetchAvis = async (): Promise<Avis[]> => {
    try {
        const response = await api.get("/api/public/avis", {} ); // Appel API
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};

export const fetchToken = async (token: string): Promise<void> => {
    try {
        await api.get(`/api/public/avis/validate-token/${token}`, {});
    } catch (error) {
        console.error("Erreur lors de la validation du token :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};

export const sendAvis = async (avis: Avis) => {
    try {
        const response = await api.post("/api/public/avis", avis);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'avis', error);
        throw error;
    }
};

export const authentification = async (username: string, password: string) => {
    try {
        const response = await api.post("/api/public/auth/login", {username, password},);
        const token = response.data.jwt;
        localStorage.setItem("jwt", token);
    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        throw error;
    }
};

export const check = async (): Promise<void> => {
    try {
        await api.get("/api/protected/auth/check",{});
    } catch (error) {
        console.error("Erreur lors de la validation du token :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};

export const fetchAvisAdmin = async (etat?: string): Promise<Avis[]> => {
    try {
        const response = await api.get("/api/protected/avis",
            {
                params: etat
            }
        ); // Appel API
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};

export const modifieAvisAdmin = async (avis: number, etat?: string) => {
    try {
        await api.put(`/api/protected/avis/${avis}`, etat, );
    } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};

export const fetchNewToken = async (): Promise<TokenAvis> => {
    try {
        const response = await api.put("/api/protected/token",{}); // Appel API
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération d'un nouveau token :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};

export const fetchTarif = async (): Promise<Tarif> => {
    try {
        const response = await api.get("/api/public/tarif", {} ); // Appel API
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du tarif :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};

export const fetchPhotosGalerie = async (): Promise<string[]> => {
    try {
        const response = await api.get("/api/public/galerie/photo", {} ); // Appel API
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des photos :", error);
        throw error; // Relance l'erreur pour que le composant puisse la gérer
    }
};