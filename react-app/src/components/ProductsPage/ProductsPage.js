import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../../store/reducers/product';
import ProductCard from '../ProductCard/ProductCard';

import "./ProductsPage.css"
import banner from "../../images/coffeeshopbanner.png"

function ProductsPage() {

    const dispatch = useDispatch();

    const products = useSelector((x) => x.products)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        function products(){
            dispatch(getProducts())
            setIsLoading(false)
        }
        products();
        
    },[dispatch])
    return (
        !isLoading &&
        (<div className="page_containerP">
            <div className="products__page">
                <div className="products__heading">
                    <img src={banner} alt="banner"/>
                </div>
                <div className="products__container">
                    {
                        Object.keys(products).map((p) => {
                            return <ProductCard product={products[p]} key={p} />
                        })
                    }
                    
                </div>
            </div>
        </div>
        )
    )
}

export default ProductsPage;