import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import "./disponibilite.css"
import Calendar from "../../components/calendar/calendar.tsx";

export const Disponibilite = () =>
{
    useTitle('Disponibilités');

    return (
        <>
            <div className="disponibilite">
                <Calendar/>
            </div>
        </>
    )
}