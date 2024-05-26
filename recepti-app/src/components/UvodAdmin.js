import React from "react";
import { useNavigate } from "react-router-dom";
import UvodSlika from "./UvodSlika.js";

export default function Uvod() {
    const navigate = useNavigate();
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
        navigate("/recepti");
    };

    return (
        <div className="section uvod">
            <div className="col tekst">
                <h1 className="naslov">Dobrodošli na Admin Page</h1>
                <p className="info">
                    Kao admin imate mogućnost da vidite sve korisnike svog sistema. Uz pregled korisnika imate opciju da ih obrišete iz sistema!
                </p>
                
            </div>
            <div className="col slike">
                {images.map((src, index) => (
                    <UvodSlika key={index} imgSrc={src} pt={"85%"} />
                ))}
            </div>
        </div>
    );
}

