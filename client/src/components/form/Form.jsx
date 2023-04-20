import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory }from "react-router-dom";
import { createPokemon, getTypes } from "../../redux/actions";

export default function Form(){
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const history = useHistory();

    //Guardo el formulario en un estado, que sera un objeto:
    const [input, setInput] = useState({
        name: "",
        image: "",
        live: 0,
        attack: 0,
        defense: 0,
        velocity: 0,
        height: 0,
        weight: 0,
        types: []
    })

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])

    //----------Logica del formulario-------------//
    //Función que recibira los cambios que haya en el <input> y modifique el estado global
    function handleInputChange(e){
        console.log(e.target.value);
        setInput({
            ...input,
            [e.target.value]: e.target.value
        })
        console.log(input);
    }

    //Función que recibira los tipos de pokemons seleccionados del <select>
    function handleSelectTypes(e){
        //Valido que no puedan seleccionarse repetidos
        if(!input.types.includes(e.target.value)){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            });
        }else{
            setInput({
                ...input
            });
        }
    }

    //Función para confirmar el nuevo <pokemon> creado por el usuario
    function handleSubmit(e){
        console.log(e.target.value);
        e.preventDefault();
        console.log(input);
        dispatch(createPokemon(input));
        alert("Pokemon created with success");
        //Seteamos el <input>, para limpiarlo
        setInput({
            name: "",
            image: "",
            live: 0,
            attack: 0,
            defense: 0,
            velocity: 0,
            height: 0,
            weight: 0,
            types: []
        })
        //Redirijo a mi <Home>
        history.push('/home');
    }

    return(
        <div>
            <h1>Create Pokemon..!!</h1>
            <form>
                <div>
                    <label>Name: </label>
                    <input
                    placeholder="Ingresar name..."
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Live: </label>
                    <input
                    type="number"
                    value={input.live}
                    name="live"
                    onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Attack: </label>
                    <input
                    type="number"
                    value={input.attack}
                    name="attack"
                    onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Defense: </label>
                    <input
                    type="number"
                    value={input.defense}
                    name="defense"
                    onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Velocity: </label>
                    <input
                    type="number"
                    value={input.velocity}
                    name="velocity"
                    onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Height: </label>
                    <input
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Weight: </label>
                    <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Image: </label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Type: 
                        <select onChange={(e) => handleSelectTypes}>
                            <option value="all">All</option>
                            {/* Renderizado en el <select> de todos los tipos de polemon */}
                            {
                                types && 
                                types.map((type) => {
                                    return(<option key={type.id} value={type.name}>{type.name}</option>)
                                })
                            }
                        </select>
                    </label>
                </div>
                <div>
                    <button type="submit" onSubmit={(e) => handleSubmit(e)}>Create</button>
                </div>
            </form>
            <Link to='/home'>
               <button>Home</button>
            </Link>
        </div>
    )
}