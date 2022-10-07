import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CardProduct from './CardProduct'
import Filter from './Filter'

const AllProduct = () => {
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [filter_category, setFilter_category] = useState(undefined)
    const [filter_price, setFilter_price] = useState(undefined)

    useEffect(() => {
        const getProducts = async () => {

            const options = [
                ['mother_board', "Cartes mere"],
                ['processor', "Processeurs"],
                ['graphic_card', "Cartes graphique"],
                ['RAM', 'RAM'],
                ['cooling', "Refroidissements"],
                ['batterie', 'Alimentations'],
                ['storage', 'Stockages'],
                ['computer_case', "Boitiers"],
                ['mouse', "Souris"],
                ['keyboard', 'Claviers'],
                ['sound', 'Sons'],
                ['screen', 'Ecrans'],
                ['other', 'Autres'],
                ['pc', 'Pc pré-fait'],
                ['pc_portable', 'Pc portables']
            ]

            let url = 'http://localhost:4242/product/'
            if (location.state !== null) {
                let url_decoded = decodeURI(location.pathname)
                let category = url_decoded.split('/')
                options.forEach(param => {
                    if (param[1].includes(category[2])) {
                        url += '?category=' + param[0]
                    }
                })
            }

            const response = await fetch(url, { method: "get" })
            if (response.ok) {
                var data = await response.json()
                setProducts(data)
            }
        }
        getProducts()
    }, {})
    var orderedProducts = undefined
    function sortByPrice(order) {
        
        let sortable = [];
        for (var product in products) {
            sortable.push([product, products[product]]);
        }
        sortable.sort(function(a, b) {
            if (order == 'DESC') {
                return b[1].price - a[1].price 
                
            } else {

                return a[1].price - b[1].price;
            }
        })
        return sortable;
    }

    if (filter_price != undefined) {
        if (filter_price == 'ASC') {
            orderedProducts = sortByPrice()
            var filtered = true;
        } else {
            orderedProducts = sortByPrice('DESC')
            var filtered = true;
        }
    } else {

    }

    if (filtered == true) {

        return (
            <main className='product-card-section'>
                <Filter setFilter_price={setFilter_price} setFilter_category={setFilter_category} product={products} />
                
                {orderedProducts.map((product) => {
                    if (product[1].product_category.name == filter_category || filter_category == undefined) {
                        return (
                            <div className='product-container'>
                                <CardProduct category={filter_category} product={product} />
                            </div>
                        )
                    }
                })}
            </main>
        )
    } else {

        return (
            <main className='product-card-section'>
                <Filter setFilter_price={setFilter_price} setFilter_category={setFilter_category} product={products} />
                
                {products.map((product) => {
                    if (product.product_category.name == filter_category || filter_category == undefined) {
                        return (
                            <div className='product-container'>
                                <CardProduct category={filter_category} product={product} />
                            </div>
                        )
                    }
                })}
            </main>
        )
    }
}

export default AllProduct
