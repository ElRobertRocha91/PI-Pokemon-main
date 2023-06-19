import React from "react";
import style from "./About.module.css";
import linkedin from "../assets/linkedin.jpg";
import github from "../assets/github.jpg";
import NavBar from "../navBar/NavBar";

export default function About(){
    return(
        <div>
            <NavBar/>
            <div classNane={style.container}>
            
            <p>
                Hola, ¿como estas?. Espero que bien, bueno me presento, soy Roberto Rocha. Este proyecto con tmática Pokémon,
                lo desarrolle para un proyecto individual en el Bootcamp Henry.
                Primero que nada, agradezco a la comunidad por ayudarme, dar consejos y por las
                oportunidades para seguir aprendiendo nuevos conocimientos.
                Este proyecto utiliza varias tecnologías, de las más importantes son:
            </p>
            <ul className={style.list}>
                <li>
                    React{" "}
                    <img
                    className={style.image}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                    alt="React"
                    />
                </li>
                <li>
                    Redux{" "}
                    <img
                    className={style.image}
                    src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png"
                    alt="Redux"
                    />
                </li>
                <li>
                    Express{" "}
                    <img
                    className={style.image}
                    src="https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png"
                    alt="Express"
                    />
                </li>
                <li>
                    Sequelize{" "}
                    <img
                    className={style.image}
                    src="https://cdn.iconscout.com/icon/free/png-256/sequelize-2-1175003.png"
                    alt="Sequelize"
                    />
                </li>
                <li>
                    Postgres{" "}
                    <img
                    className={style.image}
                    src="https://user-images.githubusercontent.com/24623425/36042969-f87531d4-0d8a-11e8-9dee-e87ab8c6a9e3.png"
                    alt="Postgres"
                    />
                </li>
                <li>
                    JavaScript{" "}
                    <img
                    className={style.image}
                    src="https://cdn.iconscout.com/icon/free/png-256/javascript-2038874-1720087.png"
                    alt="JavaScript"
                    />
                </li>
                <li>
                    CSS{" "}
                    <img
                    className={style.image}
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968242.png"
                    alt="CSS"
                    />
                </li>
                <li>
                    HTML{" "}
                    <img
                    className={style.image}
                    src="https://cdn-icons-png.flaticon.com/512/888/888859.png"
                    alt="HTML"
                    />
                </li>
            </ul>
            <p>
                Este proyecto se basa en la posibilidad desde el lado del cliente
                en buscar pokemones que existan, filtrar por lo que desee y tambien porder crearlos.
            </p>
            <span>
                Muchas Gracias por tu tiempo en leer y visitar mi App Pokémon Go.
                Espero que la hayas disfrutado interactuando en ella.
            </span>
            <div className={style.container1}>
                <a
                href="https://www.linkedin.com/in/roberto-esteban-rocha/"
                >
                    <img
                    className={style.img}
                    src={linkedin}
                    alt="linkedin"
                    />
                </a>
                <a
                href="https://github.com/ElRobertRocha91/PI-Pokemon-main"
                >
                    <img
                    className={style.img}
                    src={github}
                    alt="github"
                    />
                </a>
            </div>
        </div>
    </div>
        
    )
}