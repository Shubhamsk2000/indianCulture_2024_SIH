// App.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../css/culturalSites.css';
import Transition from '../Transition';
import { Link } from 'react-router-dom';
const AnimatedCard = ({ image, title }) => {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        // GSAP Animations
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );

        gsap.fromTo(imageRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );

        gsap.fromTo(titleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
        );
    }, []);

    return (
        <div ref={cardRef} className="card">
            <Link to={'/cultural-site/rajgad'}>
            <img ref={imageRef} src={image} alt={title} className="card-image" />
            <h2 ref={titleRef} className="card-title">{title}</h2>
            </Link>
        </div>
    );
};

const CulturalSites = () => {
    return (
        <Transition>
        <div className="app">
            <AnimatedCard
                image="/cultural_sites/rajgad1.jpg"
                title="Rajgad Fort"
            />
            <AnimatedCard
                image="/cultural_sites/Ajanta_Caves.jpg"

                title="Ajanta Caves"
            />
            <AnimatedCard
                image="/cultural_sites/Ellora Caves.jpg"

                title="Ellora Caves"
            />
            <AnimatedCard
                image="/cultural_sites/Shaniwar Wada.jpeg"

                title="Shaniwar Wada"
            />
        </div>
        </Transition>
    );
}

export default CulturalSites;
