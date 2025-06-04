import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import "./admin.css"
import ReservationTimeline from "../../components/reservation-timeline/ReservationTimeline.tsx";

export const Admin = () =>
{
    useTitle('Admin');

    return (
        <div>
            <ReservationTimeline/>
        </div>
    )
}