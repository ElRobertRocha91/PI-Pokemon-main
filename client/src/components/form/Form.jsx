import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory }from "react-router-dom";
import { createPokemon, getTypes } from "../../redux/actions";
import Validation from "./Validation";

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

    //Est. Local para encontrar errores en el <Form>:
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])

    //----------Logica del formulario-------------//
    //Función que recibira los cambios que haya en el <input> y modifique el estado global
    function handleInputChange(e){
        //console.log(e.target.value);
        setInput({//Setea el input en su estado y agregale lo que tenga la propiedad name del objeto <input> cuando reciba esa propiedad.
            ...input,
            [e.target.name]: e.target.value
        })
        //console.log(input);
        //Seteo loe errores al mismo tiempo que suceden los cambios en <input>
        setErrors(Validation({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    //Función que recibira los tipos de pokemons seleccionados del <select>
    function handleSelectTypes(e){
        //Valido que no puedan seleccionarse repetidos
        if(!input.types.includes(e.target.value)){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            });
            setErrors(Validation({
                ...input,
                types: [...input.types, e.target.value]
            }));
        }else{
            //alert("The type of pokemon is already selected...!!!");
            setInput({
                ...input
            });
        }
    }

    //Función para eliminar los Types seleccionados:
    function handleDeleteTypes(e){
        setInput({
            ...input,
            types: input.types.filter(type => type !== e)
        });
    }

    //Función para confirmar el nuevo <pokemon> creado por el usuario
    function handleSubmit(e){
        //console.log(e.target.value);
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
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input
                    placeholder="Ingresar name..." 
                    type="text" 
                    value={input.name} 
                    name="name" 
                    onChange={handleInputChange}/>
                    {/* Renderizo en un condicional el error*/}
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>Live: </label>
                    <input
                    type="number"
                    value={input.live}
                    name="live"
                    onChange={handleInputChange}/>
                    {errors.live && <p>{errors.live}</p>}
                </div>
                <div>
                    <label>Attack: </label>
                    <input
                    type="number"
                    value={input.attack}
                    name="attack"
                    onChange={handleInputChange}/>
                    {errors.attack && <p>{errors.attack}</p>}
                </div>
                <div>
                    <label>Defense: </label>
                    <input
                    type="number"
                    value={input.defense}
                    name="defense"
                    onChange={handleInputChange}/>
                    {errors.defense && <p>{errors.defense}</p>}
                </div>
                <div>
                    <label>Velocity: </label>
                    <input
                    type="number"
                    value={input.velocity}
                    name="velocity"
                    onChange={handleInputChange}/>
                    {errors.velocity && <p>{errors.velocity}</p>}
                </div>
                <div>
                    <label>Height: </label>
                    <input
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={handleInputChange}/>
                    {errors.height && <p>{errors.height}</p>}
                </div>
                <div>
                    <label>Weight: </label>
                    <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={handleInputChange}/>
                    {errors.weight && <p>{errors.weight}</p>}
                </div>
                <div>
                    <label>Image: </label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={handleInputChange}/>
                    {errors.image && <p>{errors.image}</p>}
                </div>
                <div>
                    <label>Type: 
                        <select onChange={(e) => handleSelectTypes(e)}>
                            <option value="all">All</option>
                            {/* Renderizado en el <select> de todos los tipos de pokemon */}
                            {
                                types && 
                                types.map((type) => {
                                    return(<option key={type.id} value={type.name}>{type.name}</option>)
                                })
                            }
                        </select>
                        {errors.types && <p>{errors.types}</p>}
                        <div>
                            {/* Aqui vamos a mostrar los tipo de pokemon, que se van seleccionando */}
                            {
                                input.types.map((el) => (
                                    <li key={el}>{el + " "}<button type="button" onClick={() => handleDeleteTypes(el)}>x</button></li>                                            
                                ))
                            }
                        </div>
                    </label>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
            <Link to='/home'>
               <button>Home</button>
            </Link>
        </div>
    )
}