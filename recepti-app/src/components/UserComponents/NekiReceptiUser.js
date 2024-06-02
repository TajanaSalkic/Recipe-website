import React, { useState, useEffect } from 'react';
import KarticaJeloUser from "./KarticaJeloUser";
import "../../stilovi/nekiRecepti.css"


export default function NekiReceptiUser() {
    const [randomRecipes, setRandomRecipes] = useState([]); // Definisanje state-a za nasumične recepte

    // Korištenje useEffect hook-a za dohvatanje nasumičnih recepata
    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = []; // Prazan niz za pohranu recepata
            for (let i = 0; i < 6; i++) {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php"); // Dohvatanje podataka s API-ja
                const data = await response.json(); // Pretvaranje odgovora u JSON format
                recipes.push(data.meals[0]); // Dodavanje nasumično odabranog recepta u niz
            }
            setRandomRecipes(recipes); // Ažuriranje state-a s nasumičnim receptima
        };

        fetchRecipes(); 
    }, []);

    console.log('Random recipes:', randomRecipes); // Ispisivanje nasumičnih recepata u konzolu

    return (
        <div className="section nrecepti">
            <div className="tekst">Nasumično Odabrani Recepti</div> 
            <div className="tekst-uvod">
                <div className="text-item"></div>
                Nemate ideju što biste kuhali? Pogledajte naše nasumično odabrane recepte i pustite se da vas inspiracija ponese. 
                Svaki put kad posjetite našu stranicu, dočekat će vas nova selekcija recepata koji će vas motivirati da isprobate nešto novo.
            </div>
            <div className="recipes">
                {randomRecipes.map(recipe => (
                    <KarticaJeloUser key={recipe.idMeal} getMeal={{ data: recipe }} /> // Prikazivanje svake kartice recepta
                ))}
            </div>
        </div>
    );
}