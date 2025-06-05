import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, validateToken } = useAuth();

    useEffect(() => {
        const check = async () => {
            const valid = await validateToken();
            if (valid) navigate("/admin", { replace: true });
        };
        check();
    }, [navigate, validateToken]);


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
