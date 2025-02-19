import React, {createContext, ReactNode, useEffect, useState} from "react";
import {fetchUser, getPrivileges} from "../functions/userFunctions";
import {roles} from "../types/types";
import {baseUrl} from "../const";
import {User} from "../types/User";
import {useCookies} from "react-cookie";

// import jwt from 'jsonwebtoken';

export interface GlobalContextType {
    isLogged: boolean;
    isAdmin: boolean;
    isSuper: boolean;
    user:User|undefined;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider:React.FC<{children:ReactNode}> = ({children}) =>{
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [isSuper, setIsSuper] = useState<boolean>(false)
    const [user,setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const [token,setToken,deleteToken] = useCookies(["token"]);
    // const token = getCookie('token');
    useEffect(() => {
        const fetchTest = async() =>{
            try {
                const userResponse = await fetchUser(`/user/g/verify`, "GET");
                console.log(userResponse)
                const userData = await userResponse.json();
                setIsLogged(userData.success);

                let privilegesData = await getPrivileges()
                setIsAdmin(privilegesData.role.includes(roles.adm));
                setIsSuper(privilegesData.super);
                await fetchUser(`/user/g/`,'GET')
                    .then(response => response.json())
                    .then((data:User)=>{
                        setUser(data)
                    })
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);  // Concluído, desativa o estado de carregamento
            }
        }
        fetchTest()
        // console.log(sessionStorage.getItem("token"))
        // setIsLogged(!!(sessionStorage.getItem("token"))); // Verifica se o token existe e define o estado de isLogged
    }, [!(document.readyState === "complete")]);
    if (loading) {
        return <div>Loading...</div>;  // Você pode trocar por um componente de loading customizado
    }

    return(
        <GlobalContext.Provider value={{isLogged,isAdmin,isSuper,user}}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContext;
