import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import SearchBar from "../searchBar/SearchBar";

//useSelector = Hooks que funciona igual que el mapStateToProps;
//useDispatch = Hooks que funciona igual que el mapdispatchToProps;
//useEffect = Hooks que emula los ciclos de vida del componente(montaje, desmontaje y actualización);

export default function Home(){
    const dispatch = useDispatch();//=> Lo usamos para despachar las acciones
    const allPokemons = useSelector((state) => state.pokemons);//Esto es lo mismo que hacer mapStateToPros()
    
    //Paginado:------------------------------------//
    const [pageCurrent, setPageCurrent] = useState(1);
    const pokemonPerPage = 12;

    const indexOfLastPokemon = pageCurrent * pokemonPerPage;// 1 * 12 = 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;// 12 - 12 = 0
    const pokemonCurrent = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);//(0, 12) ==> [Devuelve un Array con las 12 primeros elementos]
    const paginado = (numberPage) => {
        setPageCurrent(numberPage);
    }
    //---------------------------------------------//

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
                {/* Aqui renderizamos el input de busqueda por nombre */}
                <div>
                    <SearchBar/>
                </div>
                {/* Aqui renderizo el  Paginado */}
                <Paginado
                pokemonPerPage={pokemonPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
                />
                {/*Renderizo los pokemon en las card */}
                {
                   pokemonCurrent && pokemonCurrent.map(pokemon => {
                    return(
                       <Card key={pokemon.id} image={pokemon.image} name={pokemon.name} types={pokemon.types}/> 
                    )
                   }) 
                }
            </div>
        </div>
    )
}