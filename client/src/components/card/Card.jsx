import React from "react";
import style from "./Card.module.css";

export default function Card({id, image, name, types}){
    return(
        <div key={id} className={style.container}>
            <div className={style.card}>
                <img src={image} alt={name} className={style.img}/>
                <div>
                    <h3>{name}</h3>
                    <h6>Type:</h6>
                    <p>{types}</p>
                </div>
            </div>
        </div>
    )
}