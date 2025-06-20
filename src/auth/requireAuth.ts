// auth/requireAuth.ts
import {redirect} from "react-router-dom";
import {check} from "../services/api.ts";

export const requireAuth = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) throw redirect("/login");

    try {
        await check(); // ← valider le token via backend
        return null; // token valide, autorisé
    } catch {
        localStorage.removeItem("jwt"); // token corrompu ou expiré
        throw redirect("/login");
    }
};