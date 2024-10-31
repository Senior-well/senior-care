import React, { useState, useEffect } from "react";
import './Nav.sass';
import { menuData } from "../../backend/MenuData/menuData";
import MenuItems from "../Components/MenuItems/MenuItems";
import { userData } from "../../backend/UserData/userData";
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const [position, setPosition] = useState(-100);
    const navigate = useNavigate();

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
                {/* First nav bar */}
                <div className="user">
                    <ul className="user-left">
                        <li>
                            <span style={{ fontStyle: 'italic' }}>Senior<br></br>Well Inc.</span>
                        </li>
                        <li className="newsBox" style={newsBoxStyle}>
                            <p className="newsArticle" style={newsArticleStyle}>
                                Test version 1.0.1
                            </p>
                        </li>
                    </ul>
                    <ul className="user-right">
                        {userData.map((user, index) => {
                            return <MenuItems
                                items={user}
                                key={index}
                                onSignInClick={user.title === 'Sign in' ? () => navigate('/sign-in') : null}
                            />
                        })}
                    </ul>
                </div>

                {/* Second nav bar */}
                <div className="menu">
                    <ul className="menu-left">
                        {menuData.map((menu, index) => {
                            return <MenuItems items={menu} key={index} />
                        })}
                    </ul>
                    <ul className="menu-right">
                        <li id="demo">
                            <button>Book a demo</button>
                        </li>
                        <li id="started">
                            <button>Start Free Trial</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}