import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavbarUser from '../../components/UserComponents/NavbarUser';
import '../../stilovi/omiljeni.css';

const Omiljeni = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]); // State za omiljene recepte
    const { email } = useParams(); // Dobijanje email parametra iz URL-a
    const favoritesRef = collection(db, 'favorites'); // Referenca na kolekciju omiljenih recepata
    const userRef = doc(favoritesRef, email); // Referenca na dokument korisnika

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docSnap = await getDoc(userRef); // Dohvatanje dokumenta iz Firestore baze
                if (docSnap.exists()) {
                    setFavoriteRecipes(docSnap.data().recipes || []); // Postavljanje omiljenih recepata iz dokumenta
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
            await setDoc(userRef, { recipes: favoriteRecipes.filter(recipe => recipe.idMeal !== idMeal) }); // Uklanjanje recepta iz omiljenih recepata u Firestore bazi
            setFavoriteRecipes(prevFavorites => prevFavorites.filter(recipe => recipe.idMeal !== idMeal)); // Ažuriranje stanja omiljenih recepata
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
                        <Link to={`/${email}/recipe/${recipe.idMeal}`} style={{ textDecoration: 'none' }}> {/* Link ka detaljima recepta */}
                            <img src={recipe.strMealThumb} alt="meal" /> 
                            <div className="info">
                                <h2>{recipe.strMeal}</h2> 
                                <p>{recipe.strArea} food</p> 
                            </div>
                        </Link>
                        <button className="dugme" onClick={() => removeFromFavorites(recipe.idMeal)}>Ukloni</button> {/* Dugme za uklanjanje recepta iz omiljenih */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Omiljeni;