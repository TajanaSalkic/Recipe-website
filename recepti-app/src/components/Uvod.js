import UvodSlika from "./UvodSlika.js"

export default function Uvod(){
    const images = [
        "/img/Burger.jpg",
        "/img/lunch.jpg",
        "/img/salad.jpg",
        "/img/sandwich.jpg",
        "/img/tacos.png",
        "/img/cake.png",
        "/img/macarons.jpeg",
        "img/oatmeal.avif",
        "/img/pancakes.webp"
    ]  
    return(
        <div className="section uvod">
            <div className="col tekst">
                <h1 className="naslov">Lorem ipsum</h1>
                <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Duis aute irure dolor in reprehenderit in voluptate. </p>
                <button className="btn">Explore now</button>
            </div>
            <div className="col slike">
                {images.map((src, index) => (
                    <UvodSlika key ={index} imgSrc = {src} pt={"85%"}/>
                ))}
                
                
            </div>
        </div>
    )
}