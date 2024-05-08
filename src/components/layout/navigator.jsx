"use client"

import { useState, useEffect, useRef } from 'react';
import { handleLogout } from '@/lib/data';
import Link from "next/link";

export default function Navigator({ user }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const userName = user.firstName;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);


    return (
        <nav className="flex justify-between h-28 section-about w-screen">
            <div className="ml-10 mt-5">
                <Link href="/">
                    <img src="/images/Logo-rojo.png" draggable="false" className="h-20 left-0 " />
                </Link>
            </div>
            <div className="flex items-center w-full text-center relative">
                <div className="absolute inset-0 flex justify-center items-center">
                    <Link href="/aboutus" className='z-10'>
                        <h1 className="home-text-about m-8 font-bold text-xl hover:text-customOrange focus:text-customOrange cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Sobre nosotros</h1>
                    </Link>
                    <Link href="/events" className='z-10'>
                        <h1 className="home-text-event m-8 font-bold text-xl hover:text-customRed focus:text-customRed cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Eventos</h1>
                    </Link>
                    <Link href="/gallery" className='z-10'>
                        <h1 className="home-text-shows m-8 font-bold text-xl hover:text-customYellow focus:text-customYellow cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Galería</h1>
                    </Link>
                    <Link href="/contact" className='z-10'>
                        <h1 className="home-text-contact m-8 font-bold text-xl hover:text-customOrange focus:text-customOrange cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Contacto</h1>
                    </Link>
                </div>
                <div className="absolute right-0 justify-between flex flex-row items-center">
                    <a
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="home-text-log m-12 ml-1 font-bold text-xl hover:text-red-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out"
                    >
                        <span>{userName}</span>
                    </a>
                    {menuOpen && (
                        <div ref={menuRef} className="absolute right-4 mt-32 w-48 bg-white rounded-md shadow-lg flex flex-col">
                            <Link href={`/settings/${userName}`}>
                                <button onClick={closeMenu} className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out">Ajustes</button>
                            </Link>
                            <a onClick={() => handleLogout()} className="block px-4 py-2 text-gray-800 cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out">Cerrar Sesión</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}