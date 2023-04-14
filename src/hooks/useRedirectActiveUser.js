import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useUserContext } from "../context/UserContext"

export const useRedirectActiveUser = () => {
    const navigate = useNavigate

    const {user} = useUserContext();

    useEffect(() => {
        if (user){
            navigate(path);
        }
    }, [user]);
}

