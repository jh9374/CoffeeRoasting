import React from 'react';
import { useSelector } from "react-redux";
import ProductCard from '../ProductCard/ProductCard';

import "./ProductPage.css"

function ProductPage() {
    const products = useSelector((x) => x.products)
    return (
        <div className="page_containerP">
            <div className="product__page">



                <div className="products__heading">
                    <h1>Products</h1>
                </div>
                <div className="products__container">
                    <ProductCard />
                </div>
            </div>
        </div>
    )
}

export default ProductPage;