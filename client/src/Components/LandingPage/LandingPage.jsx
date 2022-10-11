import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css"
import landing from "../Images/landing.png"

export default function LandingPage(){
    return(
        <div className={style.conPrin}>
            <div className={style.homepage}>
            <img className={style.imgLanding} src={landing} alt="Bienvenida" />
            <div className={style.welcome}>
            <Link to ="/home">
                <button className={style.boton}>Ingresar</button>
            </Link>
            </div>
            </div>
        </div>
    )
}