import React from "react";
import { Link } from "react-router-dom";

export default function Card({imgFlag, name, continent, id}) {
    return (
        <div>
            <img src={imgFlag} alt="Imagen no disponible" width="70px" height="" />
            <h3>{name}</h3>
            <h5>{continent}</h5>
            <h5>{id}</h5>

            <Link to={`/countries/${id}`}><button>Ver Más</button></Link>
                        
        </div>
    );
}