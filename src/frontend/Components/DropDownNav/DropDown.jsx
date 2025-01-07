import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = ({ submenus, dropdown }) => {
    const dropdownRef = useRef(null);
    const [dropdownStyle, setDropdownStyle] = useState({});

    useEffect(() => {
        const menuRight = document.querySelector(".menu-right");
        if (menuRight) {
            setDropdownStyle({ 
                position: "absolute",
                top: "100%",
                left: '0px',
                width: '100%'
            });
        }
    }, []);

    return (
        <ul
            className={`dropdown ${dropdown ? "show" : ""}`}
            style={dropdownStyle}
            ref={dropdownRef}
        >
            {submenus.map((submenu, index) => (
                <li className='dropdownComp' key={index}>
                    <span className="menu-icon"><FontAwesomeIcon icon={submenu.icon} /></span>
                    <div className="menu-text">
                        <span className="menu-title">{submenu.title}</span>
                        <span className="menu-description">{submenu.description}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Dropdown;