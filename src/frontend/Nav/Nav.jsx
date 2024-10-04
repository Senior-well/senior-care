import React from "react";
import './Nav.sass';
import { menuData } from "../../backend/MenuData/menuData";
import MenuItems from "../Components/MenuItems/MenuItems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
    return (
        <nav className="Nav">
            <ul className="menu">
                {menuData.map((menu, index) => {
                    return <MenuItems items={menu} key={index} />
                })}
                <li>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faUser} style={{color: "2FF0E5"}}/>
                </li>
            </ul>
        </nav>
    );
}