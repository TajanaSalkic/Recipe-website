/*import { Link } from "react-router-dom";
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function KarticaJeloUser({ getMeal }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { email } = useParams(); 

    const handleAddToFavorites = () => {
       
        const favorites = JSON.parse(localStorage.getItem(`favorites_${email}`)) || [];

       
        if (!favorites.find((recipe) => recipe.idMeal === getMeal.data.idMeal)) {
            favorites.push({
                idMeal: getMeal.data.idMeal,
                strMeal: getMeal.data.strMeal,
                strMealThumb: getMeal.data.strMealThumb,
                strArea: getMeal.data.strArea,
            });
            localStorage.setItem(`favorites_${email}`, JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    return (
        <div className="card">
            <Link to={`/${email}/recipe/${getMeal.data.idMeal}`} style={{ textDecoration: 'none' }}>
                <img src={getMeal.data.strMealThumb} alt="meal"/>
                <div className="info">
                    <h2>{getMeal.data.strMeal}</h2>
                    <p>{getMeal.data.strArea} food</p>
                </div>
            </Link>
            {!isFavorite && <button className="dugme" onClick={handleAddToFavorites}>Add to Favorites</button>}
            {isFavorite && <p>Added to Favorites</p>}
        </div>
    );
}
*/

import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../stranice/firebase-config';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function KarticaJeloUser({ getMeal }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { email } = useParams(); 

    const handleAddToFavorites = async () => {
        const favoritesRef = collection(db, 'favorites');
        const userRef = doc(favoritesRef, email);

        try {
            const docSnap = await getDoc(userRef);
            let recipes = [];
            if (docSnap.exists()) {
                recipes = docSnap.data().recipes || [];
            }

            if (!recipes.find((recipe) => recipe.idMeal === getMeal.data.idMeal)) {
                recipes.push({
                    idMeal: getMeal.data.idMeal,
                    strMeal: getMeal.data.strMeal,
                    strMealThumb: getMeal.data.strMealThumb,
                    strArea: getMeal.data.strArea,
                });

                await setDoc(userRef, { recipes });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error adding favorite recipe", error);
        }
    };

    return (
        <div className="card">
            <Link to={`/${email}/recipe/${getMeal.data.idMeal}`} style={{ textDecoration: 'none' }}>
                <img src={getMeal.data.strMealThumb} alt="meal"/>
                <div className="info">
                    <h2>{getMeal.data.strMeal}</h2>
                    <p>{getMeal.data.strArea} food</p>
                </div>
            </Link>
            {!isFavorite && <button className="dugme" onClick={handleAddToFavorites}>Add to Favorites</button>}
            {isFavorite && <p>Added to Favorites</p>}
        </div>
    );
}
