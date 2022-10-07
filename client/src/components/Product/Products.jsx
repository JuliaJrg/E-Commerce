import React from 'react'
import { useState, useEffect } from 'react'
import CardProduct from './CardProduct'
import Filter from './Filter.js'

const Products = (props) => {
    const [products, setProducts] = useState([])
    // const [cat, setCat] = useState(null)

    function getPrice(products) {
        var price = 0
        products.forEach((elem) => {
            if (props.tempCart.includes(elem.id)) {
                price = price + elem.price
            }
        })
        if (price != 0) {
            return (
                <h1>Prix total: {price} €</h1>
            )
        }
    }

    function compatibility(product, products) {
        var toReturn = ""
        products.forEach((elem) => {
            if (props.tempCart.includes(elem.id)) {
                Object.keys(elem.compatibility).forEach((key) => {
                    if (typeof product.compatibility === 'string' || product.compatibility instanceof String) {
                        product.compatibility = JSON.parse(product.compatibility)
                    }
                    if (product.name != elem.name) {

                        // console.log(product.name + ' -- ' + product.category + '  <=======>  ' + elem.name + ' -- ' + elem.category)
                        // console.log(product.compatibility[key] + " <===================> " + elem.compatibility[key]);
                        if (!product.compatibility[key] || product.compatibility[key] == elem.compatibility[key] || product.compatibility[key] == "all" || elem.compatibility[key] == "all") {
                            toReturn = <CardProduct link={'NO'} removeFromCart={props.removeFromCart} compatibility={'NO'} type={'recap'} product={product} />
                        } else {
                            toReturn = <CardProduct link={'NO'} compatibility={'error'} type={'recap'} product={product} />
    
                        }
                    }
                })
            }
        })
        return (
            toReturn
        )
    }

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetch('http://localhost:4242/product', { method: "get" });
            if (data.ok) {
                var ans = await data.json()
                if (props.hasCart == true) {
                    var cartList = []
                    ans.forEach(elem => {
                        var inCart = false;
                        props.cart.forEach(e => {
                            if (elem.id == e) {
                                inCart = true
                            }
                        })
                        if (inCart == true) {
                            cartList.push(elem)
                        }
                    });
                    setProducts(cartList)
                } else {
                    setProducts(ans)
                }
            }
        }
        getProducts();
    }, []);
    
    if (props.type == 'configurateur') { // AFFICHE LES PRODUITS DANS LE CONFIGURATEUR
        return (
            <main className='select-section'>
                <div className='select-container'>
                    {products.map((product) => {
                        if (product.category_id === parseInt(props.category)) {
                            return (
                                <div className='select-content'>
                                    <CardProduct setCurrentCart={props.setCurrentCart} link={'NO'} product={product} />
                               </div>
                            )
                        }
                    })}
                </div>
            </main>
        )
    } else if (props.type == 'recap') { // AFFICHE LES PRODUITS RÉCAPITULATIF DANS LE CONFIGURATEUR
        return (
            <main className='recap-section'>
                <div className='recap-container'>
                    {products.map((product) => {
                        if (props.tempCart.includes(product.id)) {
                            return (
                                <div className='recap-content'>
                                    {compatibility(product, products)}
                                </div>
                            )
                        }
                    })}
                </div>
                <div className='total-config'>
                    {getPrice(products)}
                </div>
            </main>
        )
    } else if (props.category) { // AFFICHE LES PRODUITS EN FONCTION DE LA CATEGORIE
        // console.log('category is ' + props.category)
        // console.log('category to see is ' + category)
        return (
            <main className=''>
                <Filter />
                {products.map((product) => {
                    // console.log(props)
                    if (product.category_id === parseInt(props.category)) {
                        return (
                            <CardProduct product={product} />
                        )
                    }
                })}
            </main>
        )
    } else {  // AFFICHE LES PRODUITS
        return (
            <main className='product-section'>
                <Filter />
                {products.map((product) => {
                    return (
                        <CardProduct product={product} />
                    )
                })}
            </main>
        )
    }
}

export default Products
