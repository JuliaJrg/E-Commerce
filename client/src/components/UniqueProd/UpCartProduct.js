import React, { useState } from "react";
import JWT_Decode from 'jwt-decode'
import { BsFillCartPlusFill } from 'react-icons/bs'

async function UpInCart(product_id, number_product) {
    let user_id = JWT_Decode(localStorage.getItem('token')).userInfo.id

    const upProdInCart = await fetch("http://localhost:4242/cart", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "authorization": user_id
        },
        body: JSON.stringify({
            product_id: parseInt(product_id),
            number_product: parseInt(number_product)
        })
    })
    if (upProdInCart.ok) {
        console.log("Your products is in cart !")
    } else {
        console.log("Your products isn't in cart.")
    }
}

function UpCartProduct(props) {

    const [nbr_prod, setNbrProd] = useState(1)
    const [alertMsg, setAlertMsg] = useState("")
    const [color, setColor] =useState("")

    const handleSubmitUpCart = (e) => {
        e.preventDefault()
        if (checkStocks(props, nbr_prod)) {
            UpInCart(props.product_id, nbr_prod)
        }
    }

    const arraySelect = [1, 2, 3, 4, 5]

    function checkStocks(props, nbr_prod) {
        if (props.stocks >= nbr_prod) {
            setAlertMsg("Produit ajouté à votre panier")
            setColor("limegreen")
            return true
        } else {
            setAlertMsg("Stock insuffisant")
            setColor("red")
        }
    }

    return (
        <div className="form-up-cart-product">
            <div className="alert-msg" style={{color: color}}>
                {alertMsg != "" ?

                    <h4 className="succes-msg">{alertMsg}</h4>
                    :
                    <></>
                }
            </div>
            <div className="buy-container">
                <div className="quantity">
                    <select className="select-quantity" onChange={(e) => setNbrProd(e.target.value)}>
                        <option className="select-options">Quantité</option>
                        {arraySelect.map((selectValue) => {
                            return (
                                <option className="select-options" value={selectValue}>{selectValue}</option>
                            )
                        })}
                    </select>
                </div>
                <BsFillCartPlusFill onClick={handleSubmitUpCart} />
            </div>
        </div>
    )
}

export default UpCartProduct
