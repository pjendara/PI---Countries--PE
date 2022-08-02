import React from "react";
import { Link } from "react-router-dom";

import s from "./Card.module.css"

export default function Card({imgFlag, name, continent, id}) {
    return (
        <div className={s.card}>
            <img className={s.bandera} src={imgFlag} alt="Imagen no disponible" width="70px" height="" />
            <h3 className={s.titulo}>{name}</h3>
            <h5 className={s.continente}>{continent}</h5>
            {/* <h5>{id}</h5> */}

            <Link to={`/countries/${id}`}><button className={s.boton}>Ver Más</button></Link>
                        
        </div>
    );
}