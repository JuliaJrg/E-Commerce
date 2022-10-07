import React, { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";

function Cart({ userProduct, setTotalPrice }) {
    const products = useRef([]);
    const [cartId, setCartId] = useState(null);
    let productNumber = null;
    let productId = null;
    if (userProduct) {
        productNumber = userProduct.map((product) => product.number_product);
        productId = userProduct.map((product) => product.product_id);
    } else {
        productNumber = localStorage.getItem("productNumber").map((product) => product.number_product);
        productId = localStorage.getItem("productId").map((product) => product.product_id);
    }
    useEffect(() => {
        const getUserProduct = async (productId) => {
            const data = {
                products: productId,
            };

            const productsResponse = await fetch(
                "http://localhost:4242/product",
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (productsResponse.ok) {
                const productsJson = await productsResponse.json();
                products.current = productsJson.product;
            }
        };

        const getCartId = async () => {
            const cartResponse = await fetch("http://localhost:4242/cart", {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    authorization: jwtDecode(localStorage.getItem("token"))
                        .userInfo.id,
                },
            });

            if (cartResponse.ok) {
                const cartJson = await cartResponse.json();
                setCartId(cartJson);
            }
        };

        if (products.current.length === 0) {
            getUserProduct(productId);
        }

        if (!cartId) {
            getCartId();
        }
    });

    return (
        <div>
            {products.current.length > 0 && (
                <ListProduct
                    products={products.current}
                    productNumber={productNumber}
                    productId={productId}
                    cartId={cartId}
                    setTotalPrice={setTotalPrice}
                />
            )}
        </div>
    );
}

function ListProduct({
    products,
    productNumber,
    productId,
    cartId,
    setTotalPrice,
}) {
    const [numberProduct, setNumberProduct] = useState([]);
    let listElement = null;
    let cartsId = null;
    if (cartId) {
        cartsId = cartId.map((cart) => cart.id);
    }

    const handleChange = async (event, i) => {
        numberProduct[i] = event.target.value;
        const response = await fetch("http://localhost:4242/cart", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart_id: cartsId[i],
                number_product: numberProduct[i],
            }),
        });
        if (response.ok) {
            window.location.reload();
        }
    };
    const handleDelete = async (i) => {
        const data = {
            id: cartsId[i],
        };
        const deleteResponse = await fetch("http://localhost:4242/cart", {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (deleteResponse.ok) {
            window.location.reload();
        }
    };
    if (products) {
        let totalPrice = 0;
        listElement = products.map((product, i) => {
            totalPrice += product.price * productNumber[i];
            return (
                <div className="cart-product">
                    <div className="cart-product-img">
                        <img src={product.img} alt="product" />
                    </div>
                    <div className="cart-product-info">
                        <div className="cart-product-name">
                            <h6>Nom du produit : {product.name}</h6>
                        </div>
                        <div className="cart-number-product">
                            <select
                                onChange={(event) => handleChange(event, i)}
                                value={numberProduct[i]}
                            >
                                <option value="">
                                    Votre quantitée : {productNumber[i]}
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                {jwtDecode(localStorage.getItem("token"))
                                    .userInfo.roles === "pro" ? (
                                    <>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </>
                                ) : null}
                            </select>
                            <button
                                onClick={(event) => handleDelete(i)}
                                className="btn"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
        setTotalPrice(totalPrice);
    }

    return (
        <div className="product-section">
            {listElement ? (
                <>
                    <h2>Votre panier :</h2>
                    {listElement}
                </>
            ) : (
                <h4>Votre panier est actuellement vide.</h4>
            )}
        </div>
    );
}

export default Cart;