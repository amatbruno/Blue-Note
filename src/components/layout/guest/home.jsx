"use client"

import { useState, useEffect, useRef } from 'react';
import Login from '@/components/layout/guest/auth/login';
import Icons from '@/components/ui/icons';
import Link from 'next/link';
import { getUserSession } from "@/lib/data";

export default function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);
    const loginRef = useRef(null);

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    const handleClickOutside = (event) => {
        if (loginRef.current && !loginRef.current.contains(event.target)) {
            setShowLogin(false);
        }
    };

    useEffect(() => {
        async function fetchUserSession() {
            const userSession = await getUserSession();
            setUser(userSession);
        }

        fetchUserSession();
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <main className="relative non-scroll h-screen">
            {showLogin && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <div ref={loginRef}>
                        <Login />
                    </div>
                </div>
            )}
            <img src="/images/imagen.png" draggable="false" className="absolute z-0 inset-0 object-cover w-full " />
            <div className="flex justify-between ml-20">
                <div className="flex justify-center items-center">
                    <Link href="/aboutus" className='z-10'>
                        <h1 className="home-text m-12 ml-1 font-bold text-xl hover:text-yellow-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Sobre nosotros</h1>
                    </Link>
                    <Link href="/calendar" className='z-10'>
                        <h1 className="home-text m-12 mr-10 font-bold text-xl hover:text-red-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Eventos</h1>
                    </Link>
                    <Link href="/contact" className='z-10'>
                        <h1 className="home-text m-12 mr-10 font-bold text-xl hover:text-orange-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Contacto</h1>
                    </Link>
                    <Link href="/shows" className='z-10'>
                        <h1 className="home-text m-12 mr-10 font-bold text-xl hover:text-orange-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Shows</h1>
                    </Link>
                </div>
                <div className="flex flex-end mr-24 mt-2">
                    {!user ? (
                        <button onClick={toggleLogin} className="z-10">
                            <h1 className="home-text text-red-700 m-12 mr-1 font-bold text-xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Login</h1>
                        </button>
                    ) : (
                        <Link href={`/${user.type.toLowerCase()}`} className='z-10'>
                            <h1 className="home-text text-red-700 m-12 mr-1 font-bold text-xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Portal</h1>
                        </Link>
                    )}
                </div>
            </div>
            <Icons />
        </main>
    )
}
