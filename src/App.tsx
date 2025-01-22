import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {GlobalProvider} from "./context/globalContext";
import "./css/base.css"
import Login from "./pages/Login";
import Home from "./pages/Home";
import EditAnime from "./pages/EditAnime";
import NewAnime from "./pages/NewAnime";
import SelectProducers from "./pages/SelectProducers";

function App() {
    return (
        <Router>
            <GlobalProvider>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/admin/edit/:aniId' element={<EditAnime/>}/>
                    <Route path='/admin/create/anime' element={<NewAnime/>}/>
                    <Route path='/producers' element={<SelectProducers/>}/>
                </Routes>
            </GlobalProvider>
        </Router>
    );
}

export default App;
