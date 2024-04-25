"use client"

import { useState } from 'react';
import Button from '../ui/button';
import { handleLogout } from '@/lib/data';
import Link from "next/link";

export default function Navigator({ user }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const userName = user.firstName;

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="p-5 border-b flex gap-5">
            <Link
                href={`/`}
            >            <Button>
                    Home
                </Button>
            </Link>

            <Button>
                Hola esto es mi botón
            </Button>

            <div className="relative">
                <Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                >
                    <span>usuario</span>
                </Button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg rounded">
                        <Link
                            href={`/settings/${userName}`}
                        >
                            <button onClick={closeMenu} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Ajustes</button>
                        </Link>

                        <a onClick={() => handleLogout()} className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white">Cerrar Sesión</a>
                    </div>
                )}
            </div>
        </nav>
    );
}
