import React from 'react';
import Link from 'next/link';

const Icons = () => {
    return (
        <div className="absolute z-10 bottom-0 left-0 ml-8 mb-8 flex space-x-4">
            <Link href="https://www.facebook.com/MasGospel/?locale=es_ES">
                <span className="fab fa-facebook text-white hover:text-customOrange cursor-pointer text-2xl transition-colors duration-300 ease-in-out hover:scale-110"></span>
            </Link>
            <Link href="https://www.instagram.com/masgospelofficial/?hl=es">
                <span className="fab fa-instagram cursor-pointer text-white text-2xl hover:text-customYellow transition duration-300 ease-in-out hover:scale-110"></span>
            </Link>
            <Link href="https://www.youtube.com/@MasGospelOfficial">
                <span className="fab fa-youtube text-white hover:text-customRed cursor-pointer text-2xl transition-colors duration-300 ease-in-out hover:scale-110"></span>
            </Link>
        </div>

    );
};

export default Icons;