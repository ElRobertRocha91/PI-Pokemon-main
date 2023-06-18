import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar(){
    return(
        <header className={style.header}>
            <div className={style.title}> 
                <h1>Pokémon Go</h1>
                <nav>
                    <ul className={style.ul}>
                        <li>
                            <NavLink exact to="/home">Home</NavLink>
                            <NavLink exact to="/favorites">Favorite</NavLink>
                            <NavLink exact to="/about">About</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}