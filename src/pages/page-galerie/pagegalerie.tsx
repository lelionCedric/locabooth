import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import "./pagegalerie.css"
import Galerie from "../../components/galerie/galerie.tsx";
import usePhotosGalerie from "../../hooks/usePhotosGalerie.ts";

export const PageGalerie = () =>
{
    useTitle('Galerie');

    const { photos } = usePhotosGalerie()

    return (
        <>
            <Galerie images={photos??[]}/>
        </>
    )
}