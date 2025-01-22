import React, {useContext, useEffect, useState} from "react"
import globalContext from "../../context/globalContext";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {Character} from "../../types/Character";

const CharactersPage:React.FC = () => {
    const context = useContext(globalContext)!;
    const {aniId} = useParams()
    const [characters, setCharacters] = useState<Character[]>([])
    useEffect(()=>{
        console.log(aniId)
        if(!(context.isLogged && context.isAdmin)){
            window.location.href = "/"
        }
        const fetchData = async () =>{
            const res = await fetch(`/char/g/anime/${aniId}`)
            const data:{success:boolean,data:Character[]} = await res.json()
            setCharacters(data.data)
        }
        fetchData()
    },[])
    return(
        <html>
            <Helmet>
                <title>Editar Personagens</title>
            </Helmet>
            <Header/>
            <div className='adm-edit-container'>
                <div className='adm-edit-content'>
                    <h1>Personagens</h1>
                    <div className='aniGen'>
                        {characters.map((item,index)=>(
                            <div>
                                <p>{item.id}</p>
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </html>
    )
}
export default CharactersPage;