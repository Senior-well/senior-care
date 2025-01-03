import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = ({ submenus, dropdown }) => {
    return (
        <ul className={`dropdown ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu, index) => (
                <li key={index}>
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