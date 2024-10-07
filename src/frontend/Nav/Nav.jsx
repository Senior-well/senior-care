import React, { useState, useEffect } from "react";
import './Nav.sass';
import { menuData } from "../../backend/MenuData/menuData";
import MenuItems from "../Components/MenuItems/MenuItems";
import { userData } from "../../backend/UserData/userData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
    const [position, setPosition] = useState(-100); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPosition((prevPosition) => (prevPosition >= 100 ? -100 : prevPosition + 1));
        }, 15);

        return () => clearInterval(intervalId);
    }, []);

    const newsBoxStyle = {
        width: '200px',
        height: '50px',
        overflow: 'hidden',
        position: 'relative',
    };

    const newsArticleStyle = {
        position: 'absolute',
        whiteSpace: 'nowrap',
        left: `${position}%`,
    }

    return (
        <nav className="Nav">
            <div>
                <ul className="user">
                    <li>
                        <span style={{ fontStyle: 'italic' }}>Senior<br></br>Well Inc.</span>
                    </li>
                    <li className="newsBox" style={newsBoxStyle}>
                        <p className="newsArticle" style={newsArticleStyle}>
                            Test version 1.0.1
                        </p>
                    </li>
                    {userData.map((user, index) => {
                        return <MenuItems items={user} key={index} />
                    })}
                </ul>
                <ul className="menu">
                    {menuData.map((menu, index) => {
                        return <MenuItems items={menu} key={index} />
                    })}
                    <li id="magnify">
                        <a href='#magnifying' className="searchBar"><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
                    </li>
                    <li id="demo">
                        <button>Request Demo</button>
                    </li>
                    <li id="started">    
                        <button>Get Started</button>
                    </li>
                </ul>
            </div>

        </nav>
    );
}