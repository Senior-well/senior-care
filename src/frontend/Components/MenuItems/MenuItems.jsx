import React, { useEffect, useState } from "react";
import Dropdown from "../DropDownNav/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItems = ({ items }) => {
    const [dropdown, setDropdown] = useState(false);

    const submenusDropdownEnter = () => {
        setDropdown(true);
    };

    const submenuesDropdownLeave = () => {
        setDropdown(false);
    };

    return (
        <li
            className="menu-item"
            onMouseEnter={submenusDropdownEnter}
            onMouseLeave={submenuesDropdownLeave}
        >
            {items.submenus ? (
                <>
                    {items.icon && <FontAwesomeIcon icon={items.icon} />}
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? "true" : "false"}
                    >
                        {items.title}{' '}
                    </button>
                    <Dropdown
                        submenus={items.submenus}
                        dropdown={dropdown}
                    />
                </>
            ) : (
                <a
                    href={items.url}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    {items.icon && <FontAwesomeIcon icon={items.icon} />}
                    {items.title}
                    {items.description}
                </a>
            )
            }
        </li>
    )
}

export default MenuItems;