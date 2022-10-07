import { useState, useEffect } from "react";

function CheckPayment({ userProduct, totalPrice, setTotalPrice }) {
    useEffect(() => {
        if (totalPrice <= 0) {
            const getTotalPrice = async (userProduct) => {
                const product = userProduct.map(
                    (element) => element.product_id
                );
                const data = {
                    products: product,
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
                    const products = await productsResponse.json();
                    setTotalPrice(products.total);
                }
            };
            getTotalPrice(userProduct);
        }
    });
    return (
        <div className="checkout">
            <h2>Commande</h2>
            <p>Total: {totalPrice}€</p>
            {totalPrice > 0 && (
                <button className="btn">Procéder au paiement</button>
            )}
        </div>
    );
}

export default CheckPayment;
