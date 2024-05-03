import NekiReceptiSlike from "./NekiReceptiSlike"
import Tabela from "./Tabela"

import {faContactBook, faHome, faInfoCircle, faList, faSignIn} from "@fortawesome/free-solid-svg-icons"


export default function ReceptiNeki(){
    
    const images = [
        { src: "/img/Burger.jpg", category: "FastFood", path:"/" },
        { src: "/img/lunch.jpg", category: "Lunch", path:"/" },
        { src: "/img/salad.jpg", category: "Salad", path:"/" },
        { src: "/img/sandwich.jpg", category: "Sandwich", path:"/" },
        { src: "/img/macarons.jpeg", category: "Sweets", path:"/" },
        { src: "/img/pancakes.webp", category: "Sweets", path:"/" },
    ]  

   

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
                {images.map(({src, category}, index) => (
                    <NekiReceptiSlike key ={index} imgSrc = {src} pt={"85%"} category={category}/>
                ))}
        
        </div>
            <div className="col1 tabela">
                <Tabela links={links}/>
                <div className="prazno"></div>
        </div>
                
        
        </div>
    )
}