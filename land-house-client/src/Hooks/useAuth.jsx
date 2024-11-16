import { useContext } from "react";
import { Authcontext } from "../AuthProvider/AuthProvider";


const useAuth = () => {
    const authInfo = useContext(Authcontext)
    return authInfo;
};

export default useAuth;