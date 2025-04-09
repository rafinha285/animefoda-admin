import React, {useContext, useEffect, useState} from "react";
import Header from "../components/header/Header";
import Footer from '../components/footer/Footer';
import {Anime} from "../types/Anime";
import IndexAdminAnime from "../components/index/IndexAdminAnime";
import {User} from "../types/User";
import {fetchUser} from "../functions/userFunctions";
import "../css/index-admin.css"
import {apiUrl, baseUrl} from "../const";
import globalContext from "../context/globalContext";
import {ResponseType} from "../types/Response";

const Home:React.FC = () =>{
    // const [user,setUser] = useState<User>();
    const context = useContext(globalContext);
    const [animes,setAnimes] = useState<Anime[]>([]);
    useEffect(()=>{
        const fetchData = async() =>{
            // await fetchUser(`/user/g/`,'GET')
            //     .then(response => response.json())
            //     .then((data:User)=>{
            //         setUser(data)
            //     })
            await fetchUser(`${apiUrl}/g/anime/all`,"GET")
                .then(response=>response.json())
                .then((d: ResponseType<Anime[]>)=>{
                    console.log(d.data)
                    setAnimes(d.data);
                })
        }
        if(!context?.isAdmin){
            window.location.href = baseUrl;
        }
        if(!context?.isLogged){
            window.location.href = "/"
        }
        fetchData()
    },[!context]);
    return(
        <html>
            <Header/>
            <div className='adm-container'>
                <div className={'base-adm'}>
                    <h1>Animes</h1>
                    <div>
                        {animes.map((anime,index)=>(
                            <IndexAdminAnime anime={anime} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </html>
    )
}
export default Home;
