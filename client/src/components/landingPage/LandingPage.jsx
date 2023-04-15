import React from "react";
import { Link } from "react-router-dom";

//Componente de función:
export default function Detail(){
    return(
        <div>
            <h1>MY APP POKEMON</h1>
            <Link to='/home'>
                <button>ENTRY</button>
            </Link>
        </div>
    )
}