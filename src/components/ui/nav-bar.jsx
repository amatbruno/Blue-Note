"use client"
import { getUserSession } from "@/lib/data";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavBar({ color }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUserSession() {
            try {
                const userData = await getUserSession();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user session:", error);
            }
        }

        fetchUserSession();
    }, []);

    return (
        <div className="flex justify-between h-28 section-about w-screen">
            <div className="flex items-center">
                <div className="ml-10">
                    <Link href="/" className='z-10'>
                        <img src="/images/Logo-dorado.png" className="w-32 left-0" />
                    </Link>
                </div>
            </div>
            <div className="flex items-center w-full mr-8 text-center relative">
                <div className="absolute w-full flex items-center justify-center flex-end">
                    <Link href="/aboutus" className='z-10'>
                        <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Sobre nosotros</h1>
                    </Link>
                    <Link href="/events" className='z-10'>
                        <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Eventos</h1>
                    </Link>
                    <Link href="/gallery" className='z-10'>
                        <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Galería</h1>
                    </Link>
                    <Link href="/contact" className='z-10'>
                        <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Contacto</h1>
                    </Link>
                    <div className='absolute flex right-0 flex-end'>
                        {user && (
                            <Link href={`/${user.type.toLowerCase()}`} className='z-10'>
                                <h1 className={`text-lg text-customYellow m-8 font-bold text-lg text-black rounded cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Mi coro</h1>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
