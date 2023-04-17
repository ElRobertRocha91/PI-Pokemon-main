import { GET_DETAILS, GET_POKEMONS, GET_POKEMON_BY_NAME } from "./action-types";

const initialState = {
    pokemons: [],
    detail: []
}

function rootReducer (state= initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
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
        default:
            return {...state}
    }
}

export default rootReducer;