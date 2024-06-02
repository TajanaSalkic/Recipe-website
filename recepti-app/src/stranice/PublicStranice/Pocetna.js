import Uvod from "../../components/Uvod.js"
import NekiRecepti from '../../components/NekiRecepti.js';
import Navbar from "../../components/Navbar.js";
export default function Pocetna(){
    return(
        <div>
            <Navbar/>
             <Uvod/>
        <NekiRecepti/>
        </div>
    )
}