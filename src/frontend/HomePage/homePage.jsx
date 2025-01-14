import React, { useState, useEffect, useRef } from "react";
import './homePage.sass';
import ImagesDuplicate from "../Components/ImagesDuplicate";
import { sw1, sw2, sw3, sw4, sw5, sw6, sw7 } from "../../images/Images";

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

    const [visibleIndex, setVisibleIndex] = useState([]);
    const [isReversing, setIsReversing] = useState(false);
    const fadeOutTimeOut = useRef(0);
    
    useEffect(() => {        
        const timer = setInterval(() => {
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
                        return [];
                    }
                }
            });
        }, isReversing ? 300 : 1000) // 300ms && 1000ms

        return () => clearInterval(timer);
    }, [isReversing, imgHomepage.length]);

    // Your Health, our priority every day
    // Stay healthier, live happier - empowering you with personalized care and peach of mind for a life well-lived
    return (
        <div className="homePage">
            <div className="homePageContainer">
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
            </div>
        </div>
    );
}