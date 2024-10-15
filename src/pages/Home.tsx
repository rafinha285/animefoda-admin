import React, {useEffect, useState} from "react";
import Header from "../components/header/Header";
import Footer from '../components/footer/Footer';
import {Anime} from "../types/Anime";
import IndexAdminAnime from "../components/index/IndexAdminAnime";
import {User} from "../types/userType";
import {fetchUser} from "../functions/userFunctions";
import "../css/index-admin.css"
import {baseUrl} from "../const";

const Home:React.FC = () =>{
    const [user,setUser] = useState<User>();
    const [animes,setAnimes] = useState<Anime[]>([]);
    useEffect(()=>{
        const fetchData = async() =>{
            await fetchUser(`/user/g/`,'GET')
                .then(response => response.json())
                .then((data:User)=>{
                    setUser(data)
                })
            await fetch("/ani/g/all")
                .then(response=>response.json())
                .then((d: { success:boolean,animes:Anime[] })=>{
                    console.log(d.animes)
                    setAnimes(d.animes);
                })
        }
        fetchData()
    },[])
    return(
        <html>
            <Header/>
            <div className='adm-container'>
                <div className={'base-adm'}>
                    <h1>Animes</h1>
                    <div>
                        {animes.map((anime,index)=>(
                            <IndexAdminAnime user_id={user?._id!} anime={anime} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </html>
    )
}
export default Home;
