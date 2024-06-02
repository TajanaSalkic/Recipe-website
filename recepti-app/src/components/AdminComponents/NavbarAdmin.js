import { useState } from "react"
import { Link, useLocation , useNavigate} from "react-router-dom"
import SidebarUserAdmin from "../SidebarUserAdmin"
import { faHome, faContactBook} from "@fortawesome/free-solid-svg-icons"
import { signOut} from 'firebase/auth';
import { auth } from "../../stranice/firebase-config";

export default function NavbarAdmin(){
    const [showSidebar, setShowSidebar] = useState(false); // stanje za prikazivanje sidebara, default je false
    const navigate = useNavigate(); // navigiranje po stranicama

    //linkovi za navbar, odnosno rutanje
    const links=[{
            name: "Početna",
            path: "/admin",
            icon: faHome
    },
    {
        name:"Korisnici",
        path:"/admin/korisnici",
        icon:faContactBook
    }
]

// funkcija za odjavljivanje korisnika koja automatski vraća korisnika na public pocetnu stranicu

const handleSignOut = async () => {
    try {
        await signOut(auth);
        navigate("/");
    } catch (err) {
        console.error(err);
    }
};

// funckija za zatvaranjae sidebara
    function closeSidebar(){
        setShowSidebar(false)
    }

    const location = useLocation()
    return (
        <>
        <div className="navbar container">
            <a href="/admin" className="logo">Foodscape</a>
            <div className="nav-links">
                {/*mapiranje linkova i css active class name kada je stranica aktivna da je osvijetli*/}
                {links.map(link => (
                    <Link to={link.path} className={ location.pathname === link.path ? "active" : ""} key={link.name}>{link.name}</Link>
                ))}
             <a href="#!" onClick={handleSignOut} className="nav-link">
                        <span>Odjava</span>
                    </a>
            </div>
            <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    {/* za prikaz linija koje predstavljaju ikonu za sidebar */}
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>

            </div>
        </div>
        {/* za prikazivanje bočne trake ako je showSidebar true */}
        {showSidebar && <SidebarUserAdmin close = {closeSidebar} links={links}/>}
        
        </>
        
    )
}