import React from "react";


export default function Paginado({pokemonPerPage, allPokemons, paginado}){
    const numberPage = [];

    for(let i = 0; i <= Math.ceil(allPokemons/pokemonPerPage); i++){
        //i <= Math.cecil(40/12); // ==> i <= Math.cecil(3.33) ==> i <= 4
        numberPage.push(i + 1);
    }

    return(
        <nav>
            <ul>
                {
                    numberPage && 
                    numberPage.map(number => {
                        return(
                            <li key={number}>
                                <button onClick={() => paginado(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}