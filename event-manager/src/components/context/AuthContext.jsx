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
    
    const signIn = async ({ login, password }) => {
        if (!login || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        try {
            const response = await api.post("/account/sign-in", { login, password });
    
            const { token, id } = response.data; // Certifique-se de que esses campos existem no retorno
            setId(id);
            setToken(token);
    
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("@Auth:token", token);
            localStorage.setItem("@Auth:id", JSON.stringify(id));
        } catch (error) {
            if (error.response) {
                console.error("Erro no backend:", error.response.data.message || error.response.data);
                alert(error.response.data.message || "Erro ao tentar fazer login.");
            } else {
                console.error("Erro na requisição:", error.message);
                alert("Erro ao tentar fazer login.");
            }
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