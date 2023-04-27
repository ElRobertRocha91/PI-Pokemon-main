import React from "react";
import { Link } from "react-router-dom";
import style from "./Error.module.css";

export default function Error(){
    return(
        <div className={style.container}>
            <h3>Error 404</h3>
            <p>Page not foud</p>
            <button>
                <Link to='/home' className={style.Link}>Return to home</Link>
            </button>
        </div>
    )
}