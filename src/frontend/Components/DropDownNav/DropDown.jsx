import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = ({ submenus, dropdown, onMouseEnter, onMouseLeave }) => {
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
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {submenus.map((submenu, index) => (
                <li className='dropdownComp' key={index}>
                    <a href={submenu.url} onClick={(e) => e.preventDefault()}>
                        <span className="menu-icon"><FontAwesomeIcon icon={submenu.icon} /></span>
                        <div className="menu-text">
                            <span className="menu-title">{submenu.title}</span>
                            <span className="menu-description">{submenu.description}</span>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default Dropdown;