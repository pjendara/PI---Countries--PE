import React from "react";
import s from "./Paginado.module.css"

export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav className={s.contpag}>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        
                        <button className={s.botpag} key={number} onClick={() => paginado(number)}>{number}</button>
                        
                    ))
                }
            </ul>
        </nav>
    )
}
