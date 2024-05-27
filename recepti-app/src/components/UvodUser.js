
import React from "react";
import { useNavigate } from "react-router-dom";
import UvodSlika from "./UvodSlika.js";
import { useParams } from 'react-router-dom';

export default function UvodUser() {
    const navigate = useNavigate();
    const {email} = useParams();
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
    ];

    const handleButtonClick = () => {
        navigate(`/${email}/recepti`);
    };

    return (
        <div className="section uvod">
            <div className="col tekst">
                <h1 className="naslov">Pronađite Savršen Recept za Svaki Obrok</h1>
                <p className="info">
                    Naša stranica nudi širok izbor recepata za svaki ukus i priliku. Bez obzira jeste li početnik u kuhinji ili iskusni kuhar, ovdje ćete pronaći inspiraciju za svoje kulinarske avanture. Naša baza podataka sadrži stotine recepata, od jednostavnih jela do gurmanskih delicija, koje možete pripremiti za sebe, svoju obitelj i prijatelje.
                </p>
                <button className="btn" onClick={handleButtonClick}>Pronađi</button>
            </div>
            <div className="col slike">
                {images.map((src, index) => (
                    <UvodSlika key={index} imgSrc={src} pt={"85%"} />
                ))}
            </div>
        </div>
    );
}
