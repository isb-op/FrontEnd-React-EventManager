import { createContext, useEffect, useState } from "react";
import  api  from "../../services/api.js";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageId = localStorage.getItem("@Auth:id");
            const storageToken = localStorage.getItem("@Auth:token");
            if(storageId && storageToken) {
                setId(JSON.parse(storageId));
                api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
            }
        };
        loadingStoreData();
    }, []);
    
    const signIn = async ({login, password}) => {
        try{
            const response = await api.post("/account/sing-in", {
                login,
                password,
            });

            if(response.data.error){
                alert(response.data.error);
                return;
            } 
            const { token, id } = response.data;            
            setId(id);
            setToken(token);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:id", JSON.stringify(id));
        } catch (error) {
            console.error("Erro ao fazer login.", error);
            alert("Erro ao tentar fazer login.")
        }
    };

    const signOut = () => {
        setId(null);
        setToken(null);
        localStorage.removeItem("@Auth:token");
        localStorage.removeItem("@Auth:id");
    };

    return(
        <AuthContext.Provider value={{
            id,
            signIn,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
}