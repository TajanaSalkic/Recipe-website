
/*
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavbarUser from '../../components/UserComponents/NavbarUser';
import { useParams } from 'react-router-dom';
import '../../stilovi/omiljeni.css';

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
            <h1>Omiljeni recepti</h1>
            <div className="recipe-grid"> */
                /*{favoriteRecipes.map((recipe) => (
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
        </div>
    );
};

export default Omiljeni;*/
// Import the specific functions you need from the SDKs you need
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import NavbarUser from '../../components/UserComponents/NavbarUser';
import '../../stilovi/omiljeni.css';

const Omiljeni = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const { email } = useParams();
    const favoritesRef = collection(db, 'favorites');
    const userRef = doc(favoritesRef, email);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setFavoriteRecipes(docSnap.data().recipes || []);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.log('Error getting document:', error);
            }
        };

        fetchData();
    }, [email]);

    const removeFromFavorites = async (idMeal) => {
        try {
            await setDoc(userRef, { recipes: favoriteRecipes.filter(recipe => recipe.idMeal !== idMeal) });
            setFavoriteRecipes(prevFavorites => prevFavorites.filter(recipe => recipe.idMeal !== idMeal));
        } catch (error) {
            console.error("Error removing favorite recipe", error);
        }
    };

    return (
        <div>
            <NavbarUser/>
            <h1>Omiljeni recepti</h1>
            <div className="recipe-grid">
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
        </div>
    );
};

export default Omiljeni;
