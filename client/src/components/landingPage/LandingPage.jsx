import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

//Componente de función:
export default function Detail(){
    return(
        <div className={style.container}>
            <div className={style.text}>
                <h1>HELLO! WELCOME TO MY PROYECT-INDIVIDUAL</h1>
                <div className={style.start}>
                    <p>Click on start</p>
                    <Link to='/home'>
                        <button className={style.button}>START</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}