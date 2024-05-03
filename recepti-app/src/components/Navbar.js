import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"

import {faContactBook, faHome, faInfoCircle, faList, faSignIn} from "@fortawesome/free-solid-svg-icons"
export default function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false)
    const links=[{
            name: "Početna",
            path: "/",
            icon: faHome
    },
    {
        name:"Recepti",
        path:"/recepti",
        icon:faList
    },
    {
        name:"Prijava",
        path:"/login",
        icon: faSignIn
    },
    {
        name: "O nama",
        path:"/about",
        icon: faInfoCircle
    },
    {
        name:"Kontakt",
        path:"/kontakt",
        icon: faContactBook
    }]

    function closeSidebar(){
        setShowSidebar(false)
    }

    const location = useLocation()
    return (
        <>
        <div className="navbar container">
            {/* dodati i logo neki mozda */}
            <a href="#!" className="logo">IME</a>
            <div className="nav-links">
                {links.map(link => (
                    <Link to={link.path} className={ location.pathname === link.path ? "active" : ""} key={link.name}>{link.name}</Link>
                ))}
               { /*<a href="#!">Home</a>
                <a href="#!">Recipes</a>
                <a href="#!">Settings</a>*/}
            </div>
            <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>

            </div>
        </div>
        {showSidebar && <Sidebar close = {closeSidebar} links={links}/>}
        
        </>
        
    )
}