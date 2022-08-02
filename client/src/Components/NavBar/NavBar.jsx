import { React } from "react";
import { Link } from "react-router-dom";
import getCountriesSearch from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getCountries } from "../../Redux/Actions";

import s from "./NavBar.module.css"

import logo from "../Images/logo.png"

export default function NavBar(){

const dispatch = useDispatch()
const [value, setValue] = useState("")

function handleClick(e){
    e.preventDefault();
    dispatch(getCountries());
    
}

function handleSubmitBuscar(e){
    e.preventDefault()
    dispatch(getCountriesSearch(value))
    if(!value) alert("Ingrese al menos una letra para su búsqueda")
    
    
}

function handleInputChange(e){
    e.preventDefault()
    setValue(e.target.value)
    
}

    
return (
    <div className={s.navbar}>
    <div>
    <Link to= "/home"><img className={s.bothome} onClick={(e) => handleClick(e)} src={logo} alt="logo"></img></Link>
    </div>
    <div className={s.search}>
            <div className={s.searchtitle} >Encuentra Tu Próximo Destino</div>    
            <input className={s.searchinp} type = "text" placeholder = "Qué país deseas visitar..."
            onChange = {(e) => handleInputChange(e)} />
            <button className={s.searchbot} type="submit" onClick={(e) => handleSubmitBuscar(e)}>Buscar</button>
            </div>
    <Link to= "/activities"><button className={s.botact}>Crear Actividad</button></Link>       
    </div>
    
)

}