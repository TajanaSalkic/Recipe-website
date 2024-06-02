import { useState } from "react"
import { Link, useLocation , useNavigate} from "react-router-dom"
import SidebarUserAdmin from "../SidebarUserAdmin"

import { faHome, faList} from "@fortawesome/free-solid-svg-icons"
import { signOut} from 'firebase/auth';
import { auth } from "../../stranice/firebase-config";
export default function NavbarAdmin(){
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();

    const links=[{
            name: "Početna",
            path: "/admin",
            icon: faHome
    },
    {
        name:"Korisnici",
        path:"/admin/korisnici",
        icon:faList
    }
]

const handleSignOut = async () => {
    try {
        await signOut(auth);
        navigate("/");
    } catch (err) {
        console.error(err);
    }
};

    function closeSidebar(){
        setShowSidebar(false)
    }

    const location = useLocation()
    return (
        <>
        <div className="navbar container">
            {/* dodati i logo neki mozda */}
            <a href="#!" className="logo">Foodscape</a>
            <div className="nav-links">
                {links.map(link => (
                    <Link to={link.path} className={ location.pathname === link.path ? "active" : ""} key={link.name}>{link.name}</Link>
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
        {showSidebar && <SidebarUserAdmin close = {closeSidebar} links={links}/>}
        
        </>
        
    )
}