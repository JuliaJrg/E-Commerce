import React from "react"
import ReactStars from "react-rating-stars-component";

function ReviewProduct(props) {

    return (
        <div className="list-review">
            {props.props.map((review) => {
                return (
                    <ul>
                        <li>
                            <h3>{review.users.first_name} {review.users.last_name}</h3>
                            <p>{review.comment}</p>
                            <ReactStars
                                count={5}
                                value={review.nbr_stars}
                                size={24}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                color="#0466c8"
                                activeColor="#48cae4"
                                edit={false}
                            />
                        </li>
                    </ul>
                )
            })}
        </div>
    )
}

export default ReviewProduct
