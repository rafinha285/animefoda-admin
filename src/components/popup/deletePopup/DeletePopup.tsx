import { faTrashArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Popup from "reactjs-popup";
import "./css/popup.css"
import { Anime, Season } from "../../../types/Anime";
import {fetchUser} from "../../../functions/userFunctions";

export enum typesPopup{
    delete,
    info,
    error,
    season
}
interface props{
    typee:typesPopup,
    message?:string|Anime|Season,
    isOpen:boolean,
    onClose:()=>void
}
interface propsC{
    typee:typesPopup,
    message?:string|Anime|Season,
    onClose:()=>void,
    handleDeleteAnime?:(e:React.MouseEvent)=>void,
    handleDeleteSeason?:(e:React.MouseEvent)=>void
}
const DeletePopup:React.FC<props>=({isOpen,onClose,typee,message})=>{
    const handleDeleteAnime = async(e:React.MouseEvent)=>{
        e.preventDefault()
        await fetchUser(`/ani/delete/${(message as Anime).id}`,'DELETE').then(async (res)=>{
            console.log(res)
            if(res.ok){
                window.location.href = "/"
            }else{
                let ress = await res.json()
                alert(ress.message)
                onClose();
            }
        })
    }
    const handleDeleteSeason = (e:React.MouseEvent) =>{
        e.preventDefault()
    }
    return(
        <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
            <PopupContent typee={typee} message={message} onClose={onClose} handleDeleteAnime={handleDeleteAnime} handleDeleteSeason={handleDeleteSeason}/>
        </Popup>
    )
}
const PopupContent:React.FC<propsC>=({typee,message,onClose,handleDeleteAnime,handleDeleteSeason})=>{
    switch(typee){
        case typesPopup.delete:
            return(
                <div className="popup-error popup">
                    <button className="close-button" onClick={onClose}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
                    <h1>Quer mesmo deletar o anime: {(message as Anime).name}/{(message as Anime).id}?<br/>
                        Tem certeza?
                    </h1>
                    <button onClick={handleDeleteAnime} className="delGen" style={{
                        float:"none",
                        width:"11%"
                    }}>Deletar <FontAwesomeIcon icon={faTrashArrowUp}></FontAwesomeIcon></button>
                </div>
            )
        case typesPopup.season:
            return(
                <div className="popup-error popup">
                    <button className="close_button" onClick={onClose}><FontAwesomeIcon icon={faXmark}/></button>
                    <h1>Quer deletar a season: {(message as Season).name}/{(message as Season).id}<br/>
                        E todos seus Episodios?
                    </h1>
                    <button onClick={handleDeleteSeason} className="delGen" style={{
                        float:"none",
                        width:"11%"
                    }}>Deletar <FontAwesomeIcon icon={faTrashArrowUp}/></button>
                </div>
            )
        case typesPopup.info:
            return(
                <div className="popup">
                    <button className="close-button" onClick={onClose}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
                    <h1>{message as string}</h1>
                </div>
            )
        case typesPopup.error:
            return(
                <div className="popup-error popup">
                    <button className="close-button" onClick={onClose}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
                    <h1>{message as string}</h1>
                </div>
            )
    }
}
export default DeletePopup
