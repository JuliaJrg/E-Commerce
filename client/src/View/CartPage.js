import React, { useState, useEffect } from "react";
import Cart from "../components/Cart/Cart";
import CheckPayment from "../components/Cart/CheckPayment";
import jwtDecode from "jwt-decode";

const CartPage = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [userProduct, setUserProduct] = useState([]);
    const [selectedAdress, setSelectedAdress] = useState(null);

    useEffect(() => {
        const getUserInfo = async (token) => {
            const userResponse = await fetch(`http://localhost:4242/cart`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    authorization: jwtDecode(token).userInfo.id,
                },
            });
            if (userResponse.ok) {
                const jsonUserResponse = await userResponse.json();
                if (jsonUserResponse !== undefined) {
                    setUserProduct(jsonUserResponse);
                }
            }
        };
        if (
            localStorage.getItem("token") != undefined ||
            localStorage.getItem("token") != null
        ) {
            getUserInfo(localStorage.getItem("token"));
        }
    }, []);

    return (
        <div className="cart">
            {userProduct && (
                <Cart userProduct={userProduct} setTotalPrice={setTotalPrice} />
            )}
            {userProduct && (
                <CheckPayment
                    userProduct={userProduct}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                />
            )}
        </div>
    );
};

export default CartPage;