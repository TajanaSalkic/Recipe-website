import React from "react";
import UvodSlika from "../UvodSlika.js";

export default function Uvod() {
    // niz slika koje se koriste na početnoj stranici
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



    return (
        <div className="section uvod">
            <div className="col tekst">
                <h1 className="naslov">Dobrodošli na Admin Page</h1>
                <p className="info">
                    Kao admin imate mogućnost da vidite sve korisnike svog sistema. Uz pregled korisnika imate opciju da ih obrišete iz sistema!
                </p>
                
            </div>
            <div className="col slike">
                {/*mapiranje slika za ispis*/}
                {images.map((src, index) => (
                    <UvodSlika key={index} imgSrc={src} pt={"85%"} />
                ))}
            </div>
        </div>
    );
}

