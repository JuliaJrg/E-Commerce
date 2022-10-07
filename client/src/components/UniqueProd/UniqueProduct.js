import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import ReviewProduct from "./ProductReview";
import UpCartProduct from "./UpCartProduct";
import FormReview from "./FormReview";
import ReactStars from "react-rating-stars-component";

function UniqueProduct() {
    const location = useLocation()
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getProduct = async () => {
            let url = 'http://localhost:4242/product/'

            if (location.state !== null) {
                let url_decoded = decodeURI(location.pathname)
                let id_product = url_decoded.split('/')
                url += '?id=' + id_product[2]
            }

            const response = await fetch(url, { method: "get" })
            if (response.ok) {
                var data = await response.json()
                setProduct(data)
            }
        }

        if (product.length === 0) {
            getProduct()
        }
    }, [])

    let averageReview = -1

    function getAverageReview() {
        let totalReviewNotation = 0

        if (product[0].review_product.length <= 0) {
            return -1
        }

        product[0].review_product.forEach(review => {
            totalReviewNotation += review.nbr_stars
        })

        return totalReviewNotation / product[0].review_product.length
    }

    if (product.length > 0) {
        averageReview = getAverageReview()
    }

    function checkReview() {
        if (product[0].review_product.length !== 0) {
            return true
        }
    }

    function checkStock() {
        if (product[0].stocks > 0) {
            return true
        }
    }

    return (
        <div className="desc-container">
            {product.map((desc_prod) => {
                return (
                    <div className="desc-content">
                        <div className="card-unique-product">
                            <div className="desc-header">
                                <h1>{desc_prod.name}</h1>
                                <h4>{desc_prod.description}</h4>
                            </div>
                            <div className="desc-body">
                                <img src={desc_prod.img} alt="image of product" />
                                <div className="details-block">
                                    <p>{desc_prod.details}</p>
                                </div>
                                <div className="checkout-block">
                                    <h1>{desc_prod.price}€</h1>
                                    {averageReview >= 0 ?
                                        <ReactStars
                                            count={5}
                                            value={averageReview}
                                            size={24}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            color="#0466c8"
                                            activeColor="#48cae4"
                                            edit={false}
                                        />
                                        :
                                        <ReactStars
                                            count={5}
                                            value={0}
                                            size={24}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            color="#0466c8"
                                            activeColor="#48cae4"
                                            edit={false}
                                        />
                                    }
                                    {checkStock() == true ?
                                        <>
                                            <div className='up-cart-container'>
                                                <UpCartProduct product_id={desc_prod.id} stocks={desc_prod.stocks} />
                                            </div>
                                            <h4>{desc_prod.stocks} produits en stock</h4>
                                        </>
                                        :
                                        <>
                                            <div className="unstock">
                                                <h5>Plus de stock disponible pour ce produit</h5>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="prod-reviews">
                            <div className="reviews-container">
                                {checkReview() === true ?
                                    <ReviewProduct props={desc_prod.review_product} />
                                    :
                                    <p>Aucun avis pour le moment</p>
                                }
                            </div>
                            <div className="form-review-container">
                                <FormReview product_id={desc_prod.id} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default UniqueProduct
