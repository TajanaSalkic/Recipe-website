
import { useState, useEffect } from "react";
import '../../stilovi/recepti.css';
import KarticaJeloUser from "./KarticaJeloUser.js";

export default function Jelo() {
    const [search, setSearch] = useState(""); // Definisanje state-a za unos pretrage
    const [Mymeal, setMeal] = useState(null); // Definisanje state-a za rezultate pretrage jela
    const [searchPerformed, setSearchPerformed] = useState(false); // Definisanje state-a koji prati da li je pretraga izvršena
    const [randomMeals, setRandomMeals] = useState([]); // Definisanje state-a za nasumično odabrana jela

    useEffect(() => {
        // Funkcija za dohvaćanje nasumičnih recepata
        const fetchRecipes = async () => {
            const recipes = []; // Inicijalizacija prazne liste za recepte
            for (let i = 0; i < 6; i++) { 
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php"); // Dohvaćanje nasumičnog recepta preko API-ja
                const data = await response.json(); // Parsiranje odgovora u JSON
                recipes.push(data.meals[0]); // Dodavanje dobijenog recepta u listu recepata
            }
            setRandomMeals(recipes); // Postavljanje state-a za nasumične recepte
        };

        fetchRecipes(); 
    }, []); // Prazan niz kao drugi argument znači da će se useEffect pokrenuti samo jednom prilikom mountovanja komponente
 
    // Funkcija za pretragu jela
    const searchMeal = (evt) => {
        if (evt.key === "Enter") { // Provjera da li je pritisnut Enter
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`) // Dohvaćanje jela na osnovu pretrage
                .then(res => res.json()) // Parsiranje odgovora u JSON
                .then(data => {
                    setMeal(data.meals); // Postavljanje rezultata pretrage u state
                    setSearch(""); // Resetovanje input polja za pretragu
                    setSearchPerformed(true); // Postavljanje flag-a da je pretraga izvršena
                });
        }
    };

    return (
        <>
            <div className="main">
                <div className="heading">
                    <h1>Pronađite Savršen Recept za Svaki Obrok</h1> 
                    <h4>Svaki recept je priča, a svaka priča počinje s ljubavlju prema hrani. Krenimo zajedno na putovanje okusa!</h4>
                </div>
                <div className="searchBox">
                    <input 
                        type="search" 
                        className="search-bar" 
                        onChange={(e) => setSearch(e.target.value)} // Ažuriranje state-a pri promjeni vrijednosti u input polju
                        value={search} // Vezivanje vrijednosti input polja za state
                        onKeyPress={searchMeal} // Pokretanje pretrage na pritisak Entera
                    />
                </div>
                <div className="contain">
                    {searchPerformed ? ( // Provjera da li je pretraga izvršena
                        Mymeal == null ? ( // Ako nema rezultata pretrage, prikaz poruke
                            <p className="notSearch">Not found</p>
                        ) : (
                            // Ako ima rezultata pretrage, prikaz rezultata pomoću komponente KarticaJeloUser
                            Mymeal.map((res, index) => (
                                <KarticaJeloUser key={index} getMeal={{ data: res }} />
                            ))
                        )
                    ) : (
                        // Ako pretraga nije izvršena, prikaz nasumičnih jela pomoću komponente KarticaJeloUser
                        randomMeals.map((res, index) => (
                            <KarticaJeloUser key={index} getMeal={{ data: res }} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
