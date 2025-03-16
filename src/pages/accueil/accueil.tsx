import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import Calendar from "../../components/calendar/calendar.tsx";
import PhotoCarousel from "../../components/photocarousel/photocarousel.tsx";
import Info from "../../components/info/info.tsx";
import "./accueil.css"

export const Accueil = () =>
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTitle('Accueil');

    const images: string[] = [];
    for (let i = 0; i < 3; i++) {
        const randomNum = Math.floor(Math.random() * 21)+1; // Génère un nombre entre 0 et 21 inclus
        images.push(`/exemple/exemple_${randomNum}.jpg`);
    }

    return (
        <>
            <div className="infos">
                <Info/>
                <Calendar/>
            </div>
        <PhotoCarousel images={images}/>
        </>
    )
}