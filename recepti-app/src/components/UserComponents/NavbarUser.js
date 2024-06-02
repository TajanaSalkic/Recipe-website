import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SidebarUserAdmin from "../SidebarUserAdmin"
import { useParams } from 'react-router-dom';
import {faContactBook, faHome, faInfoCircle, faList, faHeart} from "@fortawesome/free-solid-svg-icons"
import { signOut} from 'firebase/auth';
import { auth } from "../../stranice/firebase-config";

export default function NavbarUser() {
    const [showSidebar, setShowSidebar] = useState(false); // Definisanje state-a za prikazivanje sidebar-a
    const { email } = useParams(); // Dohvatanje email parametra iz URL-a
    const navigate = useNavigate(); // Definisanje hooka za navigaciju
    const location = useLocation(); // Definisanje hooka za dohvatanje trenutne lokacije

    // Definisanje linkova za navigaciju
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
        {
            name: "Omiljeno",
            path: `/${email}/omiljeno`,
            icon: faHeart,
        },
    ];

    // Funkcija za odjavu korisnika
    const handleSignOut = async () => {
        try {
            await signOut(auth); // Poziv funkcije za odjavu iz Firebase autentikacije
            navigate("/"); // Navigacija na početnu stranicu
        } catch (err) {
            console.error(err); // Ispisivanje greške u konzolu ako dođe do problema
        }
    };

    // Funkcija za zatvaranje sidebar-a
    function closeSidebar() {
        setShowSidebar(false);
    }

    return (
        <>
            <div className="navbar container">
                <div className="logo">Foodscape</div>
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
            {showSidebar && <SidebarUserAdmin close={closeSidebar} links={links} />} {/* Prikazivanje sidebar-a ako je showSidebar true */}
        </>
    );
}