
import { Link } from "react-router-dom";
import '../stilovi/recepti.css';
import { useParams } from 'react-router-dom';
export default function KarticaJelo({ getMeal }){
    const { email } = useParams();
    console.log(getMeal.data);
    return (
        <Link to={`/${email}/recipe/${getMeal.data.idMeal}`} style={{ textDecoration: 'none' }}>
            <div className="card">
                <img src={getMeal.data.strMealThumb} alt="meal"/>
                <div className="info">
                    <h2>{getMeal.data.strMeal}</h2>
                    <p>{getMeal.data.strArea} food</p>
                </div>
                
            </div>
        </Link>
    );
};
