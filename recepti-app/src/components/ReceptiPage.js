import { Link } from "react-router-dom"

export default function ReceptiPage(){
    const images = [
        { src: "/img/Burger.jpg", category: "FastFood", path:"/burger" },
        { src: "/img/lunch.jpg", category: "Lunch", path:"/lunch" },
        { src: "/img/salad.jpg", category: "Salad", path:"/salad" },
        { src: "/img/pancakes.webp", category: "Sweets", path:"/sweets" },
    ]  
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
        
    
            
    
    </div>
    )
}