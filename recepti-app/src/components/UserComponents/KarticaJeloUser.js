import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../stranice/firebase-config';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function KarticaJeloUser({ getMeal }) {
    const [isFavorite, setIsFavorite] = useState(false); // Definisanje state-a za praćenje da li je jelo dodano u favorite
    const { email } = useParams(); // Dohvatanje email parametra iz URL-a

    // Funkcija za dodavanje jela u favorite
    const handleAddToFavorites = async () => {
        const favoritesRef = collection(db, 'favorites'); // Referenca na kolekciju 'favorites' u Firestore
        const userRef = doc(favoritesRef, email); // Referenca na dokument korisnika u kolekciji 'favorites'

        try {
            const docSnap = await getDoc(userRef); // Dohvatanje dokumenta korisnika
            let recipes = [];
            if (docSnap.exists()) { // Provjera da li dokument postoji
                recipes = docSnap.data().recipes || []; // Ako dokument postoji, dohvaćamo listu recepata
            }

            // Provjera da li recept već postoji u favoritima
            if (!recipes.find((recipe) => recipe.idMeal === getMeal.data.idMeal)) {
                // Dodavanje novog recepta u listu recepata
                recipes.push({
                    idMeal: getMeal.data.idMeal,
                    strMeal: getMeal.data.strMeal,
                    strMealThumb: getMeal.data.strMealThumb,
                    strArea: getMeal.data.strArea,
                });

                // Postavljanje ažuriranog dokumenta korisnika u Firestore
                await setDoc(userRef, { recipes });
                setIsFavorite(true); // Ažuriranje state-a da je jelo dodano u favorite
            }
        } catch (error) {
            console.error("Error adding favorite recipe", error); // Ispisivanje greške u konzolu ako dođe do problema
        }
    };

    return (
        <div className="card">
            {/* Link za navigaciju ka stranici sa detaljima o receptu */}
            <Link to={`/${email}/recipe/${getMeal.data.idMeal}`} style={{ textDecoration: 'none' }}>
                <img src={getMeal.data.strMealThumb} alt="meal"/> 
                <div className="info">
                    <h2>{getMeal.data.strMeal}</h2> 
                    <p>{getMeal.data.strArea} food</p>
                </div>
            </Link>
            {/* Prikaz dugmeta za dodavanje u favorite ili poruke da je jelo već dodano */}
            {!isFavorite && <button className="dugme" onClick={handleAddToFavorites}>Add to Favorites</button>}
            {isFavorite && <p>Added to Favorites</p>}
        </div>
    );
}