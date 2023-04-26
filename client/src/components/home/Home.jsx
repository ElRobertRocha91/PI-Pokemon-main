import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCreated, filterTypes, getPokemons, getTypes, orderByAttack, orderByName } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import SearchBar from "../searchBar/SearchBar";
import style from "./Home.module.css";
import Loading from "../loading/Loading";

//useSelector = Hooks que funciona igual que el mapStateToProps;
//useDispatch = Hooks que funciona igual que el mapdispatchToProps;
//useEffect = Hooks que emula los ciclos de vida del componente(montaje, desmontaje y actualización);

export default function Home(){
    const dispatch = useDispatch();//=> Lo usamos para despachar las acciones
    const allPokemons = useSelector((state) => state.pokemons);//Esto es lo mismo que hacer mapStateToPros()
    const allTypes = useSelector((state) => state.types);

    const [order, setOrder] = useState("");
    
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

    //Loanding:------------------------------------//
    const all = useSelector((state) => state.copyPokemons);
    const [loading, setLoading] = useState(true);

    if(Object.keys(allPokemons).length > 0 && loading){//==>> Si su longitud es menor a cero y loadin esta en true. Setea mi loading en false
        setLoading(false);
    }
    //---------------------------------------------//

    useEffect( () => {
        dispatch(getPokemons());
        dispatch(getTypes())
    }, [dispatch])

    function handleClick(e){
        //console.log(e);
        e.preventDefault();
        dispatch(getPokemons());
    }

    //-------Despacho los generos obtenidos-------//
    function handleTypes(e){
        console.log(e.target.value);
        dispatch(filterTypes(e.target.value));
        setOrder(`${e.target.value}`)
    }
    //-------------------------------------------//

    //-Despacho la acción del filtrado APi o DB-//
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
    }
    //------------------------------------------//

    //--Despacho la acción que nos llegue para ordenar--//
    function handleSort(e){
        console.log(e.target.value);//=>> A-Z o Z-A
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setPageCurrent(1);
        setOrder(`Ordenado ${e.target.value}`);
    }
    //-------------------------------------------------//

    //--Despacho el ordenamiento por nivel de ataque---//
    function handleAttackSort(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setPageCurrent(1);
        setOrder(`Ordenado ${e.target.value}`);
    }
    //------------------------------------------------//

    return(
        <div>
            {/* Aplico un ternario para aplicar el Loading, midiendo si me llego la info con los pokemon en mi estado local */}
            {Object.keys(all).length > 0 ? 
            (<div>
            <div className={style.title}>
                <h1>POKEMON GO</h1>
            </div>
            <div>
            <button onClick={e => {handleClick(e)}} className={style.button}>Clean Page</button>
            <button className={style.button}><Link to="/createPokemons" className={style.link}>Create Pokemon</Link></button>
            </div>        
            <div>
                <select onChange={e => handleSort(e)} className={style.select}>
                    <option value="Order-Letter">Order by letter</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select onChange={e => handleAttackSort(e)} className={style.select}>
                    <option value="Order-Attack">Order by attack</option>
                    <option value="Men-May">Men-May</option>
                    <option value="May-Men">May-Men</option>
                </select>
                <select onChange={e => handleTypes(e)} className={style.select}>
                    <option value="All">Types of Pokemons</option>
                    {/* Aqui renderizamos los tipos de pokemon para seleccionar el filtro */}
                    {
                        allTypes?.map(el => (<option key={el.id} value={el.name}>{el.name}</option>))
                    }
                </select>
                <select onChange={e => handleFilterCreated(e)} className={style.select}>
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
                <div className={style.conteiner}>
                    <div className={style.cards}>
                        {/*Renderizo los pokemon en las card */}
                        {
                            pokemonCurrent && pokemonCurrent.map(pokemon => {
                                return(
                                    <li key={pokemon.id} className={style.li}>
                                <Link to={`/detail/${pokemon.id}`}>
                                    <Card image={pokemon.image} name={pokemon.name} types={pokemon.types}/> 
                                </Link>
                            </li>
                            )
                        }) 
                        }
                    </div>
                </div>
            </div>
            </div>): <Loading/>}
        </div>
    )
}