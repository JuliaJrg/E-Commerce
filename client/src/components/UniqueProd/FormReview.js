import React, { useState } from "react"
import JWT_Decode from 'jwt-decode'
import ReactStars from "react-rating-stars-component";

async function upReview(product_id, comment, stars) {
    const token = localStorage.getItem('token');

    const upReviewInDB = await fetch("http://localhost:4242/reviews", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            authorization: token
        },
        body: JSON.stringify({
            product_id: parseInt(product_id),
            nbr_stars: parseInt(stars),
            comment: comment
        })
    })
    if (upReviewInDB.ok) {
        console.log("Your review is send, thanks for support !")
        window.location.reload()
    } else {
        console.log("Your review is not send, verify your comment.")
    }
}

function FormReview(product_id) {

    const [comment, setComment] = useState(null)
    const [stars, setStars] = useState(null)

    const handleSubmitReview = (e, comment, stars) => {
        e.preventDefault()
        upReview(product_id.product_id, comment, stars)
    }

    const ratingChanged = (newRating) => {
        console.log(newRating)
    }

    return (
        <div className="form-review">
            <form onSubmit={(e) => handleSubmitReview(e, comment, stars)}>
                <label>
                    Donnez votre avis sur ce produit :
                </label>
                <textarea cols="60" rows="5" placeholder="Votre commentaire ..." onChange={(e) => setComment(e.target.value)} />
                <ReactStars
                    size={24}
                    count={5}
                    color="#0466c8"
                    activeColor="#48cae4"
                    onChange={newValue => {
                        setStars(`${newValue}`)
                    }}
                />
                <button className="btn submit-btn" type="submit" value="Envoyer">Envoyer</button>
            </form>
        </div>
    )
}

export default FormReview
