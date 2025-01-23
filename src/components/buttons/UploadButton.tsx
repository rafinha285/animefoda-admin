import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons";

export enum UploadButtonType{
    img,
    episode
}

interface UploadButtonProps {
    type:UploadButtonType;
    handle:(e:React.MouseEvent<HTMLButtonElement>) => void;
}

const UploadButton:React.FC<UploadButtonProps> = ({type,handle}) =>{

    return (
        <button className="button" onClick={handle}>
            Upload {Object.keys(type)}
            <FontAwesomeIcon icon={faArrowUpFromBracket}/>
        </button>
    )
}
export default UploadButton;