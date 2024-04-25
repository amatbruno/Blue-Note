import Link from 'next/link';
import { getUserSession } from "@/lib/data";

export default async function NavBar() {
    const user = await getUserSession();
    return (
        <div className="flex justify-between h-28 section-about w-screen">
            <div className="flex justify-center items-center columns-2 w-full text-center">
                <div className="w-2/3 ml-10">
                    <img src="/images/Logo-negro.png" draggable="false" className="h-20 left-0 logo_navbar" />
                </div>
                <div className="flex justify-between ml-10">
                    <div className="flex justify-center items-center">
                        <Link href="/" className='z-10'>
                            <h1 className="home-text m-12 ml-1 font-bold text-xl hover:text-yellow-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Home</h1>
                        </Link>
                        <Link href="/calendar" className='z-10'>
                            <h1 className="home-text m-12 font-bold text-xl hover:text-red-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Eventos</h1>
                        </Link>
                        <Link href="/contact" className='z-10'>
                            <h1 className="home-text m-12 font-bold text-xl hover:text-orange-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Contacto</h1>
                        </Link>
                        <div className="flex flex-end -h-4">
                            {!user ? (
                                <Link href="/auth" className='z-10'>
                                    <h1 className="home-text text-red-700 m-12  font-bold text-xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Login</h1>
                                </Link>
                            ) : (
                                <Link href={`/${user.type.toLowerCase()}`} className='z-10'>
                                    <h1 className="home-text text-red-700 m-12 font-bold text-xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Portal</h1>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}