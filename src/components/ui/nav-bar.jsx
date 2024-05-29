import { getUserSession } from "@/lib/data";
import Link from 'next/link';

export default async function NavBar({color}) {
    const user = await getUserSession();


    return (
        <div className="flex justify-between h-28 section-about w-screen">
            <div className="flex items-center">
            <div className="ml-10">
                    <Link href="/" className='z-10'>
                        <img src="/images/Logo-dorado.png" draggable="false" className="w-32 left-0" />
                    </Link>
                </div>
            </div>
            <div className="flex items-center mr-8">
                <Link href="/aboutus" className='z-10'>
                    <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded bg-custom${color} cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Sobre nosotros</h1>
                </Link>
                <Link href="/events" className='z-10'>
                    <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded bg-custom${color} cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Eventos</h1>
                </Link>
                <Link href="/gallery" className='z-10'>
                    <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded bg-custom${color} cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Galería</h1>
                </Link>
                <Link href="/contact" className='z-10'>
                    <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded bg-custom${color} cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Contacto</h1>
                </Link>
                
                <div className="flex flex-end">
                    {user && (
                        <Link href={`/${user.type.toLowerCase()}`} className='z-10'>
                            <h1 className={`home-text-about m-8 font-bold text-xl text-black rounded bg-custom${color} cursor-pointer hover:underline transition-colors duration-300 ease-in-out`}>Portal</h1>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
