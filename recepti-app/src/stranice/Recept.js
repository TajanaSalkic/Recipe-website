
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../stilovi/recept.css"

export default function Recept(){
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [crossedIngredients, setCrossedIngredients] = useState([]);


    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                setRecipe(data.meals[0]);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div></div>;
    }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            ingredients.push({
                measure: recipe[`strMeasure${i}`],
                ingredient: recipe[`strIngredient${i}`].toLowerCase(),
            });
        }
    }

    const ingredientsCount = ingredients.length;
    const ingredientsFirstHalf = ingredients.slice(0, Math.ceil(ingredientsCount / 2));
    const ingredientsSecondHalf = ingredients.slice(Math.ceil(ingredientsCount / 2));

    const renderIngredientsColumn = (ingredients) => (
        <>
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
                       { /*<label htmlFor={`ingredient-${index}`}>
                            {ingredient.measure} {ingredient.ingredient}
                        </label>*/}
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
        </div></>
    );

    const renderIngredientsColumns = (ingredientsFirst, ingredientsSecond) => (
       <>
        <div className="col2 sastojci">
            <div className="column1">
                <ul>
                    {ingredientsFirst.map((ingredient, index) => (
                        <div className="ingredient" id={`ingredient-${index}`} key={index}>
                            <input
    className="check"
    type="checkbox"
    id={`ingredient-${index}-1`} // Use a unique id for the checkbox
    onChange={() => toggleIngredient(index)}
/>
<label
    htmlFor={`ingredient-${index}-1`} // Match the id of the checkbox
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
                        <div className="ingredient" id={`ingredient-${index + ingredientsFirst.length}`} key={index}>
                           <input
    className="check"
    type="checkbox"
    id={`ingredient-${index + ingredientsFirst.length}-2`} // Use a unique id for the checkbox
    onChange={() => toggleIngredient(index + ingredientsFirst.length)}
/>
<label
    htmlFor={`ingredient-${index + ingredientsFirst.length}-2`} // Match the id of the checkbox
    className={crossedIngredients.includes(index + ingredientsFirst.length) ? "crossed" : ""}
>
    {ingredient.measure} {ingredient.ingredient}
</label>


                        </div>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
    

    /*const toggleIngredient = (index) => {
        const label = document.querySelector(`#ingredient-${index} label`);
        if (label) {
            label.classList.toggle('crossed');
        }
    };*/

    const toggleIngredient = (index) => {
        const updatedIngredients = [...crossedIngredients];
        if (updatedIngredients.includes(index)) {
            updatedIngredients.splice(updatedIngredients.indexOf(index), 1);
        } else {
            updatedIngredients.push(index);
        }
        setCrossedIngredients(updatedIngredients);
    };


    const getYouTubeId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match && match[1];
    };

    return (
        <div className="recipe-page">
            <div className="naziv-recepta">
                <h1>{recipe.strMeal}</h1>
                <div className="porijeklo">{recipe.strArea} food</div>
            </div>

            <div className="citat">
                <p>Kuhanje je putovanje, a recepti su vaša karta. Krenite na kulinarsku avanturu s nama i otkrijte nove svjetove okusa. </p>
            </div>
            
            <div className="columns">
    <div className="col2 slika">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
    </div>
    {ingredientsCount > 10 && (
        <>
            {renderIngredientsColumns(ingredientsFirstHalf, ingredientsSecondHalf)}
        </>
    )}
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
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
};



