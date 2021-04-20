import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/reducers/product"
import "./CreateProductForm.css"

function CreateProductForm({ setReload }) {
    const dispatch = useDispatch();
    const [images, setImages] = useState();
    const [coffeeName, setCoffeeName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [sweetness, setSweetness] = useState(0)
    const [acidity, setAcidity] = useState(0)
    const [mouthfeel, setMouthfeel] = useState(0)
    const [flavour1, setFlavour1] = useState(0)
    const [flavour2, setFlavour2] = useState(0)
    const [flavour3, setFlavour3] = useState(0)
    const [flavour4, setFlavour4] = useState(0)

    function addImage(file) {
        setImages(file)
    }

    async function submit(e) {
        e.preventDefault();
        const data = {
            "files":images,
            "name":coffeeName,
            description,
            price,
            sweetness,
            acidity,
            mouthfeel,
            "flavour1":flavour1,
            "flavour2":flavour2,
            "flavour3":flavour3,
            "flavour4":flavour4
        }
        const res = await dispatch(createProduct(data))
        console.log(res);

    }
    return (
        <form onSubmit={submit}>
            <div className="create-product__container">
                <div className="product__card product__form" >
                    <div className="product-details__container" >
                        <div className="product__details product__description product-form__div">
                            <label className="product-details__label">Images</label>
                            <input className="product-details__input product-details__files" onChange={(e) => addImage(e.target.value)} type="file" multiple></input>
                        </div>
                        <div className="product__details product__description product-form__div">
                            <label className="product-details__label">Coffee Name</label>
                            <input className="product-details__input" onChange={(e) => setCoffeeName(e.target.value)} type="text"></input>
                        </div>
                        <div className="product__details product__description product-form__div">
                            <label className="product-details__label">Description</label>
                            <textarea className="product-details__textarea" onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="product__details product__description product-form__div">
                            <label className="product-details__label">Price</label>
                            <input className="product-details__input" onChange={(e) => setPrice(e.target.value)} type="number"></input>

                        </div>
                        <div className="roastRating-input__container">
                            <label>Sweetness: </label>
                            <input onChange={(e) => setSweetness(e.target.value)}
                                className="roastRating__input"
                                type="range"
                                min="0"
                                max="10"
                                list="roastLevels"
                            ></input>
                            <datalist id="roastLevels">
                                <option value="0" label="0" ></option>
                                <option value="1" label="1" ></option>
                                <option value="2" label="2" ></option>
                                <option value="3" label="3" ></option>
                                <option value="4" label="4" ></option>
                                <option value="5" label="5" ></option>
                                <option value="6" label="6" ></option>
                                <option value="7" label="7" ></option>
                                <option value="8" label="8" ></option>
                                <option value="9" label="9" ></option>
                                <option value="10" label="10"></option>
                            </datalist>
                        </div>
                        <div className="roastRating-input__container">
                            <label>Acidity: </label>
                            <input onChange={(e) => setAcidity(e.target.value)}
                                className="roastRating__input"
                                type="range"
                                min="0"
                                max="10"
                                list="roastLevels"
                            ></input>
                            <datalist id="roastLevels">
                                <option value="0" label="0" ></option>
                                <option value="1" label="1" ></option>
                                <option value="2" label="2" ></option>
                                <option value="3" label="3" ></option>
                                <option value="4" label="4" ></option>
                                <option value="5" label="5" ></option>
                                <option value="6" label="6" ></option>
                                <option value="7" label="7" ></option>
                                <option value="8" label="8" ></option>
                                <option value="9" label="9" ></option>
                                <option value="10" label="10"></option>
                            </datalist>
                        </div>
                        <div className="roastRating-input__container">
                            <label>Mouthfeel (light to heavy): </label>
                            <input onChange={(e) => setMouthfeel(e.target.value)}
                                className="roastRating__input"
                                type="range"
                                min="0"
                                max="10"
                                list="roastLevels"
                            ></input>
                            <datalist id="roastLevels">
                                <option value="0" label="0" ></option>
                                <option value="1" label="1" ></option>
                                <option value="2" label="2" ></option>
                                <option value="3" label="3" ></option>
                                <option value="4" label="4" ></option>
                                <option value="5" label="5" ></option>
                                <option value="6" label="6" ></option>
                                <option value="7" label="7" ></option>
                                <option value="8" label="8" ></option>
                                <option value="9" label="9" ></option>
                                <option value="10" label="10"></option>
                            </datalist>
                        </div>
                        <div className="product__details product-form__div">
                            <label className="product-flavor__label">Flavour 1: </label>
                            <input className="product-flavor__input" onChange={(e) => setFlavour1(e.target.value)} type="text"></input>
                            <label className="product-flavor__label">Flavour 2: </label>
                            <input className="product-flavor__input" onChange={(e) => setFlavour2(e.target.value)} type="text"></input>
                        </div>
                        <div className="product__details product-form__div">
                            <label className="product-flavor__label">Flavour 3: </label>
                            <input className="product-flavor__input" onChange={(e) => setFlavour3(e.target.value)} type="text"></input>
                            <label className="product-flavor__label">Flavour 4: </label>
                            <input className="product-flavor__input" onChange={(e) => setFlavour4(e.target.value)} type="text"></input>
                        </div>
                        <div className="product__submit review__submit">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default CreateProductForm;