import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, validateToken } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const isValid = await validateToken();
                if (isValid) {
                    navigate("/admin", { replace: true });
                }
            } catch {
                // Token invalide, rester sur la page de login
                console.log("Token invalide, affichage du formulaire de login");
            }
        };

        checkAuth();
    }, [navigate, validateToken]); // Pas de dépendances si validateToken est mémorisée


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password).then(() => {
            navigate("/admin");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Connexion</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
        </form>
    );
};
