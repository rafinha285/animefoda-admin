import React, {useEffect, useRef, useState} from 'react'
import {Character} from "../../types/Character";
import {cdnUrl} from "../../const";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faUpload} from "@fortawesome/free-solid-svg-icons";
import UploadButton, {UploadButtonType} from "../buttons/UploadButton";
import {fetchUser} from "../../functions/userFunctions";

interface CharacterProps {
    character: Character
    deleteCharacter: (e:React.MouseEvent<HTMLButtonElement>,character:Character)=>void;
    updateCharacter: (e:React.MouseEvent<HTMLButtonElement>,character:Character,name:string,role:string) => void;
}

const CharacterComponent:React.FC<CharacterProps> =({character,deleteCharacter,updateCharacter}) =>{
    const [hasImg, setHasImg] = useState<boolean>(false)
    const [name,setName] = useState<string>(character.name)
    const [role,setRole] = useState<string>(character.role)

    const imgRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        const checkImg = async()=>{
            const img = await fetch(`${cdnUrl}/character/img/${character.anime_id}/${character.id}`)
            console.log(img.ok)
            setHasImg(img.ok)
        }
        checkImg()
    },[])

    const uploadImg = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        //todo fazer o request para mandar a imagem do personagem para o servidor
        await fetchUser("")
    }

    return(
        <div className='character aniGen'>
            <button className='delGen' onClick={(e)=>deleteCharacter(e,character)}><FontAwesomeIcon icon={faTrash}/></button>
            <p>Id:{character.id}</p>
            <div>
                <p>Alterar imagem</p>
                <input
                    type='file'
                    accept="image/*"
                    style={{ color:'white' }}
                    ref={imgRef}
                />
                {/*<button onClick={uploadImg} className='button'>*/}
                {/*    Upload Img*/}
                {/*    <FontAwesomeIcon icon={faArrowUpFromBracket}/>*/}
                {/*</button>*/}
                <UploadButton type={UploadButtonType.img} handle={uploadImg}/>
                <img className='adm-edit-img' src={`${cdnUrl}/character/img/${character.anime_id}/${character.id}`}/>
            </div>
            <p>Nome: </p><input value={name} onChange={(e)=>setName(e.target.value)}/><br/>
            <p>Papel: </p><input value={role} onChange={(e)=>setRole(e.target.value)}/><br/>
            <button className='button' onClick={(e)=>updateCharacter(e,character,name,role)}>
                Update <FontAwesomeIcon icon={faUpload}/>
            </button>
        </div>
    )
}
export default CharacterComponent