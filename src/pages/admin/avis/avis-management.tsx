import {useState} from "react";
import "./avis-management.css";
import AvisCardManagement from "./avis-card-management/avis-card-management.tsx";
import useAvisAdmin, {ModifierAvisCommande} from "../../../hooks/useAvisAdmin.tsx";

const AvisManagement = () => {
    const { useRecupererAvisAdmin, mutate } = useAvisAdmin();
    let { avis,  } = useRecupererAvisAdmin();
    avis = avis?? [];

    const [filter, setFilter] = useState<"tous" | "ATTENTE" | "VALIDE" | "REJETE">("tous");

    const handleValidateAvis = (id?: number) => {
        const modifierAvisCommande = {
            id,
            etat: "VALIDE",
        } as ModifierAvisCommande;
        mutate(
            modifierAvisCommande
        );
    };

    const handleRejectAvis = (id?: number) => {
        const modifierAvisCommande = {
            id,
            etat: "REJETE",
        } as ModifierAvisCommande;
        mutate(
            modifierAvisCommande
        );

    };
    const filteredAvis = filter === "tous"
        ? avis
        : avis.filter(avis => avis.etat === filter);

    const countByStatus = {
        total: avis.length,
        enAttente: avis.filter(a => a.etat === "ATTENTE").length,
        valide: avis.filter(a => a.etat === "VALIDE").length,
        rejete: avis.filter(a => a.etat === "REJETE").length
    };

    return (
        <div className="avis-management">
            <div className="avis-header">
                <h2>⭐ Gestion des avis clients</h2>
                <div className="avis-stats">
                    <span className="stat">Total: {countByStatus.total}</span>
                    <span className="stat pending">En attente: {countByStatus.enAttente}</span>
                    <span className="stat validated">Validés: {countByStatus.valide}</span>
                    <span className="stat rejected">Rejetés: {countByStatus.rejete}</span>
                </div>
            </div>

            <div className="avis-filters">
                <button
                    className={`filter-btn ${filter === "tous" ? "active" : ""}`}
                    onClick={() => setFilter("tous")}
                >
                    Tous
                </button>
                <button
                    className={`filter-btn ${filter === "ATTENTE" ? "active" : ""}`}
                    onClick={() => setFilter("ATTENTE")}
                >
                    En attente ({countByStatus.enAttente})
                </button>
                <button
                    className={`filter-btn ${filter === "VALIDE" ? "active" : ""}`}
                    onClick={() => setFilter("VALIDE")}
                >
                    Validés ({countByStatus.valide})
                </button>
                <button
                    className={`filter-btn ${filter === "REJETE" ? "active" : ""}`}
                    onClick={() => setFilter("REJETE")}
                >
                    Rejetés ({countByStatus.rejete})
                </button>
            </div>

            <div className="avis-list">
                {filteredAvis.length === 0 ? (
                    <div className="no-avis">
                        <p>Aucun avis {filter !== "tous" ? `${filter}` : ""} pour le moment.</p>
                    </div>
                ) : (
                    filteredAvis.map(avis => (

                        <AvisCardManagement
                            key={avis.id}
                            avis={avis}
                            onValidate={handleValidateAvis}
                            onReject={handleRejectAvis}
                        />


                    ))
                )}
            </div>
        </div>
    );
};

export default AvisManagement;