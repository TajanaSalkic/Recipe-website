
import React from "react";
import { useNavigate } from "react-router-dom";
import UvodSlika from "../UvodSlika.js";
import { useParams } from 'react-router-dom';
import '../../stilovi/uvod.css';

export default function UvodUser() {
    const navigate = useNavigate(); // Inicijalizacija navigacije
    const { email } = useParams(); // Dohvatanje email parametra iz URL-a
    
    // Niz slika koje se koriste na početnoj stranici
    const images = [
        "/img/Burger.jpg",
        "/img/lunch.jpg",
        "/img/salad.jpg",
        "/img/sandwich.jpg",
        "/img/tacos.png",
        "/img/cake.png",
        "/img/macarons.jpeg",
        "/img/oatmeal.avif",
        "/img/pancakes.webp"
    ];

    // Funkcija koja se izvršava prilikom klika na dugme
    const handleButtonClick = () => {
        navigate(`/${email}/recepti`); // Navigacija na stranicu s receptima
    };

    return (
        <div className="section uvod">
            <div className="col tekst">
                <h1 className="naslov">Pronađite Savršen Recept za Svaki Obrok</h1> 
                <p className="info">
                    Naša stranica nudi širok izbor recepata za svaki ukus i priliku. Bez obzira jeste li početnik u kuhinji ili iskusni kuhar, ovdje ćete pronaći inspiraciju za svoje kulinarske avanture. Naša baza podataka sadrži stotine recepata, od jednostavnih jela do gurmanskih delicija, koje možete pripremiti za sebe, svoju obitelj i prijatelje.
                </p>
                <button className="btni" onClick={handleButtonClick}>Pronađi</button> 
            </div>
            <div className="col slike">
                {/* Mapiranje niza slika za prikazivanje */}
                {images.map((src, index) => (
                    <UvodSlika key={index} imgSrc={src} pt={"85%"} /> // Prikaz svake slike pomoću komponente UvodSlika
                ))}
            </div>
        </div>
    );
}