import React from "react";
import {Anime} from "../../types/Anime";
import {trim} from "../../functions/stringFunctions";

interface Props {
    anime:Anime;
}

const IndexAdminAnime:React.FC<Props> = ({anime}) =>{
    return(
        <div className='adm-ani'
        onClick={(e) => {
            e.preventDefault()
            window.location.href = `/admin/edit/${anime.id}`
        }}>
            <p>Nome: {anime.name}</p>
            <p>Descrição: {trim(anime.description,200)}</p>
        </div>
    )
}
export default IndexAdminAnime;
