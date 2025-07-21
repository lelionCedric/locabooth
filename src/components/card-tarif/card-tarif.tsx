import {Link} from "react-router-dom";
import "./card-tarif.css"

const CardTarif = () => {
    return (
        <div className="tarification-card">
            {/* En-tête avec le prix */}
            <div className="tarification-header">
                <h2>70€ / Weekend</h2>
            </div>

            {/* Corps de la carte avec les détails de la location */}
            <div className="tarification-details">
                <ul>
                    <li><span className="icon check">✔</span> Photo illimitée</li>
                    <li><span className="icon check">✔</span> Qualité numérique</li>
                    <li><span className="icon check">✔</span> Description personnalisée</li>
                    <li><span className="icon check">✔</span> Galerie photo en ligne Google</li>
                    <li><span className="icon check">✔</span> Livraison et installation sur le lieu de l'événement *sous
                        condition
                    </li>
                    <li><span className="icon check">✔</span> Disponibilité des photos sous 24h</li>
                    <br/>
                    <li><span className="icon cross">✘</span> Pas d'impression</li>
                </ul>
            </div>

            {/* Badge redirigeant vers la page des disponibilités */}
            <div className="tarification-footer">
                <Link to="/disponibilites">
                    <button className="btn">Voir les Disponibilités</button>
                </Link>
            </div>
        </div>
    );
};

export default CardTarif;