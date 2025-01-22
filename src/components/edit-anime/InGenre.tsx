import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Producer } from "../../types/types";

interface props{
    optionName:string|Producer;
    onDelete:(e:React.MouseEvent<HTMLButtonElement>,optionName:string)=>void;
}

const InGenre:React.FC<props> = ({optionName,onDelete}) =>{
    return(
        <div className="aniGenIn">
            <p>{typeof optionName === "string" ? optionName : optionName.name}</p>
            <button className="delGen" onClick={(e)=>onDelete(e,(typeof optionName === "string" ? optionName : optionName.name))}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        </div>
    )
}

export default InGenre
