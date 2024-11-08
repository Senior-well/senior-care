import React, { useState, useEffect } from "react";
import './Nav.sass';
import { menuData } from "../../backend/MenuData/menuData";
import MenuItems from "../Components/MenuItems/MenuItems";
import { userData } from "../../backend/UserData/userData";
import { useNavigate } from "react-router-dom";
import { logoTrans } from "../../images/Images";
import { Button, Menu, MenuItem } from '@mui/material';

export default function Nav() {
    const [position, setPosition] = useState(-100);
    const [firstName, setFirstName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPosition((prevPosition) => (prevPosition >= 100 ? -100 : prevPosition + 1));
        }, 15);

        fetch('http://localhost:8010/data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'getUser' }),
            credentials: 'include',
        })
            .then(response => {

                return response.json()
            })
            .then(data => {
                console.log('Response: ', data);
                if (data.status === 'success') {
                    setFirstName(data.firstName);
                    setIsLoggedIn(true);
                }
                else {
                    setIsLoggedIn(false);
                }
            })
            .catch(error => console.log('Error checking log in status: ', error));

        return () => clearInterval(intervalId);
    }, []);

    const handleSignOut = () => {
        fetch('http://localhost:8010/data.php', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ status: 'logout' }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setFirstName('');
                    setIsLoggedIn(false);
                    navigate('/');
                }
            })
            .catch(error => console.log('Error during logout: ', error));
    }

    const handleLogOutClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleLogOutClose = () => {
        setAnchorEl(null);
    }

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
                            <img src={logoTrans} style={{ width: '30px' }} alt='LogoImage'></img>
                        </li>
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
                        {isLoggedIn ?
                            <>
                                <Button variant='outlined' onClick={handleLogOutClick}>Hello {firstName}</Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleLogOutClose}
                                >
                                    <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                                </Menu>
                            </>
                            :
                            <>
                                {
                                    userData.map((user, index) => {
                                        return <MenuItems
                                            items={user}
                                            key={index}
                                            onSignInClick={user.title === 'Sign in' ? () => navigate('/sign-in') : null}
                                        />
                                    })
                                }
                            </>
                        }
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