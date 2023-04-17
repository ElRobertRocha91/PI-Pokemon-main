import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Detail(){

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    const myPokemon = useSelector((state) => state.detail);

    return(
        <div>
            <Link to="/home">
               <button>Return</button>
            </Link>
            <div>
                {/* Detallado del Pokemon */}
                {
                    myPokemon ?
                    <div>
                        <article>
                            <p><span>Id:</span>{myPokemon.id}</p>
                            <img src={myPokemon.image} alt="image"/>
                            <h2>{myPokemon.name}</h2>
                            <div>
                                <p><span>Live: </span>{myPokemon.live}</p>
                                <p><span>Attack: </span>{myPokemon.attack}</p>
                                <p><span>Defense: </span>{myPokemon.defense}</p>
                                <p><span>Velocity: </span>{myPokemon.velocity}</p>
                                <p><span>Height: </span>{myPokemon.height}</p>
                                <p><span>Weight: </span>{myPokemon.weight}</p>
                                <p><span>Types: </span>{myPokemon.types}</p>
                            </div>
                        </article>
                    </div> : 
                    <p>Loanding...</p>
                }
            </div>
        </div>
    )
}