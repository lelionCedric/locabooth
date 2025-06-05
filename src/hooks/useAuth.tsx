// auth/useAuth.ts
import {authentification, check} from "../services/api.ts";

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

    const validateToken = async () => {
        try {
            await check();
            return true;
        } catch {
            return false;
        }
    };

    return { login, logout, validateToken };
};
