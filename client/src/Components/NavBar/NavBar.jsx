import {React, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountries, getCountriesDetail } from "../../Redux/Actions";

function handleClick(e){
    e.preventDefault();
    dispatchEvent(getCountries());
}

export default function NavBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getCountriesDetail(name))
    }

return (
    <div>
        <input
        type = "text"
        placeholder = "Qué país deseas visitar..."
        onChange = {(e) => handleInputChange(e)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
    <Link to= "/activities"><button>Crear Actividad</button></Link>
    <Link to= "/home"><button onClick={e => {handleClick(e)}}>
        Inicio
    </button></Link>
    </div>
)

}