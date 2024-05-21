

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
                recipes.push(data.meals[0]); // Only take the first meal from each response
            }
            setRandomRecipes(recipes);
        };

        fetchRecipes();
    }, []);

    console.log('Random recipes:', randomRecipes);

    return (
        <div className="section nrecepti">
            <div className="tekst">Lorem ipsum</div>
            <div className="recipes">
                {randomRecipes.map(recipe => (
                    <KarticaJelo key={recipe.idMeal} getMeal={{ data: recipe }} />
                ))}
            </div>
        </div>
    );
}
