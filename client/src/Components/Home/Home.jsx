import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import { getCountries, filterByContinents, orderByName, orderByPop } from "../../Redux/Actions"; 
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";


export default function Home (){

    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)

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
    },[dispatch])

    // function handleClick(e){
    //     e.preventDefault()
    //     dispatch()
    // }


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

    return (
        <div>
            
                <div>Encuentra Tu Próximo Destino</div>
            
            <NavBar/>
            <div>
            <select onChange={e => handleSort(e)}>
                <option></option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select onChange={e => handleSortPop(e)}>
                <option></option>
                <option value="mayp">Menor a Mayor</option>
                <option value="menp">Mayor a Menor</option>
            </select>
            <select onChange={e => handleFilteredCountrie(e)}>
                <option value={"All"}> </option>
                <option value={"South America"}>Sudamérica</option>
                <option value={"North America"}>Norteamérica</option>
                <option value={"Africa"}>África</option>
                <option value={"Asia"}>Asia</option>
                <option value={"Europe"}>Europa</option>
                <option value={"Oceania"}>Oceanía</option>
                <option value={"Antarctica"}>Antarctica</option>
            </select>
            <select>
                <option value="act">Actividad Turística</option>
            </select>
           
           {currentCountries?.map( (e) => {
               return (
                <div key={e.id}>
                <Card imgFlag={e.imgFlag} name={e.name} continent={e.continent} key={e.id} id={e.id} />
                </div>
            )
        })}

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