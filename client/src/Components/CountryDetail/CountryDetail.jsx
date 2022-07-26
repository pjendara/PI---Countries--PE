import {React, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesDetail } from "../../Redux/Actions";


export default function CountryDetail(props) {
    const dispatch = useDispatch()

    const id = props.match.params.id

    useEffect(() => {
        dispatch(getCountriesDetail(id))
    },[dispatch, id])

    const country = useSelector((state) => state.detail)  

    return (
        
        <div>
            <h1>Detalles del País</h1>
            {
                country ?
                <div>
                    <img src={country.imgFlag} alt="Imagen no disponible" width="80px" height="" />
                    <h2>{country.name}</h2>
                    <h4>{country.continent}</h4>
                    <h4>{country.id}</h4>
                    <h4>Capital: {country.capital}</h4>
                    <h4>Región: {country.subregion}</h4>
                    <h4>Área: {country.area} km²</h4>
                    <h4>Población: {country.population} Hab.</h4>
                    <h4>Actividades: {country.activity}</h4>
                </div> : <p>Loading ...</p>
            }
            
        </div>
    );
}

