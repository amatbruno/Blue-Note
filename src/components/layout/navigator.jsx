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
            <div className="flex items-center columns-2 w-full text-center">
                <div className="ml-10">
                    <img src="/images/Logo-negro.png" draggable="false" className="h-20 left-0 logo_navbar" />
                </div>
                <div className="absolute right-0 justify-between flex flex-row items-center">
                    <div className="flex ml-10">
                        <Link href={`/`}>
                            <h1 className="home-text m-12 ml-1 font-bold text-xl hover:text-yellow-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Home</h1>
                        </Link>
                    </div>
                    <a
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="home-text m-12 ml-1 font-bold text-xl hover:text-red-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out"
                    >
                        <span>{userName}</span>
                    </a>
                    {menuOpen && (
                        <div ref={menuRef} className="absolute right-4 mt-32 w-48 bg-white rounded-md shadow-lg rounded flex flex-col">
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
