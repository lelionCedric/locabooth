import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import "./tarif.css"
import TarifLocation from "../../components/card-tarif/card-tarif.tsx";

export const Tarif = () =>
{
    useTitle('Tarif');

    return (
        <div className="tarif">
            <TarifLocation/>
        </div>
    )
}