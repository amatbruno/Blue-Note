import Icons from '@/components/ui/icons';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="no-scroll relative h-screen">
            <img src="/images/imagen.png" className="absolute z-0 inset-0 object-cover w-full " />
            <div className="flex justify-between ml-20">
                <div className="flex justify-center items-center">
                    <Link href="/aboutus" className='z-10'>
                        <h1 className="home-text m-12 ml-1 font-bold text-xl hover:text-yellow-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Sobre nosotros</h1>
                    </Link>
                    <Link href="/calendar" className='z-10'>
                        <h1 className="home-text m-12 mr-10 font-bold text-xl hover:text-red-600 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Proximos eventos</h1>
                    </Link>
                    <Link href="/contact" className='z-10'>
                        <h1 className="home-text m-12 mr-28 font-bold text-xl hover:text-orange-800 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Contacto</h1>
                    </Link>
                </div>
                <div className="flex mr-20">
                    <Link href="/auth" className='z-10'>
                        <h1 className="home-text text-red-700 m-12 mr-1 font-bold text-xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Login</h1>
                    </Link>
                </div>
            </div>
            <Icons />
        </main>
    )
}