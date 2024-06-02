

import React, { useState, useEffect } from 'react';
import KarticaJelo from "./KarticaJelo";
import "../stilovi/nekiRecepti.css"

export default function NekiRecepti() {
    const [randomRecipes, setRandomRecipes] = useState([]); // Definisanje state-a za nasumične recepte

    useEffect(() => { // Hook za efekat pri montiranju komponente
        const fetchRecipes = async () => { // Asinhrona funkcija za dohvatanje recepata
            const recipes = []; // Kreiranje praznog niza za recepte
            for (let i = 0; i < 6; i++) { 
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php"); // Fetch zahtjev za nasumičan recept
                const data = await response.json(); // Parsiranje odgovora u JSON formatu
                recipes.push(data.meals[0]); // Dodavanje recepta u niz
            }
            setRandomRecipes(recipes); // Postavljanje state-a sa dobijenim receptima
        };

        fetchRecipes(); 
    }, []); // Prazan niz zavisnosti znači da će efekat biti pokrenut samo jednom pri montiranju komponente

    console.log('Random recipes:', randomRecipes); // Ispis nasumičnih recepata u konzolu

    return (
        <div className="section nrecepti">
            <div className="tekst">Nasumično Odabrani Recepti</div> 
            <div className="tekst-uvod"> 
                <div className="text-item"></div>
                Nemate ideju što biste kuhali? Pogledajte naše nasumično odabrane recepte i pustite se da vas inspiracija ponese. 
                Svaki put kad posjetite našu stranicu, dočekat će vas nova selekcija recepata koji će vas motivirati da isprobate nešto novo.
            </div>
            <div className="recipes"> 
                {randomRecipes.map(recipe => ( // Mapiranje niza recepata u KarticaJelo komponente
                    <KarticaJelo key={recipe.idMeal} getMeal={{ data: recipe }} /> // Prikaz pojedinačnog recepta
                ))}
            </div>
        </div>
    );
}
