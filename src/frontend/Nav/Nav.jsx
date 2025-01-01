import React from "react";
import './Nav.sass';
import { menuData } from "../../backend/MenuData/menuData";
import MenuItems from "../Components/MenuItems/MenuItems";
import { logoTrans } from "../../images/Images";

export default function Nav() {
    return (
        <nav className="Nav">
            <div className="menu-container">
                <ul className="menu-left">
                    <li><img src={logoTrans} style={{ width: '30px' }}></img></li>
                </ul>

                <ul className="menu-right">
                    {menuData.map((menu, index) => {
                        return <MenuItems items={menu} key={index} />
                    })}
                </ul>
                <div>
                    <a className="waitlist" href="#">Join waitlist</a>
                </div>
            </div>
        </nav>
    );
}