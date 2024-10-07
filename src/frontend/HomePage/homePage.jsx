import React from "react";
import './homePage.sass';
import { headerImg } from '../../images/Images';

export default function HomePage() {
    return (
        <div className="homePage">
            <div className="headerHP">
                <div>
                    <h1>"Your health is an investment, not an expense."</h1>
                    <p>
                        Get comprehensive care management, health monitoring, and emergency alerts with
                        our Senior Care App today.
                    </p>
                </div>
                <button>Try it for free</button>
                <button>Plans and pricing</button>
            </div>
            <div className="imgHP">
                <img src={headerImg} alt="SeniorHeaderImg" />
            </div>
        </div>
    );
}