import React, { useState } from "react";
import Dropdown from "../DropDownNav/DropDown";

const MenuItems = ({ items }) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <li>
            {items.submenus ? (
                <>
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        {items.title}{' '}
                    </button>
                    <Dropdown
                        submenus={items.submenus}
                        dropdown={dropdown}
                    />
                </>
            ) : (
                <a href={items.url}>{items.title}</a>
            )
            }
        </li>
    )
}

export default MenuItems;