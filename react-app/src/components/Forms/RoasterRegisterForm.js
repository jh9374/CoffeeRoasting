import React,{useState} from 'react';

// styles
import "./RoasterRegisterForm.css"

function RoasterRegisterForm(){
    const [name, setName] = useState("");
    return(
        <div className="roaster-register-form__container">
            <form className="roaster-register__form">
                <h2>Roaster Register</h2>
                <div className="form-signup__input">
                    <label  htmlFor="name">Roaster Name?</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    ></input>
                </div>
            </form>
        </div>
    )
}

export default RoasterRegisterForm;