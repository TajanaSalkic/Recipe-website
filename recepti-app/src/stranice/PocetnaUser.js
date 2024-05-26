import Uvod from "../components/Uvod.js"
import NekiRecepti from '../components/NekiRecepti.js';
import NavbarUser from "../components/NavbarUser.js";
export default function PocetnaUser(){
    return(
        <div>
            <NavbarUser/>
             <Uvod/>
        <NekiRecepti/>
        </div>
    )
}