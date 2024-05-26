import Jelo from "../components/Jelo"
import NavbarUser from "../components/NavbarUser"
import { useParams } from 'react-router-dom';

export default function ReceptiUser(){
    const { email } = useParams();
    return(
        
        <div>
            <NavbarUser/>
            <Jelo/>
        </div>
    )
}