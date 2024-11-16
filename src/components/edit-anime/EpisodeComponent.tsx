import React, {useEffect, useState} from "react";
import {Episode} from "../../types/episodeModel";
import {baseUrl} from "../../const";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getEpTime} from "../../functions/stringFunctions";


interface props{
    aniId:string
    seasonId:string
    epId:string
    onDelete:(e:React.MouseEvent)=>void
}
const EpisodeComponent:React.FC<props> = ({epId,seasonId,aniId,onDelete}) =>{
    const [ep,setEp] = useState<Episode>()
    const [error,setError] = useState<boolean>(false)
    useEffect(()=>{
        const fetchEp = async() =>{
            await fetch(`${baseUrl}/ep/g/${aniId}/${seasonId}/${epId}`)
                .then(res => {
                    if(!res.ok){
                        setError(true);
                        throw res.status;
                    }
                    return res.json()
                })
                .then(data => setEp(data))
        }
        fetchEp();
    },[!ep])
    return(
        <>
            {ep?(
                <div style={{
                    border: "1px white solid",
                    margin: ".5em",
                    padding: ".5em"
                }}>
                    <button className='delGen' onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </button>
                    <p>id: {ep.id}</p>
                    <p>Legenda: {ep.subtitlestracks?.map((v, i) => (
                        <Link to={`/Anime/${ep.anime_id}/${ep.season_id}/${ep.id}/EditSubtitles/${v}`} key={i}>
                            <button className="button" key={i}>{v}</button>
                        </Link>

                    ))}</p>
                    <p>Nome: {ep.name}</p>

                    <p>Opening Start: {getEpTime(ep.openingstart)}</p>
                    <p>Opening End: {getEpTime(ep.openingend)}</p>
                    <p>Ending: {getEpTime(ep.ending)}</p>
                    <p>Duração: {getEpTime(ep.duration!)}</p>
                    <p>Audio: {ep.audiotracks.map((v, i) => (
                        <span key={i}>{v}</span>
                    ))}</p>
                    <p>Index: {ep.epindex}</p>
                    <p>Release date: {ep.releasedate.toString()}</p>
                </div>
            ) : error?(
                <div className="aniSeaIn">
                    <button className="delGen" onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                    </button>
                    <p>{epId}</p>
                </div> )
            :
                <></>}
        </>
    )
}
export default EpisodeComponent;
