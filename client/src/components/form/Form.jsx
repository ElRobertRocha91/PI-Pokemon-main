import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory }from "react-router-dom";
import { createPokemon, getTypes } from "../../redux/actions";
import Validation from "./Validation";
import style from "./Form.module.css";

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
        //Valido que no puedan seleccionarse más de dos tipos, ni repetidos
        if(input.types.length >= 2){
            alert("You are only allowed to select a maximum of two...!");
            setInput({
                ...input
            })
        }
        if(input.types.includes(e.target.value)){
            alert("The type of pokemon is already selected...!");
            setInput({
                ...input
            })
        }
        if(!input.types.includes(e.target.value) && e.target.value !== 'all' && input.types.length < 2){
            // alert("To add a new type delete one already selected")
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            });
            setErrors(Validation({
                ...input,
                // types: [...input.types, e.target.value]
            }));
        }else{
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
        //alert("Pokemon created with success");
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
        <div className={style.container}>
            <Link to='/home'>
               <button className={style.button}>Home</button>
            </Link>
            <h1>Create your Pokemon</h1>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input
                    placeholder="Ingresar name..." 
                    type="text" 
                    value={input.name} 
                    name="name" 
                    onChange={handleInputChange}/>
                    {/* Renderizo en un condicional el error*/}
                    {errors.name && <p className={style.error}>{errors.name}</p>}
                </div>
                <div>
                    <label>Live: </label>
                    <input
                    type="number"
                    value={input.live}
                    name="live"
                    onChange={handleInputChange}/>
                    {errors.live && <p className={style.error}>{errors.live}</p>}
                </div>
                <div>
                    <label>Attack: </label>
                    <input
                    type="number"
                    value={input.attack}
                    name="attack"
                    onChange={handleInputChange}/>
                    {errors.attack && <p className={style.error}>{errors.attack}</p>}
                </div>
                <div>
                    <label>Defense: </label>
                    <input
                    type="number"
                    value={input.defense}
                    name="defense"
                    onChange={handleInputChange}/>
                    {errors.defense && <p className={style.error}>{errors.defense}</p>}
                </div>
                <div>
                    <label>Velocity: </label>
                    <input
                    type="number"
                    value={input.velocity}
                    name="velocity"
                    onChange={handleInputChange}/>
                    {errors.velocity && <p className={style.error}>{errors.velocity}</p>}
                </div>
                <div>
                    <label>Height: </label>
                    <input
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={handleInputChange}/>
                    {errors.height && <p className={style.error}>{errors.height}</p>}
                </div>
                <div>
                    <label>Weight: </label>
                    <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={handleInputChange}/>
                    {errors.weight && <p className={style.error}>{errors.weight}</p>}
                </div>
                <div>
                    <label>Image: </label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={handleInputChange}/>
                    {errors.image && <p className={style.error}>{errors.image}</p>}
                </div>
                <div>
                    <h6>Type: 
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
                        {errors.types && <p className={style.error}>{errors.types}</p>}
                        <div className={style.column}>
                            {/* Aqui vamos a mostrar los tipo de pokemon, que se van seleccionando */}
                            {
                                input.types.map((el) => (
                                    <li className={style.li} key={el}>
                                        <div className={style.lista}>
                                            {el + " "}<button className={style.x} type="button" onClick={() => handleDeleteTypes(el)}>x</button>
                                        </div>
                                    </li>                                            
                                ))  
                            }
                        </div>
                    </h6>
                </div>
                <div>
                    {errors.name || errors.live || errors.attack || errors.defense || errors.image || errors.types ?
                    null : <button className={style.create} type="submit">Create</button>}
                </div>
            </form>
        </div>
    )
}