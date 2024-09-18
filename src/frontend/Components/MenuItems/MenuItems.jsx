import React, { useState } from "react";
import { Dropdown } from "../DropDownNav/DropDown";

export const MenuItems = ({ items }) => {
    const [dropDown, setdropDown] = useState(false);
    const toggleDropdown = () => {
        setdropDown((prev) => !prev);
    }

    return (
        <li>
            {items.submenus ? (
                <>
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={dropDown ? "true" : "false"}
                        onClick={toggleDropdown}
                    >
                        {items.title}{' '}
                    </button>
                    <Dropdown submenus={items.submenus} dropdown={dropDown} />
                </>
            ) : (
                <a href={items.url}>{items.title}</a>
            )
            }
        </li>
    )
}