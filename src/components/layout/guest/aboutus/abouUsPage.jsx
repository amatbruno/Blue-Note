import NavBar from '@/components/ui/nav-bar';

export default async function AboutUs() {
    let color = "naranja"
    return (
        <main className="w-full overflow-y-hidden overflow-x-hidden">
            <NavBar color={color} />
            <div className='parallax1'>
            </div>
            <div className='aboutus_text columns-2'>
                <div className='w-1/2 titletext_container'>
                    <div>
                        <h1 className='font-bold text-4xl mt-12'>MAS GOSPEL</h1>
                        <h1 className='aboutus_titletext2'>LET <span className='text-customOrange'>REVIVAL</span> COME</h1>
                    </div>

                </div>
                <div className='w-1/3 mt-5 textaboutus_type1 text-justify'>
                    Nuestro proyecto "Let Revival Come" es un ejemplo perfecto de lo que nos hace especiales.
                    Con este proyecto, queremos llevar la música gospel a más personas y compartir el mensaje de Dios con el mundo.
                    Estamos organizando una serie de conciertos y eventos especiales, y también estamos trabajando en un nuevo álbum.
                    Estamos seguros de que este proyecto será un éxito, y que nos ayudará a alcanzar a aún más personas con nuestra música.
                </div>
            </div>
            <hr className='divisor_paralax1' />
            <div className="flex justify-center">
            </div>
            <div className='text-center mt-12'>
                <h1 className='text-4xl'>Somos más que un simple coro, somos</h1>
                <h1 className='text-5xl text-customOrange font-bold'>FAMILIA</h1>
            </div>
            <div className='aboutus_text'>
                <p className=''>
                    Cuando cantamos, no solo estamos cantando canciones, estamos contando historias, compartiendo nuestras experiencias y transmitiendo un mensaje de esperanza y amor.
                </p>
            </div>
        </main>
    )
}
