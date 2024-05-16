import Link from 'next/link';

const Icons = () => {
    return (
        <div id="icons_div">
            <div className="absolute z-10 bottom-0 left-0 ml-8 mb-8 flex space-x-4">
                <Link href="https://www.facebook.com/MasGospel/?locale=es_ES">
                    <span className="fab fa-facebook text-white hover:text-customOrange cursor-pointer transition-colors duration-300 ease-in-out hover:scale-110"></span>
                </Link>
                <Link href="https://www.instagram.com/masgospelofficial/?hl=es">
                    <span className="fab fa-instagram cursor-pointer text-white hover:text-customYellow transition duration-300 ease-in-out hover:scale-110"></span>
                </Link>
                <Link href="https://www.youtube.com/@MasGospelOfficial">
                    <span className="fab fa-youtube text-white hover:text-customRed cursor-pointer transition-colors duration-300 ease-in-out hover:scale-110"></span>
                </Link>
            </div>
        </div>

    );
};

export default Icons;