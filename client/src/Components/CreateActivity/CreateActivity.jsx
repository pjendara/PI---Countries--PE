import {React, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../Redux/Actions";

import s from "./CreateActivity.module.css"
import logo from "../Images/logo.png"

function validate(input){
    let errors = {}
    let dif = Number(input.difficulty)
    let dur = Number(input.duration)

    if(!input.name) errors.name = "Campo Necesario"
    else if (/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = 'Nombre no puede tener caracteres especiales o tildes'
        
    if(!input.difficulty) errors.difficulty = "Campo Necesario"
    else if (dif <= 0 || dif > 5) errors.difficulty = "Debe ser entre 1 y 5"
    
    if(!input.duration) errors.duration = "Campo Necesario"    
    else if (dur <= 0 || dur > 24) errors.duration = "Debe ser entre 1 y 24"
        
    if(!input.season || input.season === "vacio") errors.season = "Campo Necesario"
    
    if(!input.countries || input.countries.length === 0) errors.countries = "Campo Necesario"

    return errors;
}

export default function CreateActivity(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
       name:"",
       difficulty:"",
       duration:"",
       season:"",
       countries:[]

    })

    useEffect (() => {
        dispatch(getCountries());
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    const handleSelect = (e) => {
        setInput((estado) => {
            if(e.target.name === "countries") {
                return {
                    ...estado,
                    countries: [...estado.countries, e.target.value]
                }
            } else {
                return {
                    ...estado,
                    [e.target.name]: e.target.value
                }
            }
    })}

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
            return alert ('Complete correctamente el formulario antes de enviarlo')
        }

        dispatch(postActivity(input))
        alert("Actividad Creada Exitosamente")
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countries:[]
        })
        history.push("/home")
    }

    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter( con => con !== e)
        })
    }

    function handleClick(e){
        e.preventDefault();
        history.push("/home")
        
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [])


    return(
        <div className={s.prindiv}>
            <div className={s.bar}>
            <Link to= "/home"><img className={s.bothome} onClick={(e) => handleClick(e)} src={logo} alt="logo"></img></Link>
            </div>
            <div className={s.contenedorform}>
            <h2 className={s.titulof}>Crea tu Actividad Turística</h2>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label className={s.campos}>Nombre: </label>
                    <input className={s.inputs} type="text" value= {input.name} name= "name" onChange={(e)=> handleChange(e)}/>
                    {errors.name && (<p className={s.errors}>{errors.name}</p>)}
                </div>
                <div>
                    <label className={s.campos}>Escoja el país para su actividad: </label>
                    <select className={s.inputs} name="countries" id="countries" onChange={(e) => handleSelect(e)}>
                            <option> </option>                      
                        {countries.map((con) => (
                            <option value={con.id}>{con.name}</option>
                        ))}
                    </select>
                    {errors.countries && (<p className={s.errors}>{errors.countries}</p>)}
                {/* <ul><li>{input.countryId.map(e => e + " , ")}</li></ul> */}
                </div>
                <div>
                    <label className={s.campos}>Temporada: </label>
                    <select className={s.inputs} name="season" id="season" onChange={(e) => handleSelect(e)}>
                    <option value="vacio"> </option>
                            <option value={"Verano"}>Verano </option>
                            <option value={"Invierno"}>Invierno </option>
                            <option value={"Primavera"}>Primavera </option>
                            <option value={"Otoño"}>Otoño </option>
                    </select>
                    {errors.season && (<p className={s.errors}>{errors.season}</p>)}
                </div>
                <div>
                    <label className={s.campos}>Dificultad: </label>
                    <input className={s.inputs} type="number" value= {input.difficulty} name= "difficulty" onChange={(e)=> handleChange(e)}/>
                    {errors.difficulty && (<p className={s.errors}>{errors.difficulty}</p>)}
                </div>
                <div>
                    <label className={s.campos}>Duración: </label>
                    <input className={s.inputs} type="number" value= {input.duration} name= "duration" onChange={(e)=> handleChange(e)}/>
                    <label className={s.campos}> horas</label>
                    {errors.duration && (<p className={s.errors}>{errors.duration}</p>)}
                </div>
                <div>
                    <button className={s.botsub} type="submit" disabled={Object.keys(errors).length === 0 ? false : true}>Añadir Actividad</button>
                </div>
                
            </form>
                
                {input.countries.map(e =>
                    <div className={s.conpais}>
                        <p className={s.mpais}> {e} </p>
                        <button className={s.botelim} onClick={()=> handleDelete(e)}>X </button>
                    </div>    
                    )}
                </div>    
        </div>
    )
}