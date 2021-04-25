import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRoaster } from "../../services/roasters"
import ProductCard from '../ProductCard/ProductCard';
import { getProducts } from '../../store/reducers/product';
import "./RoasterProfilePage.css"
import CreateProductForm from '../Forms/CreateProductForm';

function RoasterProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector((x) => x.session.user)

    const { id } = useParams()

    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function roasterProfile(){
            dispatch(getProducts())
            const res = await getRoaster(id);
            await setProfile(res);
            await setIsLoading(false)
        }
        roasterProfile(id);
        return async () => {
            await setReload(false);
        }
    },[reload , dispatch])

    return (
        !isLoading &&
        (<div className="profile__page">
            <div className="roaster__profile">
                <div className="profile__card">
                    <h1>{profile.name}</h1>
                </div>
                <div className="products__container">
                    {
                        Object.keys(profile.products).map((p) => {
                            return <ProductCard profile={true} product={profile.products[p]} key={p} />
                        })
                    }
                    {
                        user.id &&
                        <CreateProductForm setReload={setReload} />
                    }

                    
                </div>
            </div>
            
            
        </div>)
    )
}

export default RoasterProfilePage;