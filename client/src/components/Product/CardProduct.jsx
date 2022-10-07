import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { BsFillCartPlusFill, BsFillCartDashFill } from 'react-icons/bs'

const CardProduct = ({ category, compatibility, removeFromCart, setCurrentCart, link, type, product }) => {

    // Calcul de la note moyenne
    let averageReview = -1

    function getAverageReview() {
        let totalReviewNotation = 0

        if (product.review_product == undefined || product.review_product.length <= 0) {
            return -1
        }

        product.review_product.forEach(review => {
            totalReviewNotation += review.nbr_stars
        });

        return totalReviewNotation / product.review_product.length
    }

    averageReview = getAverageReview()

    // console.log(compatibility)
    if (compatibility == 'error' || compatibility == 'duplicate') {
        return (
            <div className='product-config'>
                <div className="card-product">
                    <Link to={{ pathname: `/description/${product.id}` }} state={{ product_id: product.id }} className='link'>
                        <img src={product.img} />
                        <div className='desc-product'>
                            {compatibility == 'error' ?
                                <div style={{ color: 'red', fontWeight: 'bold'}} className='title-product'>
                                    {product.name}
                                </div>
                                :
                                <div className='title-product'>
                                    {product.name}
                                </div>
                            }
                            <p>{product.description.substr(0, 20)} ...</p>
                        </div>
                        <div className='infos-product'>
                            {averageReview > -1 ?
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
                                <p>Aucun avis pour le moment</p>
                            }
                        </div>
                    </Link>
                    <div className='checkout'>
                        {type == 'recap' ?
                            <div className='cart-icon' onClick={(e) => removeFromCart(e)} aria-label='Supprimer du Panier'>
                                <BsFillCartDashFill type={'remove'} />
                            </div>
                            :
                            <div className='cart-icon' onClick={(e) => setCurrentCart(e, product.id)} aria-label='Ajouter au Panier'>
                                <BsFillCartPlusFill />
                            </div>
                        }
                        <p>{product.price}€</p>
                        <input type='hidden' name='id' value={product.id}></input>
                    </div>
                </div>
            </div>
        )
    }

    if (link == 'NO') {
        return (
            <div className='product-config'>
                <div className="card-product">
                    <Link to={{ pathname: `/description/${product.id}` }} state={{ product_id: product.id }} className='link'>
                        <img src={product.img} />
                        <div className='desc-product'>
                            {compatibility == 'error' ?
                                <div style={{ backgroundColor: 'red' }} className='title-product'>
                                    {product.name}
                                </div>
                                :
                                <div className='title-product'>
                                    {product.name}
                                </div>
                            }
                            <p>{product.description.substr(0, 20)} ...</p>
                        </div>
                        <div className='infos-product'>
                            {averageReview > -1 ?
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
                                <p>Aucun avis pour le moment</p>
                            }
                        </div>
                    </Link>
                    <div className='checkout'>
                        {type == 'recap' ?
                            <div className='cart-icon' onClick={(e) => removeFromCart(e)} aria-label='Supprimer du Panier'>
                                <BsFillCartDashFill type={'remove'} />
                            </div>
                            :
                            <div className='cart-icon' onClick={(e) => setCurrentCart(e, product.id)} aria-label='Ajouter au Panier'>
                                <BsFillCartPlusFill />
                            </div>
                        }
                        <p>{product.price}€</p>
                        <input type='hidden' name='id' value={product.id}></input>
                    </div>
                </div>
            </div>
        )
    }
    if (product.name == undefined) {
        product = product[1]
    }
    if (product.product_category.name == category || category === undefined) {
        return (
            <div className='product'>
                <div className="card-product">
                    <Link to={{ pathname: `/description/${product.id}` }} state={{ product_id: product.id }} className='link'>
                        <img src={product.img} />
                        <div className='desc-product'>
                            <div className='title-product'>
                                {product.name}
                            </div>
                            <p>{product.description.substr(0, 20)} ...</p>
                        </div>
                        <div className='infos-product'>
                            {averageReview > -1 ?
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
                                <p>Aucun avis pour le moment</p>
                            }
                        </div>
                        <div className='product-price'>
                            <p>{product.price}€</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default CardProduct
