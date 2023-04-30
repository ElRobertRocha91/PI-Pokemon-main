import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar(){
    return(
        <header>
            <div>
                <h2>Pokemon Go</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink>Home</NavLink>
                            <NavLink>Favorite</NavLink>
                            <NavLink>About</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}