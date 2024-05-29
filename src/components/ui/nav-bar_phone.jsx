import { getUserSession } from "@/lib/data";
import Link from 'next/link';

export default async function NavBarPhone({ color }) {
    const user = await getUserSession();

    return (
        <div className="h-32 section-about w-screen" style={{ color: "white" }}>
            <div className="flex items-center text-center">
                <Link href="/" className='z-10 mt-6 ml-12'>
                    <img src="/images/Logo-dorado.png" draggable="false" className="w-32 left-0" />
                </Link>
                <div className="w-1/3 ml-4 mt-4">
                    <Link className={`underline`} style={{ textDecorationColor: `${color}` }} href="/aboutus">Sobre Nosotros</Link>
                    <br />
                    <Link className={`underline`} style={{ textDecorationColor: `${color}` }} href="/events">Eventos</Link>
                    <br />
                    <Link className={`underline`} style={{ textDecorationColor: `${color}` }} href="gallery">Galería</Link>
                    <br />
                    <Link className={`underline`} style={{ textDecorationColor: `${color}` }} href="contact">Contacto</Link>

                </div>
            </div>
        </div>
    );
}
