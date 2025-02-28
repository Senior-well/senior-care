import React, { useState, useEffect, useRef } from "react";
import './Nav.sass';
import { menuData } from "../../backend/MenuData/menuData";
import MenuItems from "../Components/MenuItems/MenuItems";
import Dropdown from "../Components/DropDownNav/DropDown";
import { logoTrans } from "../../images/Images";
import EmployeeData from "../../backend/database/EmployeeData";

export default function Nav() {
    const [dropdown, setDropdown] = useState({ visible: false, submenus: [] });
    const [translateNav, setTranslateNav] = useState(false);
    const lastScrollY = useRef(0);

    const handleMouseEnter = (submenus) => {
        if (submenus) {
            setDropdown({ visible: true, submenus });
        }
    }

    const handleMouseLeave = () => {
        setDropdown({ visible: false, submenus: [] });
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current) {
                setTranslateNav(true);
            }
            else {
                setTranslateNav(false);
            }

            // Update lastScrollY value so whenever scrolling up, it will show the Nav Bar
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll) };
    }, []);

    return (
        <nav className={`Nav ${translateNav ? 'hide' : ''}`}>
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
                            onMouseEnter={() => handleMouseEnter(dropdown.submenus)}
                            onMouseLeave={handleMouseLeave}
                        />)
                    }
                </ul>
                <EmployeeData />
            </div>
        </nav>
    );
}