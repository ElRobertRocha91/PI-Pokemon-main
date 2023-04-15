import { GET_POKEMONS } from "./action-types";
import axios from "axios";

//Creo una función para obtener todos los pokemones:
export function getPokemons(){
    return async function(dispatch){
        //----Axios----
        var json = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        })
        //----Fetch----
        // fetch("http://localhost:3001/pokemons");
        // .then(response => response.json());
        // .then(data => {
        //     return dispatch({
        //         type:GET_POKEMONS,
        //         payload: data
        //     })
        // })
    }
}
