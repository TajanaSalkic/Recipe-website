

import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavbarUser from '../components/NavbarUser';
import { useParams } from 'react-router-dom';

const Omiljeni = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const { email } = useParams(); 

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem(`favorites_${email}`)) || [];
        setFavoriteRecipes(favorites);
    }, [email]);

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favoriteRecipes.filter(recipe => recipe.idMeal !== idMeal);
        setFavoriteRecipes(updatedFavorites);
        localStorage.setItem(`favorites_${email}`, JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <NavbarUser/>
            <h1>Favorite Recipes</h1>
            {favoriteRecipes.map((recipe) => (
                <div key={recipe.idMeal} className="card">
                    <Link to={`/${email}/recipe/${recipe.idMeal}`} style={{ textDecoration: 'none' }}>
                        <img src={recipe.strMealThumb} alt="meal" />
                        <div className="info">
                            <h2>{recipe.strMeal}</h2>
                            <p>{recipe.strArea} food</p>
                        </div>
                    </Link>
                    <button className="dugme" onClick={() => removeFromFavorites(recipe.idMeal)}>Remove from Favorites</button>
                </div>
            ))}
        </div>
    );
};

export default Omiljeni;
