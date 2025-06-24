import "./avis-card-management.css";
import {Avis} from "../../../../hooks/useAvis.ts";
import {AvisCard} from "../../../../components/avis/avis-card";

interface Props {
    avis: Avis;
    onValidate: (id: number) => void;
    onReject: (id: number) => void;
}

const AvisCardManagement = ({ avis, onValidate, onReject }: Props) => {
    const getetatColor = (etat: string) => {
        switch (etat) {
            case "ATTENTE": return "pending";
            case "VALIDE": return "validated";
            case "REJETE": return "rejected";
            default: return "";
        }
    };

    return (
        <div className={`   etat-${getetatColor(avis.etat)}`}>

            <AvisCard key={avis.id} avis={avis} />

            <div className="avis-footer">
                <div className={`etat-badge etat-${getetatColor(avis.etat)}`}>
                    {avis.etat === "ATTENTE" && "⏳"}
                    {avis.etat === "VALIDE" && "✅"}
                    {avis.etat === "REJETE" && "❌"}
                    {avis.etat}
                </div>

                <div className="avis-actions">
                    {avis.etat === "ATTENTE" && (
                        <>
                            <button
                                className="btn-validate"
                                onClick={() => onValidate(avis.id)}
                                title="Valider cet avis"
                            >
                                ✅ Valider
                            </button>
                            <button
                                className="btn-reject"
                                onClick={() => onReject(avis.id)}
                                title="Rejeter cet avis"
                            >
                                ❌ Rejeter
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AvisCardManagement;