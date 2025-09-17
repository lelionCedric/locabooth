import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import Calendar from "../../components/calendar/calendar.tsx";
import PhotoCarousel from "../../components/photocarousel/photocarousel.tsx";
import Info from "../../components/info/info.tsx";
import "./accueil.css"
import usePhotosGalerie from "../../hooks/usePhotosGalerie.ts";

export const Accueil = () =>
{
    useTitle('Accueil');

    const { photos } = usePhotosGalerie();

    const images: string[] = [];
    if (photos) {
        const photosCopy = [...photos]; // copie du tableau pour ne pas modifier l'original
        console.log(photosCopy.length)
        for (let i = 0; i < 3 && photosCopy.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * photosCopy.length);
            images.push(photosCopy[randomIndex]);
            photosCopy.splice(randomIndex, 1); // retire l'élément choisi
        }
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