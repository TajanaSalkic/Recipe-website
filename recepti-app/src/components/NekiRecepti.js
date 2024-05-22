

import React, { useState, useEffect } from 'react';
import KarticaJelo from "./KarticaJelo";
import "../stilovi/nekiRecepti.css"

export default function NekiRecepti() {
    const [randomRecipes, setRandomRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = [];
            for (let i = 0; i < 6; i++) {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                const data = await response.json();
                recipes.push(data.meals[0]); 
            }
            setRandomRecipes(recipes);
        };

        fetchRecipes();
    }, []);

    console.log('Random recipes:', randomRecipes);

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
                    <KarticaJelo key={recipe.idMeal} getMeal={{ data: recipe }} />
                ))}
            </div>
        </div>
    );
}
