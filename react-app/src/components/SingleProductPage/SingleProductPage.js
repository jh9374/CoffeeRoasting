import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProducts } from '../../store/reducers/product';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { getProductImages } from "../../services/images";
import { getProductReviews } from "../../services/reviews"

import "./index.css"
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewForm from "../Forms/ReviewForm";

function SingleProductPage() {

    const { id } = useParams();
    const product = useSelector((x) => x.products[id])
    const roasters = useSelector((x) => x.roasters)
    const user = useSelector((x) => x.session.user)
    const dispatch = useDispatch();
    const history = useHistory();

    const [productImages, setProductImages] = useState({})
    const [productReviews, setProductReviews] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function getImages(id) {
            const images = await getProductImages(id)
            const reviews = await getProductReviews(id)
            await setProductImages(images);
            await setProductReviews(reviews);
            await setIsLoading(false)
            // await setReload(false)
        }
        getImages(id);
        return async () => {
            await setReload(false)
        }
    }, [reload, dispatch])

    function addToCart(e) {
        e.preventDefault();
        if (!user.id) {
            history.push("/login")
        }
    }

    return (
        !isLoading &&
        (
            <>
                <div className="product__page">
                    <div className="product__section">
                        <div className="product-carousel__images">
                            {
                                <Carousel >
                                    {
                                        Object.keys(productImages).map((i) => {
                                            return <img key={productImages[i].id} src={productImages[i].image_url} alt="product" />
                                        })
                                    }
                                </Carousel>
                            }

                        </div>
                        <div className="product__information">
                            <div className="product__details product__title product__description">
                                <h2>{product.name} | {roasters[product.roaster_id].name} | ${product.price}</h2>
                            </div>
                            <div className="product__details product__description">
                                <h2>Price: ${product.price}</h2>
                            </div>
                            <div className="product__details product__description">
                                <p>{product.description}</p>
                            </div>
                            <div className="product__details">
                                <h2>Sweetness: {product.sweetness}</h2>
                                <h2>Acidity: {product.acidity}</h2>
                                <h2>Mouthfeel: {product.mouthfeel}</h2>
                            </div>
                            <div className="product__flavours">
                                <h2>Flavours: </h2>
                                <ul>
                                    {
                                        product.flavour.map((f) => {
                                            return <li key={f}>{f}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="product__details">
                                <button className="add-to-cart__button" type="button" onClick={(e) => addToCart(e)}>Add to Cart</button>
                            </div>
                        </div>
                        <div>
                            <h2>Checkout the <Link to={`/roasters/${product.roaster_id}`} >Roaster</Link></h2>
                        </div>

                    </div>
                    <div className="product__reviews">
                        <div className="reviews__container">
                            {   Object.keys(productReviews).length > 0 ?
                                Object.keys(productReviews).map((r) => {
                                    return <ReviewCard key={r} setReload={setReload} review={productReviews[r]}/>
                                })
                                :
                                <div className="no-reviews__div">
                                <h2>Be the first to add a review</h2>
                                </div>
                            }
                            <div>
                                <ReviewForm setReload={setReload} productId={id}/>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    )
}

export default SingleProductPage;