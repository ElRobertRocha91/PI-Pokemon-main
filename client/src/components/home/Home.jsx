import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";

export default function Home(){
    const dispatch = useDispatch();//=> Lo usamos para despachar las acciones
    const allPokemons = useSelector((state) => state.pokemons);//Esto es lo mismo que hacer mapStateToPros()
    
    useEffect( () => {
        dispatch(getPokemons());
    }, [dispatch])

    function handleClick(e){
        console.log(e);
        e.preventDefault();
        dispatch(getPokemons());
    }
    return(
        <div>
            <Link to="/createPokemons">Create Pokemon</Link>
            <h1>Pokedex App</h1>
            <button onClick={e => {handleClick(e)}}>Cargar Pagina</button>
            <div>
                <select>
                    <option value="Order-Letter">Order by letter</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select>
                    <option value="Order-Attack">Order by attack</option>
                    <option value="Men-May">Men-May</option>
                    <option value="May-Men">May-Men</option>
                </select>
                <select>
                    <option value="All">Types of Pokemons</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="Created">DB</option>
                    <option value="Existing">API</option>
                </select>
                {/*Renderizo los pokemon en las card */}
                {
                   allPokemons && allPokemons.map(pokemon => {
                    return(
                       <Card image={pokemon.image} name={pokemon.name} types={pokemon.types}/> 
                    )
                   }) 
                }
            </div>
        </div>
    )
}