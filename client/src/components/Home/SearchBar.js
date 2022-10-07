import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

function SearchBar() {
    const BarStyling = { width: "100%", border: "none", padding: "0.5rem" };
    const [productList, setProductList] = useState([])
    const [filteredProduct, setFilteredProduct] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:4242/product/', { method: "get" })
            if (response.ok) {
                var data = await response.json()
                setProductList(data)
            }
        }
        getData()
    }, [])

    const updateInput = (e) => {

        e.preventDefault()
        let keyword = e.target.value
        const filtered = productList.filter(products => {
            return products.name.toLowerCase().includes(keyword.toLowerCase())
        })

        if (keyword == "") {
            setFilteredProduct([])
        } else {
            setFilteredProduct(filtered)
        }
    }

    return (
        <div className="searchbar">
            <input style={BarStyling} placeholder="Produit recherché ..." onChange={updateInput} />
            <div className='product-search-list'>
                <ul>
                    {filteredProduct.map((product) => {
                        return (
                            <Link to={{ pathname: `/description/${product.id}` }} state={{ product_id: product.id }} className='link' >
                                <li>
                                    <img src={product.img} alt="image of produt" className="img-search-bar" />
                                    <p>{product.name}</p>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar
