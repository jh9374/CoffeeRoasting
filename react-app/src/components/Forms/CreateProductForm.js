import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/reducers/product"
import "./CreateProductForm.css"

function CreateProductForm({ reload, setReload }) {
    const dispatch = useDispatch();

    const [fileList, setFileList] = useState("");
    const [images, setImages] = useState([]);
    const [coffeeName, setCoffeeName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(1);
    const [sweetness, setSweetness] = useState(10)
    const [acidity, setAcidity] = useState(10)
    const [mouthfeel, setMouthfeel] = useState(10)
    const [flavour1, setFlavour1] = useState("")
    const [flavour2, setFlavour2] = useState("")
    const [flavour3, setFlavour3] = useState("")
    const [flavour4, setFlavour4] = useState("")
    const [uploading, setUploading] = useState(false)

    async function addImage(e) {
        const files = e.target.files
        await setImages(files)
    }

    // TODO show the user the files they are uploading and allow to remove
    // useEffect(() => {
    //     updateInput(list)
    // },[images])

    // async function updateInput(list) {
    //     const len = images['length'];
    //     for (let i = 0; i < len; i++) {
    //         list += images[i].name
            
    //     }
    //     await setFileList(list)
    // }

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
        await setUploading(true)
        await dispatch(createProduct(data))
        document.getElementById("file__input").value = "";
        await setImages([])
        await setCoffeeName("")
        await setDescription("")
        await setPrice(1)
        await setSweetness(10)
        await setAcidity(10)
        await setMouthfeel(10)
        await setFlavour1("")
        await setFlavour2("")
        await setFlavour3("")
        await setFlavour4("")
        await setUploading(false)
        await setReload(true)
    }
    return (
        <form onSubmit={submit} >
            <div className="create-product__container">
                <div className="product__card product__form" >
                    <div className="product-details__container" >
                        <div className="product__details product__description product-form__div">
                            <label className="product-details__label">Images</label>
                            <input id="file__input" accept="image/png, image/jpeg, image/jpg" required className="product-details__input product-details__files" onChange={addImage} type="file" multiple></input>
                        </div>
                        <div className="product__details product__description product-form__div">
                            <label className="product-details__label">Coffee Name</label>
                            <input value={coffeeName} required className="product-details__input" onChange={(e) => setCoffeeName(e.target.value)} type="text"></input>
                        </div>
                        <div className="product__details product__description product-form__div">
                            <label className="product-details__label">Description</label>
                            <textarea value={description} className="product-details__textarea" onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="product__details product__description product-form__div">
                            <label className="product-details__label">Price</label>
                            <input value={price} required className="product-details__input" onChange={(e) => setPrice(e.target.value)} type="number"></input>

                        </div>
                        <div className="roastRating-input__container">
                            <label>Sweetness: </label>
                            <input value={sweetness} required onChange={(e) => setSweetness(e.target.value)}
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
                            <input value={acidity} required onChange={(e) => setAcidity(e.target.value)}
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
                            <input value={mouthfeel} required onChange={(e) => setMouthfeel(e.target.value)}
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
                            <input value={flavour1} className="product-flavor__input" onChange={(e) => setFlavour1(e.target.value)} type="text"></input>
                            <label className="product-flavor__label">Flavour 2: </label>
                            <input value={flavour2} className="product-flavor__input" onChange={(e) => setFlavour2(e.target.value)} type="text"></input>
                        </div>
                        <div className="product__details product-form__div">
                            <label className="product-flavor__label">Flavour 3: </label>
                            <input value={flavour3} className="product-flavor__input" onChange={(e) => setFlavour3(e.target.value)} type="text"></input>
                            <label className="product-flavor__label">Flavour 4: </label>
                            <input value={flavour4} className="product-flavor__input" onChange={(e) => setFlavour4(e.target.value)} type="text"></input>
                        </div>
                        <div className="product__submit review__submit">
                            {
                                uploading ?
                                (
                                        <h2>One Moment....</h2>
                                ):
                                (
                                        <button type="submit">Submit</button>
                                )

                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default CreateProductForm;