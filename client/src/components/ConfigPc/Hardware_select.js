import arrow from '../../assets/arrow.png';
import Hardware_recap from './Hardware_recap';
import { useState, useEffect } from 'react'
import Selector from './Selector';
import countryList from 'react-select-country-list'
import Products from '../Product/Products';

function Hardware_select() {
    const [selection, setSelection] = useState("none")
    const [cat, setCat] = useState([])
    const [currentCart, setCurrentCart] = useState([])
    const [recap, setRecap] = useState([<Products type={'recap'} removeFromCart={removeFromCart} tempCart={currentCart} />])
    // console.log(currentCart)

    useEffect(() => {

        const getCat = async () => {
            const data = await fetch('http://localhost:4242/product/category', { method: "get" });
            if (data.ok) {
                var ans = await data.json()
                setCat(ans)
            }
        }
        getCat();
    }, []);

    function changeCart(e) {
        var temp = currentCart
        var double = false

        temp.forEach(elem => {
            if (elem == e.currentTarget.parentNode.lastChild.value) {
                double = true;
            }
        });

        if (double != true) {
            temp.push(parseInt(e.currentTarget.parentNode.lastChild.value))
            setCurrentCart(temp)

            setRecap(<Products type={'recap'} link={'NO'} removeFromCart={removeFromCart} tempCart={currentCart} />)
        }
    }

    function removeFromCart(e) {
        var temp = currentCart
        var double = false
        temp.forEach(elem => {
            if (elem == e.currentTarget.parentNode.lastChild.value) {
                double = true;
            }
        });

        if (double == true) {
            temp.splice(temp.indexOf(parseInt(e.currentTarget.parentNode.lastChild.value)), 1)
            setCurrentCart(temp)

            setRecap(<Products type={'recap'} link={'NO'} removeFromCart={removeFromCart} tempCart={currentCart} />)
        }
    }

    function Selection(e) {
        setSelection(e.currentTarget.id)
    }

    return (
        <section class='config-pc-container'>
            <section class='hardware-select'>
                <h1 class='hardware-select-title'>Les Composants</h1>
                <div class='hardware-select-element'>
                    {cat.map((elem, key) => {
                        const option = [['mother_board', "Cartes mere", true],
                        ['processor', "Processeurs", true],
                        ['graphic_card', "Cartes graphique", true],
                        ['RAM', 'RAM', true],
                        ['cooling', "Refroidissements", true],
                        ['batterie', 'Alimentations', true],
                        ['storage', 'Stockages', true],
                        ['computer_case', "Boitiers", true],
                        ['mouse', "Souris", false],
                        ['keyboard', 'Claviers', false],
                        ['sound', 'Sons', false],
                        ['screen', 'Ecrans', false],
                        ['other', 'Autres', false],
                        ['pc', 'Pc pré-fait', false],
                        ['pc_portable', 'Pc portables', false]];

                        option.forEach(opt => {
                            if (opt[0] == elem.name) {

                                cat[key].fr = opt[1]
                                cat[key].disp = opt[2]
                            }
                        });
                        if (cat[key].disp == true) {
                            return (
                                <div class='hardware-choice' id={elem.id} onClick={Selection}>
                                    <p>{cat[key].fr}</p>
                                    <img src={arrow} />
                                </div>
                            )
                        }
                    })}
                </div>
            </section>
            {currentCart}
            <Products setCurrentCart={changeCart} cart={currentCart} category={selection} type={'configurateur'} />
            {recap}
        </section>
    );
}

export default Hardware_select;
