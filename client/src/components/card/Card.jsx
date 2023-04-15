import React from "react";


export default function Card({image, name, types}){
    return(
        <div>
            <img src={image} alt={name}/>
            <div>
                <h3>{name}</h3>
                <h6>Type:</h6>
                <p>{types}</p>
            </div>
        </div>
    )
}