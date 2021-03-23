import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRoaster } from '../../store/reducers/roaster';

import "./RoasterProfilePage.css"

function RoasterProfilePage() {
    const dispatch = useDispatch();

    const { name } = useParams()

    useEffect(() => {
        dispatch(getRoaster(name))
    },[dispatch])

    return (
        <>
            <div className="profile__card">
                <h2>{name}</h2>
                <button>Add Images</button>
            </div>
            <div className="products__section">
                <h2>Products</h2>
                <button>Add Product</button>
            </div>
        </>
    )
}

export default RoasterProfilePage;