import Link from 'next/link';

export default function Page() {
    return (
        <main className="relative h-screen">
            <img src="/images/imagen.png" className="absolute z-0 inset-0 object-cover w-full h-full" />
            <div className="absolute top-0 left-0 w-full flex justify-center">
                <img src="/images/Logo.png" className="z-10 w-1/6 h-1/6" />
            </div>
            <div className="flex justify-between ml-20">
                <div className="flex justify-center items-center">
                    <Link href="/calendar" className='z-10'>
                        <h1 className="home-text m-12 mr-28 font-bold text-3xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Calendario</h1>
                    </Link>
                    <Link href="/aboutus" className='z-10'>
                        <h1 className="home-text m-12 font-bold text-3xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Sobre nosotros</h1>
                    </Link>
                </div>
                <div className="flex mr-20">
                    <Link href="/contact" className='z-10'>
                        <h1 className="home-text m-12 mr-28 font-bold text-3xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Contacto</h1>
                    </Link>
                    <Link href="/auth" className='z-10'>
                        <h1 className="home-text text-red-700 m-12 font-bold text-3xl hover:text-red-700 cursor-pointer hover:underline transition-colors duration-300 ease-in-out">Zona usuarios</h1>
                    </Link>
                </div>
            </div>
        </main>
    );
}
