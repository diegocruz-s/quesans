import { createContext, useEffect, useState } from "react";
import { api } from "../utils/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children })=>{
    
    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if(user){
            setUser(JSON.parse(user));
        }
        setSuccess(false);
        setError(false);
    }, []);

    useEffect(()=>{
        if(user){
            api.defaults.headers.authorization = `Bearer ${user.token}`;
        }
    }, [user])

    const login = async (user) => {
        const url = `users/login`;
        setError(false);
        setLoading(true);
        const res = await api.post(url, user)
            .then(resp => resp.data)
            .catch(datas => datas.response.data);

        if(res.error){
            setError(null);
            setError(res.error);
            setLoading(false);
            return
        }else{
            setError(false)
        }

        setSuccess(res.success);

        delete res.success;
        setUser(res);

        api.defaults.headers.authorization = `Bearer ${res.token}`;

        localStorage.setItem('user', JSON.stringify(res));

        setLoading(false);
    }

    const register = async (user) => {
        const url = `/users`;
        setError(false);
        setLoading(true);
        const res = await api.post(url, user)
            .then(resp => resp.data)
            .catch(err => err.response.data);

        if(res.error){
            setError(null);
            setError(res.error);
            setLoading(false);
            return;
        }else{
            setError(false);
        }

        setSuccess(res.success);
        delete res.success;

        setUser(res);

        api.defaults.headers.authorization = `Bearer ${res.token}`;

        localStorage.setItem('user', JSON.stringify(res));

        setLoading(false);

    }

    const logout = () => {
        api.defaults.headers.authorization = '';
        localStorage.removeItem('user');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ 
            userCheck: user, 
            loadingContext: loading, 
            error,
            success,  
            login, 
            register, 
            logout 
        }}>
            { children }
        </AuthContext.Provider>
    )
} 