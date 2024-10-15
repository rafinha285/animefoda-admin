import React from "react";
import {Anime} from "../../types/Anime";
import {trim} from "../../functions/stringFunctions";

interface Props {
    user_id: string;
    anime:Anime;
}

const IndexAdminAnime:React.FC<Props> = ({user_id,anime}) =>{
    return(
        <div className='adm-ani'
        onClick={(e) => {
            e.preventDefault()
            window.location.href = `/admin/${user_id}/edit/${anime.id}`
        }}>
            <p>Nome: {anime.name}</p>
            <p>Descrição: {trim(anime.description,200)}</p>
        </div>
    )
}
export default IndexAdminAnime;
