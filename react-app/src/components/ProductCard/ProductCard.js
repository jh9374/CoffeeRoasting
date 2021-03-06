import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductImages } from "../../services/images";
import { getImages } from "../../store/reducers/images";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import "./ProductCard.css"
import { useHistory } from "react-router-dom";

function ProductCard({ profile, product }) {
    // const images = useSelector((x) => x.images)
    const roasters = useSelector((x) => x.roasters)
    const user = useSelector((x) => x.session.user)

    const history = useHistory();

    const [productImages, setProductImages] = useState({})

    useEffect(() => {
        async function getImages(id) {
            const res = await getProductImages(id)
            await setProductImages(res);
        }
        getImages(product.id);
    }, [])

    function addToCart(e) {
        e.preventDefault();
        if (!user.id) {
            history.push("/login")
        }
    }

    return (
        product ?
            (
                <div className="product__card" >
                    <div className="product-details__container" onClick={() => history.push(`/products/${product.id}`)}>
                        <div className="product-images__container">
                            {
                                <Carousel >

                                    {
                                        Object.keys(productImages).map((i) => (
                                            <img key={productImages[i].id} src={productImages[i].image_url} alt="product" />
                                        ))
                                    }

                                </Carousel>
                            }
                        </div>
                        <div className="product__details product__title product__description">
                            <h2>{product.name} | {roasters[product.roaster_id].name} | ${product.price}</h2>
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
                                    product.flavour.map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>
                    {
                        profile ?
                            (
                                <div className="product__details">
                                    <button className="add-to-cart__button" type="button" onClick={(e) => addToCart(e)}>Edit</button>
                                </div>
                            )
                            :
                            (
                                <div className="product__details">
                                    <button className="add-to-cart__button" type="button" onClick={(e) => addToCart(e)}>Add to Cart</button>
                                </div >
                            )
                    }

                </div>
            )
            :
            (
                <h2>loading products</h2>
            )
    )
}

export default ProductCard;