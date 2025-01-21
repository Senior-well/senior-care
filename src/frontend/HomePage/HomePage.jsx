import React, { useState, useEffect, useRef } from "react";
import './HomePage.sass';
import ImagesDuplicate from "../Components/ImagesDuplicate";
import { sw1, sw2, sw3, sw4, sw5, sw6, sw7, map } from "../../images/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLanguage, faClock } from "@fortawesome/free-solid-svg-icons";

const OttawaTime = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const ottawaTime = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'America/Toronto',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).format(new Date());
            setTime(ottawaTime);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);
    return time;
};

export default function HomePage() {
    const imgHomepage = [
        { img: sw1, alt: 'img1', position: [0, 100] },
        { img: sw2, alt: 'img2', position: [-50, -100] },
        { img: sw3, alt: 'img3', position: [-100, 25] },
        { img: sw4, alt: 'img4', position: [-110, -70] },
        { img: sw5, alt: 'img5', position: [-20, -50] },
        { img: sw6, alt: 'img6', position: [-30, 0] },
        { img: sw7, alt: 'img7', position: [-280, 150] },
    ];

    const mapIcon = () => {
        const map = [
            {
                icon: faGlobe,
                description: 'Canada',
                question: 'Where are we?'
            },
            {
                icon: faClock,
                description: <OttawaTime />,
                question: 'Right now, our time is'
            },
            {
                icon: faLanguage,
                description: 'En, Vi, Hi, Bn',
                question: 'Which language do we speak?'
            },
        ];
        return map.map((icon, index) => (
            <span key={index}>
                <h3>{icon.question}</h3>
                <span className="homePageIcon">
                    <FontAwesomeIcon icon={icon.icon} size="2xl"></FontAwesomeIcon>
                    <p>{icon.description}</p>
                </span>
            </span>
        ));
    }

    const [visibleIndex, setVisibleIndex] = useState([]);
    const [isReversing, setIsReversing] = useState(false);
    const [showSlogan, setShowSlogan] = useState(false);
    const [caretVisibility, setVisibilityCaret] = useState('');
    const fadeOutTimeOut = useRef(0);

    // Generate Backgroud objects
    const backgroundObjects = Array.from({ length: 5 }, (_, i) => <i key={i} className={`obj${i}`}></i>);

    useEffect(() => {
        // Scroll down checked
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setVisibilityCaret('hidden');
            }

            else {
                setVisibilityCaret('');
            }
        };

        window.addEventListener('scroll', handleScroll);

        //----------------------------------------------------------//
        // Image display
        let timer;
        // Reset the cycle
        if (showSlogan) {
            timer = setInterval(() => {
                setShowSlogan(false);
                setVisibleIndex([]);
                setIsReversing(false);
            }, 4000);
        }
        else {
            timer = setInterval(() => {
                setVisibleIndex((prev) => {
                    if (!isReversing) {
                        // Forward Phase: Display from index 0 to imgHomePage.length - 1
                        if (prev.length < imgHomepage.length) {
                            return [...prev, prev.length];
                        }

                        else {
                            setIsReversing(true); // Start reversing
                            return prev;
                        }
                    }
                    else {
                        // Reverse Phase: Remove from imgHomePage.length to index 0
                        if (prev.length > 0) {
                            const updatedIndex = [...prev];
                            updatedIndex.pop();

                            fadeOutTimeOut.current = setTimeout(() => {
                                setVisibleIndex(updatedIndex); // Remove index by using pop()
                            }, 300);
                            return prev;
                        }
                        else {
                            setIsReversing(false); // Reset the cycle and start over at index 0 again
                            setShowSlogan(true)
                            return [];
                        }
                    }
                });
            }, isReversing ? 200 : 500) // 300ms && 500ms
        }
        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearInterval(timer);
        }
    }, [isReversing, imgHomepage.length, showSlogan]);

    return (
        <>
            <div className="homePage">
                <div className="homePageContainer">
                    {showSlogan ? (
                        <div className="headingText slogan-enter">
                            <h1>Senior Well Inc.</h1>
                            <h1>"Because We Care"</h1>
                        </div>
                    ) : (
                        <>
                            <div className="headingText question-enter">
                                <h1>Do you value staying independent While feeling supported?</h1>
                            </div>
                            {imgHomepage.map((image, index) => (
                                <ImagesDuplicate
                                    key={index}
                                    images={image.img}
                                    alt={image.alt}
                                    animationClass={
                                        visibleIndex.includes(index)
                                            ? isReversing && index === Math.max(...visibleIndex)
                                                ? "fade-out"
                                                : "fade-in"
                                            : "hidden"
                                    }
                                    styles={{
                                        width: '10vw',
                                        borderRadius: '10px',
                                        transform: `translate(${image.position[0]}px, ${image.position[1]}px)`,
                                        zIndex: imgHomepage.length - index,
                                    }}
                                />
                            ))}
                        </>
                    )}
                    {backgroundObjects}
                </div>
                <div className="scrollDown">
                    <span className={`caret-down ${caretVisibility}`}></span>
                </div>
            </div>
            <div className="location">
                <div className="location-wrapper">
                    <img src={map}></img>
                    <span className="Ottawa">Ottawa</span>
                </div>
                <div className="location-info">
                    {mapIcon()}
                </div>
            </div>
        </>
    );
}