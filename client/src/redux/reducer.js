import { FILTER_CREATED, FILTER_TYPES, GET_DETAILS, GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES, ORDER_BY_ATTACK, ORDER_BY_NAME } from "./action-types";

const initialState = {
    pokemons: [],
    copyPokemons: [],
    detail: [],
    types: []
}

function rootReducer (state= initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                copyPokemons: action.payload
            }
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case FILTER_TYPES:
            //Guardo una copia del estado con el que voy a trabajar:
            const copy = state.copyPokemons;
            const filterByTypes = action.payload === "All" ?
            copy :
            copy.filter(el => el.types.includes(action.payload));
            return {
                ...state,
                pokemons: filterByTypes
            }
        case FILTER_CREATED:
            const all = state.copyPokemons;
            const filtered = action.payload === "Created" ?
            all.filter(el => el.createdInDb) :
            all.filter(el => !el.createdInDb);
            return {
                ...state,
                pokemons: action.payload === "All" ? all : filtered 
            }
        case ORDER_BY_NAME:
            const allCopy = state.copyPokemons;
            if(action.payload === "Order-Letter"){
                return {
                    ...state,
                    pokemons: allCopy.sort((a, b) => a.id - b.id)
                }
            }
            //Aplico un ternario para el ordenamieto:
            const arrayOrdered = action.payload === "A-Z" ?
            allCopy.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                return 0;
            }):
            allCopy.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: arrayOrdered
            }
        case ORDER_BY_ATTACK:
            const copyAttack = state.copyPokemons;
            if(action.payload === "Order-Attack"){
                return {
                    ...state,
                    pokemons: copyAttack.sort((a, b) => a.id - b.id)
                }
            }
            //Operador Ternario:
            const arrayAttack = action.payload === "Men-May" ?
            copyAttack.sort(function(a, b){
                if(a.attack > b.attack){// "a" es mayor a "b", entonces pone "a" detras de "b" 
                    return 1;
                }
                if(a.attack < b.attack){
                    return -1;
                }
                return 0;
            }):
            copyAttack.sort(function(a, b){
                if(a.attack < b.attack){
                    return 1;
                }
                if(a.attack > b.attack){
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: arrayAttack
            }
        default:
            return {...state}
    }
}

export default rootReducer;