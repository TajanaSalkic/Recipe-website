import NekiReceptiSlike from "./NekiReceptiSlike"
import Tabela from "./Tabela"

import {faContactBook, faHome, faInfoCircle, faList, faSignIn} from "@fortawesome/free-solid-svg-icons"

import { Link } from "react-router-dom"
export default function NekiRecepti(){
    
    const images = [
        { src: "/img/Burger.jpg", category: "FastFood", path:"/burger" },
        { src: "/img/lunch.jpg", category: "Lunch", path:"/lunch" },
        { src: "/img/salad.jpg", category: "Salad", path:"/salad" },
        { src: "/img/pancakes.webp", category: "Sweets", path:"/sweets" },
    ]  

    {/*{ src: "/img/sandwich.jpg", category: "Sandwich", path:"/sandwiches" },
        { src: "/img/macarons.jpeg", category: "Sweets", path:"/sweets" },*/}
   

    const links=[{
        name: "Ljuta hrana",
        path: "/ljutahrana",
        icon: faHome
},
{
    name:"Recepti",
    path:"/recipes",
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

    
    return(

        <div className="section nrecepti">
            <div className="tekst">Lorem ipsum</div>
            <div className="col1 slike">
                {images.map(({src, category, path}, index) => (
                    <Link to={path} key={index}>
                        <NekiReceptiSlike imgSrc = {src} pt={"85%"} category={category}/>
                    </Link>
                ))}
        
        </div>
            <div className="col1 tabela">
                <Tabela links={links}/>
                <div className="prazno"></div>
        </div>
                
        
        </div>
    )
}