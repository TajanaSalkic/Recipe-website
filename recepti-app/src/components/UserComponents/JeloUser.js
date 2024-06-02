
import { useState, useEffect } from "react";
import '../../stilovi/recepti.css';
import KarticaJeloUser from "./KarticaJeloUser.js";

export default function Jelo() {
    const [search, setSearch] = useState("");
    const [Mymeal, setMeal] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [randomMeals, setRandomMeals] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = [];
            for (let i = 0; i < 6; i++) {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
                const data = await response.json();
                recipes.push(data.meals[0]); 
            }
            setRandomMeals(recipes);
        };

        fetchRecipes();
    }, []);
 
    const searchMeal = (evt) => {
        if (evt.key === "Enter") {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
                .then(res => res.json())
                .then(data => {
                    setMeal(data.meals);
                    setSearch("");
                    setSearchPerformed(true);
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
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search} 
                        onKeyPress={searchMeal} 
                    />
                </div>
                <div className="contain">
                    {searchPerformed ? (
                        Mymeal == null ? (
                            <p className="notSearch">Not found</p>
                        ) : (
                            Mymeal.map((res, index) => (
                                <KarticaJeloUser key={index} getMeal={{ data: res }} />
                            ))
                        )
                    ) : (
                        randomMeals.map((res, index) => (
                            <KarticaJeloUser key={index} getMeal={{ data: res }} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
