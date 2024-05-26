import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SidebarUserAdmin from "./SidebarUserAdmin"
import { useParams } from 'react-router-dom';

import {faContactBook, faHome, faInfoCircle, faList} from "@fortawesome/free-solid-svg-icons"
//import { auth, signOut } from "../stranice/firebase-config";
import { signOut} from 'firebase/auth';
import { auth } from "../stranice/firebase-config";
export default function NavbarUser() {
    const [showSidebar, setShowSidebar] = useState(false);
    const { email } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const links = [
        {
            name: "Početna",
            path: `/${email}/`,
            icon: faHome,
        },
        {
            name: "Recepti",
            path: `/${email}/recepti`,
            icon: faList,
        },
        {
            name: "O nama",
            path: `/${email}/about`,
            icon: faInfoCircle,
        },
        {
            name: "Kontakt",
            path: `/${email}/kontakt`,
            icon: faContactBook,
        },
    ];

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    function closeSidebar() {
        setShowSidebar(false);
    }

    return (
        <>
            <div className="navbar container">
                {/* dodati i logo neki mozda */}
                <a href="#!" className="logo">IME</a>
                <div className="nav-links">
                    {links.map(link => (
                        <Link to={link.path} className={location.pathname === link.path ? "active" : ""} key={link.name}>
                            {link.name}
                        </Link>
                    ))}
                    <a href="#!" onClick={handleSignOut} className="nav-link">
                        <span>Odjava</span>
                    </a>
                </div>
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {showSidebar && <SidebarUserAdmin close={closeSidebar} links={links} />}
        </>
    );
}
