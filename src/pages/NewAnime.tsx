import React, {ChangeEvent, useRef, useState} from "react";
import {Audio, Gens, qualityEnum, state} from "../types/types";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {Helmet} from "react-helmet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faUpload} from "@fortawesome/free-solid-svg-icons";
import InGenre from "../components/edit-anime/InGenre";
import {fetchUser, userSendFile} from "../functions/userFunctions";

const NewAnime:React.FC = () =>{
    const [name,setName] = useState<string>("");
    const [name2,setName2] = useState<string>("");
    const [description,setDescription] = useState<string>("");

    //selected prods = valor do input para adicionar
    const [selectedProd,setSelectedProd] = useState<string>("");
    const [selectedStudio,setSelectedStudio] = useState<string>("");
    const [selectedCriator,setSelectedCriator] = useState<string>("");
    const [selectedGen,setSelectedGen] = useState<string>(Gens[0]);


    //array de prods para ser enviado ao servidor
    const [producers,setProducers]= useState<string[]>([]);
    const [studios,setStudios]= useState<string[]>([]);
    const [creators,setCreators]= useState<string[]>([]);
    const [gens,setGens] = useState<string[]>([]);

    const [releaseDate,setReleaseDate] = useState<Date>()
    const [qualityV,setQuality] = useState<qualityEnum>(qualityEnum.FULLHD);
    const [stateV,setState] = useState<state>(state.NOTARING);
    const [language,setLanguage] = useState<Audio>(Audio.LEG);


    //img handlers
    const imgInputRef = useRef<HTMLInputElement>(null);
    const [img,setImg] = useState<string>("")

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // A URL da imagem ou o conteúdo do arquivo pode ser armazenado no estado
                setImg(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit =async(e:React.MouseEvent)=>{
        e.preventDefault()
        await fetchUser("/ani/p/new","POST",{
            name,
            name2,
            description,
            producers,
            studios,
            creators,
            gens,
            releasedate:releaseDate,
            quality:qualityV,
            state:stateV,
            language,
        }).then(async(res)=>{
            if(res.ok){
                let ani = await res.json()
                if(img){
                    const formData = new FormData();
                    if(imgInputRef.current && imgInputRef.current.files && imgInputRef.current.files.length>0){
                        formData.append("file", imgInputRef.current.files[0]);
                        await userSendFile(`/ani/p/img/${ani.id}`,formData);
                    }
                }
            }
        })
    }


    return (
        <html>
            <Helmet>
                <title>Adicionar novo anime</title>
            </Helmet>
            <Header/>
            <div className="adm-edit-container">
                <div className='adm-edit-content'>
                    <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-around"
                    }}>
                        <h1>Adicionar Novo anime</h1>
                    </div>
                    <div style={{display: "flex", width: "100%","flexDirection": "row-reverse"}}>
                        <button onClick={handleSubmit} className='button'>Adicionar anime <FontAwesomeIcon icon={faUpload}/></button>
                    </div>
                    <div className='values'>

                        <div>
                            <p>Nome: </p>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div>
                            <p>Nome alternativo: </p>
                            <input type='text' value={name2} onChange={(e) => setName2(e.target.value)}/>
                        </div>

                        <div>
                            <p>Descrição: </p>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                      style={{resize: "both", width: "100%"}} cols={30} rows={10}/>
                        </div>

                        <div>
                            <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                                <p>Gêneros: </p>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setGens([...gens, selectedGen])
                                }} className='button'>Adicionar <FontAwesomeIcon icon={faPlus}/></button>
                            </div>
                            <select onChange={(e) => setSelectedGen(e.target.value)} value={selectedGen}>
                                {Gens.map((v, i) => (
                                    <option key={i} value={v}>{v}</option>
                                ))}
                            </select>
                            <div className='aniGen'>
                                {gens.map((v, i) => (
                                    <InGenre optionName={v} onDelete={(e, v) => {
                                        e.preventDefault()
                                        setGens(gens.filter(v1 => v1 !== v))
                                    }}/>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p>Data de lançamento: </p>
                            <input
                                type='date'
                                value={releaseDate?.toISOString().split("T")[0]}
                                style={{width: "30%"}}
                                onChange={(e) => setReleaseDate(new Date(e.target.value))}
                            />
                        </div>

                        <div>
                            <p>Qualidade: </p>
                            <select onChange={(e) => setQuality(e.target.value as qualityEnum)} value={qualityV}>
                                {Object.values(qualityEnum).map((v, i) => (
                                    <option key={i} value={v}>{v}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p>Estado: </p>
                            <select onChange={(e) => setState(e.target.value as state)} value={stateV}>
                                {Object.values(state).map((v, i) => (
                                    <option key={i} value={v}>{v}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p>Idioma: </p>
                            <select value={language} onChange={(e)=>setLanguage(e.target.value as Audio)}>
                                {Object.values(Audio).map((v, i) => (
                                    <option value={v} key={i}>{v}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                                <p>Produtor: </p>
                                <button className='button' onClick={(e) => {
                                    setProducers([...producers, selectedProd])
                                }}>Adicionar <FontAwesomeIcon icon={faPlus}/></button>
                            </div>
                            <input value={selectedProd} onChange={(e) => setSelectedProd(e.target.value)}
                                   style={{width: "100%"}}/>
                            <div className='aniGen'>
                                {producers.map((v, i) => (
                                    <InGenre optionName={v} onDelete={(e, v) => {
                                        e.preventDefault()
                                        setProducers(producers.filter(v1 => v1 !== v))
                                    }}/>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                                <p>Estudios: </p>
                                <button className='button' onClick={(e) => {
                                    setStudios([...studios, selectedStudio])
                                }}>Adicionar <FontAwesomeIcon icon={faPlus}/></button>
                            </div>
                            <input value={selectedStudio} onChange={(e) => setSelectedStudio(e.target.value)}
                                   style={{width: "100%"}}/>
                            <div className='aniGen'>
                                {studios.map((v, i) => (
                                    <InGenre optionName={v} onDelete={(e, v) => {
                                        e.preventDefault()
                                        setStudios(studios.filter(v1 => v1 !== v))
                                    }}/>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                                <p>Criadores: </p>
                                <button className='button' onClick={(e) => {
                                    setCreators([...creators, selectedCriator])
                                }}>Adicionar <FontAwesomeIcon icon={faPlus}/></button>
                            </div>
                            <input value={selectedCriator} onChange={(e) => setSelectedCriator(e.target.value)}
                                   style={{width: "100%"}}/>
                            <div className='aniGen'>
                                {creators.map((v, i) => (
                                    <InGenre optionName={v} onDelete={(e, v) => {
                                        e.preventDefault()
                                        setCreators(creators.filter(v1 => v1 !== v))
                                    }}/>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p>Imagem cover</p>
                            <input ref={imgInputRef} type='file' style={{color:'white'}} accept="image/*" onChange={handleFileChange}/>
                            {img&&<>
                                <div className='main-img'>
                                    <img src={img} />
                                </div>
                            </>}
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </html>
    )
}
export default NewAnime;
