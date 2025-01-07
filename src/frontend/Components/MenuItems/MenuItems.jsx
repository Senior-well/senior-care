import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItems = ({ items, onMouseEnter, onMouseLeave }) => {
    return (
        <li
            className='menu-item'
            onMouseEnter={() => onMouseEnter(items.submenus)}
            onMouseLeave={onMouseLeave}
        >
            {items.submenus ? (
                <>
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded="false"
                    >
                        {items.title}{' '}
                    </button>
                    {items.icon && <FontAwesomeIcon icon={items.icon} />}
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
                </a>
            )
            }
        </li>
    )
}

export default MenuItems;