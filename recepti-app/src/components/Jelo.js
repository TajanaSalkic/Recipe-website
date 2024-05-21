import { useState } from "react";
import '../stilovi/style.css';
import KarticaJelo from "./KarticaJelo.js";

export default function Jelo() {
    const [search, setSearch] = useState("");
    const [Mymeal, setMeal] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);

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
                    <h1>Search Your Food Recipe</h1>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque tempore unde sed ducimus voluptates illum!</h4>
                </div>
                <div className="searchBox">
                    <input type="search" className="search-bar" onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchMeal} />
                </div>
                <div className="contain">
                    {
                        searchPerformed && (Mymeal == null) ? <p className="notSearch">Not found</p> :
                            Mymeal?.map((res) => {
                                return (
                                    <KarticaJelo getMeal={{ data: res }} />
                                )
                            })
                    }
                </div>
            </div>
        </>
    );
}
