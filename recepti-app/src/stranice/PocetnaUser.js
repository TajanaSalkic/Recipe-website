import UvodUser from "../components/UvodUser.js"
import NekiReceptiUser from '../components/NekiReceptiUser.js';
import NavbarUser from "../components/NavbarUser.js";
export default function PocetnaUser(){
    return(
        <div>
            <NavbarUser/>
             <UvodUser/>
        <NekiReceptiUser/>
        </div>
    )
}