import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCountries, getCountriesByName } from "../../Redux/Actions";

import s from "./NavBar.module.css"

import logo from "../Images/logo.png"

export default function NavBar({setCurrentPage}){

const dispatch = useDispatch()
const [name, setName] = useState("")
 
useEffect(() => {
    dispatch(getCountries())
}, [dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(getCountries());
}

function handleInputChange(e){
    dispatch(getCountriesByName(e))
    setCurrentPage(1)
        
}

    
return (
    <div className={s.navbar}>
    <div>
    <Link to= "/home"><img className={s.bothome} onClick={(e) => handleClick(e)} src={logo} alt="logo"></img></Link>
    </div>
    <div  className={s.search}>
        <div className={s.searchtitle}>Encuentra Tu Próximo Destino</div>    
           <input className={s.searchinp} value={name} type = "text" placeholder = "Qué país deseas visitar..."
            onChange = {(e) => {setName(e.target.value); handleInputChange(e.target.value)}} />
           </div>
            
    <Link to= "/activities"><button className={s.botact}>Crear Actividad</button></Link>       
    </div>
    
)

}