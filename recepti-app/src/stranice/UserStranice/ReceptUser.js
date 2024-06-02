import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarUser from "../../components/UserComponents/NavbarUser";
import "../../stilovi/recept.css";

export default function ReceptUser() {
    const { id, email } = useParams(); // Dohvatanje ID-ja recepta i emaila korisnika iz URL-a
    const [recipe, setRecipe] = useState(null); // Stanje za recept koji će se prikazati
    const [crossedIngredients, setCrossedIngredients] = useState([]); // Stanje za označene sastojke
    const [isFavorite, setIsFavorite] = useState(false); // Stanje za provjeru da li je recept omiljeni

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                setRecipe(data.meals[0]); // Postavljanje recepta iz odgovora API-ja
                checkIfFavorite(data.meals[0]); // Provjera da li je recept omiljeni
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    const checkIfFavorite = async (recipe) => {
        const favoritesRef = collection(db, 'favorites');
        const userRef = doc(favoritesRef, email);

        try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const recipes = docSnap.data().recipes || [];
                if (recipes.find((favorite) => favorite.idMeal === recipe.idMeal)) {
                    setIsFavorite(true); // Postavljanje da je recept omiljeni ako postoji u listi omiljenih
                }
            }
        } catch (error) {
            console.error("Error checking favorite recipe:", error);
        }
    };

    //funkcija za dodavanje 

    const handleAddToFavorites = async () => {
        // Definisanje referenci za kolekciju omiljenih recepata i dokument korisnika
        const favoritesRef = collection(db, 'favorites');
        const userRef = doc(favoritesRef, email);
    
        try {
            // Dohvatanje dokumenta korisnika iz baze podataka
            const docSnap = await getDoc(userRef);
            let recipes = [];
            // Provjera da li dokument korisnika postoji
            if (docSnap.exists()) {
                // Dohvatanje postojećih omiljenih recepata korisnika, ili prazan niz ako ne postoje
                recipes = docSnap.data().recipes || [];
            }
    
            // Dodavanje novog recepta u listu omiljenih ako već nije dodan
            if (!recipes.find((favorite) => favorite.idMeal === recipe.idMeal)) {
                recipes.push({
                    idMeal: recipe.idMeal,
                    strMeal: recipe.strMeal,
                    strMealThumb: recipe.strMealThumb,
                    strArea: recipe.strArea,
                });
    
                // Ažuriranje dokumenta korisnika sa novom listom omiljenih recepata
                await setDoc(userRef, { recipes });
                setIsFavorite(true); // Postavljanje da je recept omiljeni
            }
        } catch (error) {
            console.error("Error adding favorite recipe", error);
        }
    };
    

    if (!recipe) {
        return <div></div>; // Vraćanje praznog div-a ako recept nije učitan
    }
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        // Iteriranje kroz sastojke i mjere recepata, dodavanje u niz ingredients
        if (recipe[`strIngredient${i}`]) {
            ingredients.push({
                measure: recipe[`strMeasure${i}`],
                ingredient: recipe[`strIngredient${i}`].toLowerCase(),
            });
        }
    }

   const ingredientsCount = ingredients.length; // Broj sastojaka
const ingredientsFirstHalf = ingredients.slice(0, Math.ceil(ingredientsCount / 2)); // Prva polovina sastojaka
const ingredientsSecondHalf = ingredients.slice(Math.ceil(ingredientsCount / 2)); // Druga polovina sastojaka


const renderIngredientsColumn = (ingredients) => (
    // Renderovanje jedne kolone sastojaka
    <div className="col3 sastojci">
     <div className="column3">
            <ul>
                {ingredients.map((ingredient, index) => (
                    <div className="ingredient" key={index}>
                        <input
                            className="check"
                            type="checkbox"
                            id={`ingredient-${index}`}
                            onChange={() => toggleIngredient(index)}
                        />
                        <label
                            htmlFor={`ingredient-${index}`}
                            className={crossedIngredients.includes(index) ? "crossed" : ""}
                        >
                            {ingredient.measure} {ingredient.ingredient}
                        </label>
                    </div>
                ))}
            </ul>

        </div>
    </div>
);

    const renderIngredientsColumns = (ingredientsFirst, ingredientsSecond) => (
       //rendovanje dvije kolone
        <div className="col2 sastojci">
            <div className="column1">
                <ul>
                    {ingredientsFirst.map((ingredient, index) => (
                        <div className="ingredient" key={index}>
                            <input
     className="check"
     type="checkbox"
     id={`ingredient-${index}-1`}
     onChange={() => toggleIngredient(index)}
 />
 <label
     htmlFor={`ingredient-${index}-1`}
     className={crossedIngredients.includes(index) ? "crossed" : ""}
 >
     {ingredient.measure} {ingredient.ingredient}
 </label>

                        </div>
                    ))}
                </ul>
            </div>
            <div className="column2">
                <ul>
                    {ingredientsSecond.map((ingredient, index) => (
                        <div className="ingredient" key={index + ingredientsFirst.length}>
                        <input
                            className="check"
                            type="checkbox"
                            id={`ingredient-${index + ingredientsFirst.length}-2`}
                            onChange={() => toggleIngredient(index + ingredientsFirst.length)}
                        />
                        <label
                            htmlFor={`ingredient-${index + ingredientsFirst.length}-2`}
                            className={crossedIngredients.includes(index + ingredientsFirst.length) ? "crossed" : ""}
                        >
                            {ingredient.measure} {ingredient.ingredient}
                        </label>


                        </div>
                    ))}
                </ul>
            </div>
        </div>
        
    );
    

// funkcija za označavanje sastojaka
const toggleIngredient = (index) => {
    // Funkcija za dodavanje ili uklanjanje indeksa sastojka iz niza označenih sastojaka
    const updatedIngredients = [...crossedIngredients];
    if (updatedIngredients.includes(index)) {
        updatedIngredients.splice(updatedIngredients.indexOf(index), 1); // Uklanja indeks ako već postoji u nizu
    } else {
        updatedIngredients.push(index); // Dodaje indeks ako ne postoji u nizu
    }
    setCrossedIngredients(updatedIngredients); // Ažurira stanje sa novim nizom označenih sastojaka
};

const getYouTubeId = (url) => {
    // Funkcija za dobijanje YouTube ID-a iz URL-a
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match && match[1]; // Vraća YouTube ID ako postoji u URL-u
};


    return (
        
        <>
            <NavbarUser />
            <div className="recipe-page">
                <div className="naziv-recepta">
                    <h1>{recipe.strMeal}</h1>
                    <div className="porijeklo">{recipe.strArea} food</div>
                    {!isFavorite && <button className="dugme" onClick={handleAddToFavorites}>Dodaj u Omiljeno</button>}
                    {isFavorite && <p>Dodano u Omiljeno</p>}
                </div>

                <div className="citat">
                    <p>Kuhanje je putovanje, a recepti su vaša karta. Krenite na kulinarsku avanturu s nama i otkrijte nove svjetove okusa. </p>
                </div>

                <div className="columns">
                    <div className="col2 slika">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    </div>
                    {ingredientsCount > 10 && renderIngredientsColumns(ingredientsFirstHalf, ingredientsSecondHalf)}
                    {ingredientsCount <= 10 && renderIngredientsColumn(ingredients)}
                </div>

                <div className="recept">
                    <h2>Recipe</h2>
                    <p>{recipe.strInstructions}</p>
                </div>

                <div className="video">
                    <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(recipe.strYoutube)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        
        </>
    );
}



