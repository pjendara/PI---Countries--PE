import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getCountries, filterByContinents, orderByName, orderByPop, filterByAct, getActivities } from "../../Redux/Actions"; 
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";

import s from "./Home.module.css"


export default function Home (){

    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)
    const activities = useSelector ((state) => state.allActivities)

    const [orden, setOrden]= useState("")

    const [currentPage, setCurrentPage] = useState(1)
    let [countriesPerPage, setCountriesPerPage] = useState(10)
    if(currentPage === 1) countriesPerPage = 9;
    
            

    const indexOfLastCountrie = currentPage * countriesPerPage
    const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountrie,indexOfLastCountrie)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getCountries());
        dispatch(getActivities());
    },[dispatch])

    function handleFilteredCountrie(e){
        dispatch(filterByContinents(e.target.value))
    };

    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleSortPop(e){
        e.preventDefault()
        dispatch(orderByPop(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleFilterByAct(e){
        e.preventDefault()
        e.target.value === "none" ? dispatch(getCountries()):
        dispatch(filterByAct(e.target.value))
        setCurrentPage(1)
    }

    

    return (
        <div className={s.prindiv}>
            
            <div ><NavBar
            setCurrentPage={setCurrentPage}
            /></div>
            
            <div className={s.filtros}>
            <div>
                Ordena Alfabéticamente    
            <select className={s.select} onChange={e => handleSort(e)}>
                <option></option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            </div>
            <div>
                Ordena por Número de Habitantes
            <select className={s.select} onChange={e => handleSortPop(e)}>
                <option></option>
                <option value="mayp">Menor a Mayor</option>
                <option value="menp">Mayor a Menor</option>
            </select>
            </div>
            <div>
                Busca por Continentes
            <select className={s.select} onChange={e => handleFilteredCountrie(e)}>
                <option value={"All"}> </option>
                <option value={"South America"}>Sudamérica</option>
                <option value={"North America"}>Norteamérica</option>
                <option value={"Africa"}>África</option>
                <option value={"Asia"}>Asia</option>
                <option value={"Europe"}>Europa</option>
                <option value={"Oceania"}>Oceanía</option>
                <option value={"Antarctica"}>Antarctica</option>
            </select>
            </div>
            <div>
                Busca por Actividad
                {(activities.length === 0)? <p>No se han creado actividades</p> :
                <select className={s.select} onChange={e => handleFilterByAct(e)}>
                <option value="none"></option>
                {activities.map(e => (
                <option value={e.name} key={e.id}>{e.name}</option>
                ))}
                </select>
                }
            </div>
            </div>
           {currentCountries?.map( (e) => {
               return (
                <div className={s.contenedorCards}>
                <Card imgFlag={e.imgFlag} name={e.name} continent={e.continent} key={e.id} id={e.id} />
                </div>
            )
        })}
            <div className={s.paginado}>
            <Paginado
            countriesPerPage = {countriesPerPage}
            allCountries = {allCountries.length}
            paginado = {paginado}
            /> 
            </div>
        
        </div>
    )
}



// por continente y por tipo de actividad turística ---- 
// ascendentemente como descendentemente los países por orden alfabético y por cantidad de población