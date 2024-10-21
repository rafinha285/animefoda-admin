import {FC, useContext, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import "./css/header.css"
import GlobalContext from "../../context/globalContext";

const Header:FC = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [cookies,setCookies,removeCookie] = useCookies(["token"])

    const handleLogout = async()=>{
        fetch('/user/p/logout/',{method:"POST"})
            .then(response=>response.json())
            .then(data=>console.log(data))

        sessionStorage.removeItem("token")
        removeCookie('token')
        window.location.href='/'
    }

    const handleKeyPress = (event:React.KeyboardEvent<HTMLInputElement>)=>{
        if (event.key === "Enter"){
            window.location.href = `/search?s=${searchTerm}`
        }
    }
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchTerm(event.target.value)
    }

    const [searchVisible, setSearchVisible] = useState(false)
    const toggleSearch = ()=>{
        setSearchVisible(!searchVisible)
    }
    const context = useContext(GlobalContext);
    if(!context){
        return <div>O contexto global não está definido</div>;
    }
    const {isLogged} = context
    return (
        <header className="header">
            <nav>
                <a href={isLogged?"/home":"/"} style={{
                    textDecoration: "none"
                }}>
                    <h1 style={{
                        cursor: "pointer"
                    }}>Anime foda</h1>
                </a>
                <ul className="nav_link">
                    <div className="dropdown">
                        <li><a href="">Animes</a></li>
                        <div className="dropdown-content">
                            <a href={`/admin/create/anime`}>Adicionar anime</a>
                        </div>
                    </div>
                    <li><a href="">Mangá</a></li>
                    <li>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color={'white'} cursor={'pointer'}
                                         onClick={toggleSearch}></FontAwesomeIcon>
                        <input type="text"
                               id="search"
                               className={`search ${searchVisible ? "show" : ""}`}
                               onChange={handleInputChange}
                               onKeyDown={handleKeyPress}
                               placeholder="Buscar..."
                        ></input>
                    </li>
                    {/* <li>{isLogged?(

                        <Link to={'/user'}><i className="fa-solid fa-user"></i></Link>
                    ):(<Link to={"/login"}><i className="fa-solid fa-user"></i></Link>)}</li> */}
                    <li>{isLogged ? (
                        <button onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket}/></button>
                    ) : (
                        <Link to={"/login"}><FontAwesomeIcon icon={faUser}/></Link>
                    )}</li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;
