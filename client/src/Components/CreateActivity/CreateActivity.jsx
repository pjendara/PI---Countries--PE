import {React, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../Redux/Actions";

function validate(input){
    let errors = {}
    let dif = Number(input.difficulty)
    let dur = Number(input.duration)

    if(!input.name) {
        errors.name = "Campo Necesario"
    } if(dif <= 0 || dif > 5) {
        errors.difficulty = "Debe ser entre 1 y 5"
    } if(dur <= 0 || dur > 24) {
        errors.duration = "Debe ser entre 1 y 24"
    }

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

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
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
        <div>
            <Link to= "/home"><button>Volver</button></Link>
            <h1>Crea tu Actividad</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value= {input.name} name= "name" onChange={(e)=> handleChange(e)}/>
                    {errors.name && (<p className="error">{errors.name}</p>)}
                </div>
                <div>
                    <label>Dificultad: </label>
                    <input type="number" value= {input.difficulty} name= "difficulty" onChange={(e)=> handleChange(e)}/>
                    {errors.difficulty && (<p className="error">{errors.difficulty}</p>)}
                    {/* <select value= {input.difficulty} name= "difficulty">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> */}
                </div>
                <div>
                    <label>Duración: </label>
                    <input type="number" value= {input.duration} name= "duration" onChange={(e)=> handleChange(e)}/>
                    {errors.duration && (<p className="error">{errors.duration}</p>)}
                </div>
                <div>
                    <label>Temporada: </label>
                    {/* <input type="text" value= {input.season} name= "season" onChange={(e)=> handleChange(e)}/> */}
                    <label><input type="checkbox" name= "Verano" value= "Verano" onChange={(e)=> handleCheck(e)} />Verano</label> 
                    <label><input type="checkbox" name= "Invierno" value= "Invierno" onChange={(e)=>handleCheck(e)} />Invierno</label>
                    <label><input type="checkbox" name= "Primavera" value= "Primavera" onChange={(e)=> handleCheck(e)}/>Primavera</label>
                    <label><input type="checkbox" name= "Otoño" value= "Otoño" onChange={(e)=>handleCheck(e)}/>Otoño</label>
                </div>
                <div>
                    <label>Escoja el país para su actividad</label>
                    <select onChange={(e) => handleSelect(e)}>
                        {countries.map((con) => (
                            <option value={con.name}>{con.name}</option>
                        ))}
                    </select>
                <ul><li>{input.countries.map(e => e + " , ")}</li></ul>
                </div>
                <div>
                    <button type="submit">Añadir Actividad</button>
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