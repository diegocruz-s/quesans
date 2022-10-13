import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
    const { userCheck } = useContext(AuthContext);
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        if(userCheck){
            setAuth(true)
        }else{
            setAuth(false)
        }
        setLoading(false);
    }, [userCheck]);

    return { auth, loadingUser: loading };
    
}