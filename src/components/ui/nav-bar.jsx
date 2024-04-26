import Link from 'next/link';
import { getUserSession } from "@/lib/data";

export default async function NavBar() {
    const user = await getUserSession();
    return (
        <div className="flex justify-between h-28 section-about w-screen">
            <div className="flex items-center">
                <div className="ml-10">
                    <Link href="/" className='z-10'>
                        <img src="/images/Logo-negro.png" draggable="false" className="h-20 left-0 logo_navbar" />
                    </Link>
                </div>
            </div>
            <div className="flex items-center">
                <Link href="/aboutus" className='z-10'>
                    <h1 className="home-text m-8 font-bold text-xl hover:text-red-600 cursor-pointer focus:bg-violet-700 hover:underline transition-colors duration-300 ease-in-out">Sobre nosotros</h1>
                </Link>
                <Link href="/events" className='z-10'>
                    <h1 className="home-text m-8 font-bold text-xl hover:text-red-600 cursor-pointer focus:bg-violet-700 hover:underline transition-colors duration-300 ease-in-out">Eventos</h1>
                </Link>
                <Link href="/shows" className='z-10'>
                    <h1 className="home-text m-8 font-bold text-xl hover:text-orange-600 cursor-pointer focus:text-orange-600 hover:underline transition-colors duration-300 ease-in-out">Shows</h1>
                </Link>
                <Link href="/contact" className='z-10'>
                    <h1 className="home-text m-8 font-bold text-xl hover:text-orange-600 cursor-pointer focus:text-orange-600 hover:underline transition-colors duration-300 ease-in-out">Contacto</h1>
                </Link>
                <div className="flex flex-end">
                    {user && (
                        <Link href={`/${user.type.toLowerCase()}`} className='z-10'>
                            <h1 className="home-text text-red-700 m-8 font-bold text-xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Portal</h1>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
