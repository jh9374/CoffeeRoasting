import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createRoaster } from '../../store/reducers/roaster';
// styles
import "./RoasterRegisterForm.css"

function RoasterRegisterForm(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    function submit(e){

        e.preventDefault();
        setErrors([]);

        dispatch(createRoaster({name}))
        .then((res)=> {
            setName('');
            console.log(res)
            history.push(`/roaster/${res.name}`);
        })
        .catch((e) => {
            console.log(e.errors)
            setErrors(e.errors)
        })
    }

    return(
        <div className="roaster-register-form__container">
            <form className="roaster-register__form">
                {
                    errors && (
                        <div>
                            <ul>
                                { errors.map( e => (<li>e.message</li>))}
                            </ul>
                        </div>
                    )
                }
                <div className="roaster-register__input">
                    <label  htmlFor="name">What's the name?</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    ></input>
                        <button className="roaster-register__button"
                            onClick={submit}>Continue</button>
                </div>
            </form>
        </div>
    )
}

export default RoasterRegisterForm;