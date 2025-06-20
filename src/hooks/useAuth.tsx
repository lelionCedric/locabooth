// auth/useAuth.ts
import {authentification, check} from "../services/api.ts";
import {useCallback} from "react";

export const useAuth = () => {

    const login = async (username: string, password: string) => {
        try {
            await authentification(username, password);
        } catch (err) {
            alert(`Échec de la connexion, ${err}`);
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        //navigate("/accueil");
    };

    const validateToken = useCallback(async (): Promise<boolean> => {
        try {
            await check();
            return true; // Token valide
        } catch {
            return false; // Token invalide
        }
    }, []);


    return { login, logout, validateToken };
};
