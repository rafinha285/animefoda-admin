import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import EpisodeComponent from "./EpisodeComponent";
import {baseUrl} from "../../const";
import {fetchUser} from "../../functions/userFunctions";

interface props{
    id:string;
    name:string;
    index:number;
    onDelete:(e:React.MouseEvent<HTMLButtonElement>,optionName:string)=>void;
    episodes:string[],
    aniId:string,
}
const SeasonComponent:React.FC<props> = ({id,name,index,onDelete,episodes,aniId}) => {
    const handleDeleteEp = async(e:React.MouseEvent,epId:string,aniId:string,seasonId:string) =>{
        e.preventDefault();
        await fetchUser(`/ep/delete/${aniId}/${seasonId}/${epId}/`,"DELETE")
    }
    return (
        <div style={{
            border: "1px white solid",
            margin: ".5em",
            padding: ".5em",
            display:'flex',
            flexDirection: "column",
        }}>
            <p>id: </p><p>{id}</p>
            <p>Nome: </p><p>{name}</p>
            <p>Index: </p><p>{index}</p>
            <button className="delGen" onClick={(e) => onDelete(e, id)}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </button>

            <div>
                {episodes?.map((v, i) => (
                    <EpisodeComponent
                        onDelete={(ee) => handleDeleteEp(ee, v,aniId,id)}
                        epId={v}
                        aniId={aniId}
                        seasonId={id}
                        // key={e.index}
                    />
                ))}
            </div>
        </div>
    )
}
export default SeasonComponent
