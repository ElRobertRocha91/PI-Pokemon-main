import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPokemonByName } from "../../redux/actions";
import Paginado from "../paginado/Paginado";
import style from "./SearchBar.module.css";

//Creo mi función SearchBar para el input de busqueda:
export default function SearchBar(){
    //Despachamops la action-type y seteamos un estado local:
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    //Logica del Submit:
    function handleInputChange(e){
        console.log(e.target.value);
        e.preventDefault();
        setName(e.target.value);
        Paginado(1);
    }

    //Logica del Button:
    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            return alert("Please input a name to start the search");
        }else{
            dispatch(getPokemonByName(name));
            setName("");
        }
    }

    //Renderizar el input y el button:
    return(
        <div className={style.container}>
            <form className={style.form}>
                <input type="text" placeholder="Search by name..." onChange={(e) => handleInputChange(e)}  value={name}/>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
            </form>
        </div>
    )
}