import Carousel from '@/components/ui/carousel';
import NavBar from '@/components/ui/nav-bar';

export default async function Gallery() {
    let color = "rojo"

    const itemsRevival = [
        { type: 'image', src: '/images/carousel/LRC/image1.jpg'},
        { type: 'video', src: 'https://www.youtube.com/embed/P8YkdJIlysU?si=xeMJLI9kX-f6lY6w&amp;start=1' },
        { type: 'image', src: '/images/carousel/LRC/image2.jpg'},
        { type: 'image', src: '/images/carousel/LRC/image3.jpg'},
        { type: 'video', src: 'https://www.youtube.com/embed/-1XXorgoDJw?si=71L90QjCwJHUy4dy&amp;start=1' },
        { type: 'image', src: '/images/carousel/LRC/image4.jpg'},
    ];

    const itemsForward = [
        { type: 'image', src: '/images/carousel/MF/image1.jpg'},
        { type: 'video', src: 'https://www.youtube.com/embed/P8YkdJIlysU?si=xeMJLI9kX-f6lY6w&amp;start=1' },
        { type: 'image', src: '/images/carousel/MF/image2.jpg'},
        { type: 'image', src: '/images/carousel/MF/image3.jpg'},
        { type: 'video', src: 'https://www.youtube.com/embed/-1XXorgoDJw?si=71L90QjCwJHUy4dy&amp;start=1' },
        { type: 'image', src: '/images/carousel/MF/image4.jpg'},
    ];

    return (
        <main className=" h-screen overflow-x-hidden">
            <NavBar color={color} />
            <div className="w-full">
                <div className='parallax2'>
                </div>
                <div className='aboutus_text columns-2'>
                    <div className='w-1/2 titletext_container'>
                        <div>
                            <h1 className='font-bold text-4xl mt-12'>MAS GOSPEL</h1>
                            <h1 className='aboutus_titletext2'>LET <span className='text-customOrange'>REVIVAL</span> COME</h1>
                            <h1 className="">2024</h1>
                        </div>
                    </div>
                    <div className='w-1/3 mt-5 textaboutus_type1 text-justify'>
                        Nuestro proyecto "Let Revival Come" es un ejemplo perfecto de lo que nos hace especiales.
                        Con este proyecto, queremos llevar la música gospel a más personas y compartir el mensaje de Dios con el mundo.
                        Estamos organizando una serie de conciertos y eventos especiales, y también estamos trabajando en un nuevo álbum.
                        Estamos seguros de que este proyecto será un éxito, y que nos ayudará a alcanzar a aún más personas con nuestra música.
                    </div>
                </div>

                <div className="flex justify-center items-center mt-20 mb-20">
                <Carousel items={itemsRevival} />
                </div>

                <hr className='divisor_paralax1' />

                <div className='aboutus_text columns-2'>
                    <div className='w-1/2 titletext_container'>
                        <div>
                            <h1 className='font-bold text-4xl mt-12'>MAS GOSPEL</h1>
                            <h1 className='aboutus_titletext2'>MOVING <span className='text-customRed'>FORWARD</span></h1>
                            <h1 className="">2023</h1>
                        </div>
                    </div>
                    <div className='w-1/3 mt-5 textaboutus_type1 text-justify'>
                        Nuestro proyecto "Let Revival Come" es un ejemplo perfecto de lo que nos hace especiales.
                        Con este proyecto, queremos llevar la música gospel a más personas y compartir el mensaje de Dios con el mundo.
                        Estamos organizando una serie de conciertos y eventos especiales, y también estamos trabajando en un nuevo álbum.
                        Estamos seguros de que este proyecto será un éxito, y que nos ayudará a alcanzar a aún más personas con nuestra música.
                    </div>
                </div>

                <div className="flex justify-center items-center mt-20 mb-20">
                <Carousel items={itemsForward} />
                </div>
            </div>
        </main>
    )
}