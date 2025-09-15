import {useQuery} from "react-query";
import {fetchPhotosGalerie} from "../services/api.ts"; // Appel API

const usePhotosGalerie = () => {
    const { data: photos, isLoading, isError } = useQuery({
        queryKey: ["photos"],
        queryFn: () => fetchPhotosGalerie(),
        keepPreviousData: false,
    });

    return { photos, isLoading, isError };
};

export default usePhotosGalerie;