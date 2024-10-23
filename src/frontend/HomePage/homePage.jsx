import React from "react";
import './homePage.sass';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
    return (
        <div className="homePage">
            <div className="headerHP">
                <h1>Senior Care</h1>
                <h1>"Your health is an investment, not an expense."</h1>
                <p>
                    Get comprehensive care management, health monitoring, and emergency alerts with
                    our Senior Care App today.
                </p>
                <button>Get Started &nbsp;<FontAwesomeIcon icon={faArrowUpRightFromSquare} /></button> 
            </div>
        </div>
    );
}