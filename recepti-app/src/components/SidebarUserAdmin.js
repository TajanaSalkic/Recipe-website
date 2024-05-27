import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';
import {faSignOut} from "@fortawesome/free-solid-svg-icons"
import { signOut} from 'firebase/auth';
import { auth } from "../stranice/firebase-config";

export default function SidebarUserAdmin({ links, close }) {
    const location = useLocation()
    const { email } = useParams();
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="sidebar" onClick={close}>
            {links.map(link => (
                <Link to={link.path} className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"} key={link.name}>
                    <FontAwesomeIcon icon={link.icon}></FontAwesomeIcon>
                    {link.name}
                </Link>
            ))}
            <a href="#!" onClick={handleSignOut} className="sidebar-link">
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
                Odjava
            </a>
        </div>
    )
}
