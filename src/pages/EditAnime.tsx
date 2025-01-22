import React, {ChangeEvent, useContext, useEffect, useRef, useState} from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header/Header";
import {useParams} from "react-router-dom";
import {Anime} from "../types/Anime";

import {baseUrl, cdnUrl} from "../const";
import {Audio, Gens, quality, qualityEnum, state, weekdayType} from "../types/types";
import {faArrowUpFromBracket, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import globalContext from "../context/globalContext";
import DeletePopup, {typesPopup} from "../components/popup/deletePopup/DeletePopup";
import Footer from "../components/footer/Footer";
import Loading from "../components/loading/Loading";
import "../css/edit-anime.css"
import InGenre from "../components/edit-anime/InGenre";
import {fetchUser, userSendFile} from "../functions/userFunctions";
import SeasonComponent from "../components/edit-anime/SeasonComponent";
import {daysOfWeek} from "../functions/dateFunctions";
import {Season} from "../types/Season";

const EditAnime:React.FC = () => {
    const {isLogged,isAdmin,isSuper} = useContext(globalContext)!;
    const {aniId} = useParams();
    const [ani,setAni] = useState<Anime>();
    const [name,setName] = useState<string>();
    const [name2,setName2] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [qualityV,setQualityV] = useState<quality>()
    const [language,setLanguage] = useState<Audio>()
    const [stateV,setStateV] = useState<state>()
    const [releaseDate,setReleaseDate] = useState<Date>()
    const [gens,setGens] = useState<string[]>()
    const [weekday,setWeekday] = useState<weekdayType|undefined>()
    const [visible,setVisible] = useState<boolean>()

    const [producers,setProducers] = useState<string[]>([])
    const [creators,setCreators] = useState<string[]>([])
    const [studios,setStudios] = useState<string[]>([])
    const [seasons,setSeasons] = useState<Season[]>([])

    const imgRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        const fetchAni = async()=>{
            await fetch(`/ani/g/${aniId}`)
                .then(response => response.json())
                .then((d:Anime)=>{
                    setAni(d)
                    console.log(d.state)
                    setName(d.name)
                    setName2(d.name2)
                    setDescription(d.description)
                    setQualityV(d.quality)
                    setLanguage(d.language)
                    setStateV(d.state)
                    setReleaseDate(new Date(d.releasedate))
                    setWeekday(d.weekday)
                    setGens(d.genre)
                    setVisible(d.visible)
                })
            await fetch(`${baseUrl}/ani/g/seasons/${aniId}`)
                .then(response=>response.json())
                .then((s:Season[])=>{
                    setSeasons(s);
                })
            await fetch(`${baseUrl}/ani/g/prods/${aniId}`)
                .then(response=>response.json())
                .then(r=>{
                    setProducers(r.producers);
                    setCreators(r.creators);
                    setStudios(r.studios);
                })
        }
        // console.log(Date.prototype)
        if(!isLogged){
            window.location.href = "/login"
        }
        if(!isAdmin){
            window.location.href = baseUrl
        }
        fetchAni()
    },[!ani])

    //handles
    // const [img,setImg]= useState<string>("")
    const handleImgChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            const reader = new FileReader();
            // reader.onload = () =>{
            //     setImg(reader.result as string)
            // }
            reader.readAsDataURL(file);
        }
    }
    const handleImgUpload = async (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const formData = new FormData()
        console.log(imgRef)
        if(imgRef.current && imgRef.current.files && imgRef.current.files.length > 0){
            const selectedFile = imgRef.current.files[0];
            formData.append("file", selectedFile);
            await userSendFile(`/ani/p/img/${aniId}`,formData)
        }
    }

    const [deletePopup,setDeletePopup] = useState<boolean>(false)
    const openPopup = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setDeletePopup(true);
    };
    const closePopup = () => {
        setDeletePopup(false);
    };

    const sendProds = async(prodName:string,type:"producers"|"creators"|"studios") =>{
        let res:string = await fetchUser(`/ani/p/add/prods/${aniId}/${type}/${prodName}`,"POST")
            .then(async(res)=> {
                if(res.ok){
                    return (await res.json()).result[0].name;
                }else{
                    throw res.status
                }
            })
        return res;
    }

    const handleAddOption = async(e:React.MouseEvent,id:"genre"|"producers"|"creators"|"studios") =>{
        e.preventDefault()
        let val = (document.getElementById(id) as HTMLSelectElement|HTMLInputElement).value
        switch (id) {
            case "genre":
                setGens([...gens!,val])
                break
            case "producers":
                let prod = await sendProds(val,id)
                setProducers([...producers!,prod])
                break
            case "creators":
                let crea = await sendProds(val,id)
                setCreators([...creators,crea])
                break
            case "studios":
                let stud = await sendProds(val,id)
                setStudios([...studios,stud])
                break
        }
    }
    const handleDeleteOption = (e:React.MouseEvent,id:"genre"|"producers"|"creators"|"studios",value:string)=>{
        e.preventDefault()
        switch (id) {
            case "genre":
                setGens(gens!.filter(v=>v !== value))
                break
            case "producers":
                setProducers(producers!.filter(v=>v !== value))
                break
            case "creators":
                setCreators(creators!.filter(v=>v !== value))
                break
            case "studios":
                setStudios(studios!.filter(v=>v !== value))
                break
        }
    }

    const handleAddSeason = async(e:React.MouseEvent) =>{
        e.preventDefault()
        await fetchUser(`/ani/season/p/${aniId}`,"POST",{
            name: (document.getElementById("season_name") as HTMLInputElement).value,
            index: parseInt((document.getElementById("season_index") as HTMLInputElement).value),
        }).then(async r=>{
            const res = await r.json()
            setSeasons([...seasons,res.season])
        })
    }
    const handleDeleteSeason = async(e:React.MouseEvent,id:string)=>{
        e.preventDefault()
        await fetchUser(`/ani/season/delete/${aniId}/${id}`,"DELETE").then(async r=>{
            setSeasons(seasons!.filter(v=>v.id !== id))
        })
    }

    const handleUpdate = async(e:React.MouseEvent)=>{
        e.preventDefault()
        let anime = {
            id:aniId!,
            name:name!,
            name2:name2!,
            description:description!,
            quality:qualityV!,
            language:language!,
            state:stateV!,
            releasedate:new Date(releaseDate!),
            genre:gens!,
            weekday,
            visible:visible!,
        }

        //TODO fazer o atualizar do anime
        await fetchUser(`/ani/patch/update/${aniId}`,"PATCH",anime)
        alert(`Anime updated successfully ${aniId}`)
    }

    return (
        <>
            {ani ? (
                <html>
                <Helmet>
                    <title>Editar anime {ani.name}</title>
                </Helmet>
                    <Header />
                    <div className='adm-edit-container'>
                        <div className='adm-edit-content'>
                            <DeletePopup typee={typesPopup.delete} isOpen={deletePopup} onClose={closePopup} message={ani}/>
                            <div style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "space-around"
                            }}>
                                <div>
                                    <p>id: {ani.id}</p>
                                    <img className='adm-edit-img' src={`${cdnUrl}/ani/img?Id=${aniId}`} alt={ani?.name}/>
                                </div>
                                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center"}}>
                                    <input style={{color: "white"}} type="file" ref={imgRef} accept="image/* image/jpe"
                                           onChange={handleImgChange}/>
                                    <button onClick={handleImgUpload} className="button">Upload Img <FontAwesomeIcon
                                        icon={faArrowUpFromBracket}></FontAwesomeIcon></button>
                                </div>
                            </div>
                            <div style={{display: "flex", width: "100%",justifyContent: "space-evenly"}}>
                                <button onClick={handleUpdate} className='button'>Update <FontAwesomeIcon icon={faArrowUpFromBracket}/></button>
                                <button onClick={openPopup} className='button del'>Deletar Anime <FontAwesomeIcon icon={faTrash}/></button>
                            </div>
                            <div className='values'>
                                <div style={{display: "flex"}}>
                                    <p>Visible: </p>
                                    <input type='radio' checked={visible} onChange={(e)=>setVisible(e.target.checked)}/>
                                </div>
                                <div>
                                    <p>Nome: </p>
                                    <input value={name} onChange={(e) => {
                                        setName(e.target.value)
                                    }} placeholder='name'/>
                                </div>
                                <div>
                                    <p>Nome Alternativo: </p>
                                    <input value={name2} onChange={(e) => {
                                        setName2(e.target.value)
                                    }}/>
                                </div>
                                <div>
                                    <p>Descrição: </p>
                                    <textarea cols={30} rows={10} style={{resize:"both",width:"100%"}} value={description} onChange={(e)=>{
                                        setDescription(e.target.value)
                                    }}/>
                                </div>
                                <div>
                                    <p>Estado: </p>
                                    <select value={stateV!} onChange={(e)=>{
                                        setStateV(e.target.value as state)
                                    }}>
                                        {Object.values(state).map((v,i)=>(
                                            <option key={i} value={v}>{v}</option>
                                        ))}
                                    </select>
                                </div>
                                {stateV === state.ONGOING?(
                                    <div>
                                        <p>Dia de Lançamento da semana:</p>
                                        <select value={weekday} onChange={(e)=> setWeekday(e.target.value as weekdayType)}>
                                            {daysOfWeek().map((v,i)=>(
                                                <option value={v} key={i}>{v}</option>
                                            ))}
                                        </select>
                                    </div>
                                ):(<></>)}
                                <div>
                                    <p>Qualidade: </p>
                                    <select value={qualityV} onChange={(e) => setQualityV(parseInt(e.target.value) as quality)}>
                                        {Object.values(qualityEnum).map((v, i) => (
                                            <option key={i} value={v}>{v}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p>Data de lançamento: </p>
                                    <input type='date' value={releaseDate!.toISOString().split("T")[0]} onChange={(e)=>{
                                        setReleaseDate(new Date(e.target.value))
                                    }}/>
                                </div>
                                <div>
                                    <p>Generos: </p>
                                    <select id='genre'>
                                        {Gens.map((v, i) => (
                                            <option key={i} value={v}>{v}</option>
                                        ))}
                                    </select>
                                    <button className='button'
                                            onClick={(e) => handleAddOption(e, "genre")}>Adicionar <FontAwesomeIcon
                                        icon={faPlus}></FontAwesomeIcon></button>
                                    <div className="aniGen">
                                        {(gens as string[]).map((v, i) => (
                                            <InGenre key={i} optionName={v} onDelete={(e) => handleDeleteOption(e,"genre",v)}/>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p>Produtores: </p>
                                    <input id='producers'/>
                                    <button className='button'
                                            onClick={(e) => handleAddOption(e, "producers")}>Adicionar <FontAwesomeIcon
                                        icon={faPlus}/></button>
                                    <div className="aniGen">
                                        {producers?.map((v, i) => (
                                            <InGenre key={i} optionName={v}
                                                 onDelete={(e) => handleDeleteOption(e, "producers", v)}/>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p>Criadores:</p>
                                    <input id='creators'/>
                                    <button className='button'
                                            onClick={(e) => handleAddOption(e, "creators")}>Adicionar <FontAwesomeIcon icon={faPlus}/></button>
                                    <div className='aniGen'>
                                        {creators?.map((v, i) => (
                                            <InGenre key={i} optionName={v}
                                            onDelete={(e) => handleDeleteOption(e, "creators", v)}/>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p>Estudios: </p>
                                    <input id='studios'/>
                                    <button className='button'
                                            onClick={(e)=> handleAddOption(e,"studios")}>
                                        Adicionar <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                    <div className='aniGen'>
                                        {studios?.map((v, i) => (
                                            <InGenre key={i} optionName={v}
                                                onDelete={(e)=>handleDeleteOption(e, "studios", v)}/>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p>Seasons: </p>
                                    <div>
                                        <p>Nome:</p>
                                        <input id="season_name"/>
                                    </div>
                                    <div>
                                        <p>Index</p>
                                        <input id="season_index" type={'number'}/>
                                    </div>
                                    <button className='button'
                                            onClick={handleAddSeason}>
                                        Adicionar <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                    <div className='aniGen'>
                                        {seasons?.map((v,i)=>(
                                            <SeasonComponent
                                                id={v.id}
                                                name={v.name}
                                                index={v.index}
                                                key={v.index}
                                                onDelete={handleDeleteSeason}
                                                episodes={v.episodes}
                                                aniId={aniId!}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                   <button className='button' onClick={()=>window.location.href = `/admin/characters/${ani.id}`}>Personagens</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </html>
            ) : <Loading/>}
        </>
    )
}
export default EditAnime;
