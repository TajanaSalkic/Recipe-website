import UvodUser from "../../components/UserComponents/UvodUser.js"
import NekiReceptiUser from '../../components/UserComponents/NekiReceptiUser.js';
import NavbarUser from "../../components/UserComponents/NavbarUser.js";
export default function PocetnaUser(){
    return(
        <div>
            <NavbarUser/>
             <UvodUser/>
        <NekiReceptiUser/>
        </div>
    )
}