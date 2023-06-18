import { ADD_FAVORITE, DELETE_FAVORITE, FILTER_CREATED, FILTER_TYPES, GET_DETAILS, GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES, ORDER_BY_ATTACK, ORDER_BY_NAME } from "./action-types";
import axios from "axios";

//Creo una función para obtener todos los pokemones:
export function getPokemons(){
    return function(dispatch){
        // try {
        //     const response = await axios.get("http://localhost:3001/pokemons");
        //     return dispatch({
        //         type: GET_POKEMONS,
        //         payload: response.data
        //     })
        // } catch (error) {
        //     alert(response.data.msg);
        //     console.log(error)           
        // }
        // ----Fetch----
        fetch("http://localhost:3001/pokemons")
        .then(response => response.json())
        .then(data => {
            return dispatch({
                type: GET_POKEMONS,
                payload: data,
            })
        })
        .catch(function(error){
            console.log(error)
        });
    }
}

//Creamos la función que buscara por nombre en el input (SearchBar):
export function getPokemonByName(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

//Función que pondremos sobre cada Card para obtener el detallado de cada pokemon:
export function getDetails(id){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/pokemons/" + id);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

//Para el filtrado por Tipos de Pokemon, en primer lugar vamos a obtenerlos:
export function getTypes(){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/types");
            return dispatch({
                type: GET_TYPES,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

//Luego los filtramos con su actions:
export function filterTypes(payload){
    return {
        type: FILTER_TYPES,
        payload
    }
}

//Filtrado por su origen API o DB:
export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}

//Ordenamiento alfabetico:
export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

//Ordenamiento por Nivel de Ataque:
export function orderByAttack(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

//Función para crear el pokemon por <form>
export function createPokemon(payload){
    console.log(payload);
    return async function(){
        try {
            const response = await axios.post("http://localhost:3001/pokemons", payload);
            console.log(response);
            alert(response.data.msg)
            return response;
        } catch (error) {
            alert(error.response.data.msg)
            console.log(error);
        }
    }
}

//Función para agregar a la lista de favoritos
export function addFavorite(pokemon){
    return {
        type: ADD_FAVORITE,
        payload: pokemon
    }
}

//Función para remover de la lista de favoritos
export function deleteFavorite(id){
    return {
        type: DELETE_FAVORITE,
        payload: id
    }
}