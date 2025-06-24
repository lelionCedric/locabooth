import {useMutation} from "react-query";
import {fetchNewToken} from "../services/api.ts";

const useTokenAvis = () => {
    const useRecupererTokenAvis = () => {
        return useMutation({
            mutationFn: fetchNewToken
        });
    };
    return {useRecupererTokenAvis}
}

export default useTokenAvis;