import React from "react";
import './Nav.css';

export default function Nav() {
    return (
        <div className="Nav">
            <ul> 
                <li><a href="">Home</a></li>
                <li><a href="">Product</a></li>
                <li><a href="">Team</a></li>
                <li><a href="">Contact</a></li>
            </ul>
        </div>
    );
}