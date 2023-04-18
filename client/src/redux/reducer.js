import { FILTER_CREATED, FILTER_TYPES, GET_DETAILS, GET_POKEMONS, GET_POKEMON_BY_NAME, GET_TYPES } from "./action-types";

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
        default:
            return {...state}
    }
}

export default rootReducer;