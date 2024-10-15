import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGooglePlay} from "@fortawesome/free-brands-svg-icons";
import "./css/footer.css"

const Footer: FC = () => {
    return (
        <footer className="main-footer">
            <p>Anime foda</p>
            <p style={{
                display: "flex"
            }}>Baixe agora:&emsp;<FontAwesomeIcon icon={faGooglePlay}/></p>
            <div>
                <a href="/public"><span>Home</span></a>
                <a href="/contato"><span>Contato</span></a>
            </div>
        </footer>
    )
}
export default Footer;
