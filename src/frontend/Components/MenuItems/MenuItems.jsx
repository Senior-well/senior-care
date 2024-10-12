import React, { useState } from "react";
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
        <li onMouseEnter={submenusDropdownEnter} onMouseLeave={submenuesDropdownLeave} className="menuData">
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
                <a href={items.url}>{items.icon && <FontAwesomeIcon icon={items.icon} />}{items.title}</a>
            )
            }
        </li>
    )
}

export default MenuItems;