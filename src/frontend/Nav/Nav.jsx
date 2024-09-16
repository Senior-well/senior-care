import React from "react";
import './Nav.css';
import { menuData } from "../../backend/MenuData/menuData";
import { MenuItems } from "../Components/MenuItems/MenuItems";

export default function Nav() {
    return (
        <nav className="Nav">
            <ul className="menu">
                {menuData.map((menu, index) => {
                    return <MenuItems items={menu} key={index}/> 
                })}
            </ul>
        </nav>
    );
}