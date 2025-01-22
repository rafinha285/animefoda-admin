import React, {useState} from 'react'
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const SelectProducers:React.FC = () =>{
    const [producers,setProducers] = useState([]);
    return (
        <html>
            <Header></Header>
            <div id='producers'>

            </div>
            <Footer></Footer>
        </html>
    )
}
export default SelectProducers