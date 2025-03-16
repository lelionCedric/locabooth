import {useEffect} from "react";

export const useTitle = (titre: string) => {
    useEffect(() => {
        document.title = `${titre}`
    }, [titre]);
}