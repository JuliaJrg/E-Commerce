import "../styles/Filter.css";
import { useState } from "react";
// import arrow from './arrow.png';

function Filter() {
    const [category, setCategory] = useState("none");
    const [orderPrice, setOrderPrice] = useState("DESC");
    const [brand, setBrand] = useState("0");
    const [brandList, setBrandList] = useState("<div></div>");

    function sortByPrice(e) {
        setOrderPrice(e.currentTarget.value);
    }

    function changeCat(e) {
        let temp = [];
        setCategory(e.currentTarget.value);
        const brandArr = [
            ["motherboard", "ASUS", "MSI"],
            ["CPU", "INTEL", "RADEON"],
        ];
        brandArr.forEach((element) => {
            console.log(element);
            if (element[0] === category) {
                element.forEach((elem) => {
                    if (elem !== category) {
                        temp.push(elem);
                    }
                });
            }
        });
        setBrandList(temp);
        console.log(temp);
    }

    function changeBrand(e) {
        setBrand(e.currentTarget.value);
    }

    return (
        <section className="Filter_container">
            <h1>Recherche avancée</h1>
            <div class="Filter_section">
                <p>Type de produit</p>
                <div class="Filter_selector">
                    <select onChange={changeCat}>
                        <option value="motherboard">Carte mère</option>
                        <option value="CPU">Processeur</option>
                        <option value="GPU">Carte graphique</option>
                        <option value="RAM">RAM</option>
                        <option value="cooling">Refroidissement</option>
                        <option value="power">Alimentation</option>
                        <option value="memory">Mémoire</option>
                        <option value="case">Boitier</option>
                    </select>
                </div>
            </div>
            <div class="Filter_section">
                <p>Trier par :</p>
                <div class="Filter_selector">
                    <select onChange={sortByPrice}>
                        <option value="ASC">Prix Croissant</option>
                        <option value="DESC">Prix Décroissant</option>
                    </select>
                </div>
            </div>
            {category !== "none" && (
                <div class="Filter_section">
                    <p>Marque :</p>
                    <div class="Filter_selector">
                        <select onChange={changeBrand}>
                            {brandList.map((e) => {
                                return <option value={e}>{e}</option>;
                            })}
                        </select>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Filter;
