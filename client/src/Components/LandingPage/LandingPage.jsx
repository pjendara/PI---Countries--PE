import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={style.homepage}>
            <div className={style.welcome}>
            <Link to ="/home">
                <button className={style.boton}>Ingresar</button>
            </Link>
            <div className={style.autor}><h4 className={style.pautor}>Proyecto Individual de: Pedro J. Endara</h4></div>
            </div> 
        </div>
    )
}