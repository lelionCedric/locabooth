import {useTitle} from "../../shared/hooks/useTitle/useTitle";
import "./pagegallerie.css"
import Gallerie from "../../components/gallerie/gallerie.tsx";

export const PageGallerie = () =>
{
    useTitle('Gallerie');

    const images = [
        '/exemple/exemple_1.jpg',
        '/exemple/exemple_2.jpg',
        '/exemple/exemple_3.jpg',
        '/exemple/exemple_4.jpg',
        '/exemple/exemple_5.jpg',
        '/exemple/exemple_6.jpg',
        '/exemple/exemple_7.jpg',
        '/exemple/exemple_8.jpg',
        '/exemple/exemple_9.jpg',
        '/exemple/exemple_10.jpg',
        '/exemple/exemple_11.jpg',
        '/exemple/exemple_12.jpg',
        '/exemple/exemple_13.jpg',
        '/exemple/exemple_14.jpg',
        '/exemple/exemple_15.jpg',
        '/exemple/exemple_16.jpg',
        '/exemple/exemple_17.jpg',
        '/exemple/exemple_18.jpg',
        '/exemple/exemple_19.jpg',
        '/exemple/exemple_20.jpg',
        '/exemple/exemple_21.jpg',
    ];

    return (
        <>
            <Gallerie images={images}/>
        </>
    )
}