import React, { useState } from "react";
import './Nav.sass';
import { menuData } from "../../backend/MenuData/menuData";
import MenuItems from "../Components/MenuItems/MenuItems";
import Dropdown from "../Components/DropDownNav/DropDown";
import { logoTrans } from "../../images/Images";

export default function Nav() {
    const [dropdown, setDropdown] = useState({ visible: false, submenus: [] });

    const handleMouseEnter = (submenus) => {
        if (submenus) {
            setDropdown({ visible: true, submenus });
        }
    }

    const handleMouseLeave = () => {
        setDropdown({ visible: false, submenus: [] });
    };

    return (
        <nav className="Nav">
            <div className="menu-container">
                <ul className="menu-left">
                    <li><img src={logoTrans} style={{ width: '30px' }} alt="Logo"></img></li>
                </ul>

                <ul className="menu-right" onMouseLeave={handleMouseLeave}>
                    {menuData.map((menu, index) => (
                        <MenuItems
                            items={menu}
                            key={index}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                    {dropdown.visible && (
                        <Dropdown
                            submenus={dropdown.submenus}
                            dropdown={dropdown.visible}
                        />)
                    }
                </ul>
                <div>
                    <a className="waitlist" href="#">Join waitlist</a>
                </div>
            </div>
        </nav>
    );
}