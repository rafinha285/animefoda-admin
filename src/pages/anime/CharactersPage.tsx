import React, {useContext, useEffect, useState} from "react"
import globalContext from "../../context/globalContext";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {Character} from "../../types/Character";
import CharacterComponent from "../../components/character/CharacterComponent";
import {fetchUser} from "../../functions/userFunctions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";

const CharactersPage:React.FC = () => {
    const context = useContext(globalContext)!;
    const {aniId} = useParams()
    const [name,setName]=useState("");
    const [role,setRole]=useState("");
    const [characters, setCharacters] = useState<Character[]>([])

    const fetchData = async () =>{
        const res = await fetch(`/char/g/anime/${aniId}`)
        const data:{success:boolean,data:Character[]} = await res.json()
        setCharacters(data.data)
    }

    useEffect(()=>{
        console.log(aniId)
        if(!(context.isLogged && context.isAdmin)){
            window.location.href = "/"
        }
        fetchData()
    },[])

    const updateCharacter = async(e:React.MouseEvent<HTMLButtonElement>, character:Character,name:string,role:string) =>{
        e.preventDefault()
        character.name = name
        character.role = role
        await fetchUser(`/char/p/update/${character.id}`,"POST",character)
        fetchData()
    }

    const deleteCharacter = async(e:React.MouseEvent<HTMLButtonElement>, character:Character) =>{
        e.preventDefault()
        const result = await fetchUser(`/char/p/delete/${character.id}`,"DELETE")
        alert(result.ok?`Deletado personagem: ${character.name}`:"Erro ao deletar personagem")
        fetchData()
    }

    const uploadCharacter = async() =>{
        const result = await fetchUser("/char/p/new","POST",{
            name,
            role,
            anime_id:aniId
        })
        alert(result.ok?"Personagem adicionado com sucesso":`Erro ao adicionar personagem ${await result.text()}`)
        fetchData()
    }


    return(
        <html>
            <Helmet>
                <title>Editar Personagens</title>
            </Helmet>
            <Header/>
            <div className='adm-edit-container'>
                <div className='adm-edit-content'>
                    <div>
                        <h1>Personagens</h1>
                        <p>Nome: </p><input value={name} onChange={(e)=>setName(e.target.value)}/>
                        <p>Papel: </p><input value={role} onChange={(e)=>setRole(e.target.value)}/>
                        <button className='button' onClick={uploadCharacter}>Upload <FontAwesomeIcon icon={faUpload}/></button>
                    </div>
                    <div className='aniGen'>
                        {characters.map((item,index)=>(
                            <CharacterComponent character={item} deleteCharacter={deleteCharacter} updateCharacter={updateCharacter}/>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </html>
    )
}
export default CharactersPage;