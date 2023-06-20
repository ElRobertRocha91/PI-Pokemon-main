import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Detail.module.css";
import Loading from "../loading/Loading";
import Error from "../error404/Error";
import NavBar from "../navBar/NavBar";

export default function Detail(){

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    const myPokemon = useSelector((state) => state.detail);

    console.log(myPokemon);
    //Uso el metodo estatico Object.keys(), para saber si el array devuelto tiene las propiedades que van a ser renderizadas
    if(Object.keys(myPokemon).length > 0 && loading){
        setLoading(false);
    }

    return(
        <div>
            {Object.keys(myPokemon).length > 0 && !loading ?
            <div className={style.container}>
                <NavBar/>
            <div>
                <Link to="/home">
                   <button>HOME</button>
                </Link>
            </div>
            <div>
                {/* Detallado del Pokemon */}
                {
                    myPokemon ?
                    <div className={style.detail}>
                        <article className={style.card}>
                            <p className={style.id}><span>Id:</span>{myPokemon.id}</p>
                            <img src={myPokemon.image} alt="image"/>
                            <h2>{myPokemon.name}</h2>
                            <div className={style.parrafos}>
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
                    <Error/>
                }
            </div>
            </div> : <Loading/>
            }
        </div>
    )
}