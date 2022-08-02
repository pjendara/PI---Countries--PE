import {React, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../Redux/Actions";

import style from "./CreateActivity.module.css"

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
    
    if(!input.countries) errors.countries = "Campo Necesario"

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
            if(e.target.name === "countryId") {
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

    useEffect(() => {
        dispatch(getCountries())
    }, [])


    return(
        <div className={style.prindiv}>
            <h1>Crea tu Actividad Turística</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value= {input.name} name= "name" onChange={(e)=> handleChange(e)}/>
                    {errors.name && (<p className="error">{errors.name}</p>)}
                </div>
                <div>
                    <label>Escoja el país para su actividad</label>
                    <select name="countryId" id="countryId" onChange={(e) => handleSelect(e)}>
                            <option value=""></option>                      
                        {countries.map((con) => (
                            <option value={con.id}>{con.name}</option>
                        ))}
                    </select>
                    {errors.countries && (<p className="error">{errors.countries}</p>)}
                {/* <ul><li>{input.countryId.map(e => e + " , ")}</li></ul> */}
                </div>
                <div>
                    <label>Temporada: </label>
                    <select name="season" id="season" onChange={(e) => handleSelect(e)}>
                    <option value="vacio"> </option>
                            <option value={"Verano"}>Verano </option>
                            <option value={"Invierno"}>Invierno </option>
                            <option value={"Primavera"}>Primavera </option>
                            <option value={"Otoño"}>Otoño </option>
                    </select>
                    {errors.season && (<p className="error">{errors.season}</p>)}
                </div>
                <div>
                    <label>Dificultad: </label>
                    <input type="number" value= {input.difficulty} name= "difficulty" onChange={(e)=> handleChange(e)}/>
                    {errors.difficulty && (<p className="error">{errors.difficulty}</p>)}
                </div>
                <div>
                    <label>Duración: </label>
                    <input type="number" value= {input.duration} name= "duration" onChange={(e)=> handleChange(e)}/>
                    <label> horas</label>
                    {errors.duration && (<p className="error">{errors.duration}</p>)}
                </div>
                <div>
                    <button type="submit" disabled={Object.keys(errors).length === 0 ? false : true}>Añadir Actividad</button>
                </div>
                
            </form>
                
                {input.countries.map(e =>
                    <div className="selCoun">
                        <p>{e}</p>
                        <button className="botonX" onClick={()=> handleDelete(e)}>X</button>
                    </div>    
                    )}
        </div>
    )
}